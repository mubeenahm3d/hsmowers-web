import React, { useState } from "react";
import { auth } from "../authentication/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { userActions } from "../store/userSlice";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import DropFiles from "../components/DropFiles";
import LoadingButton from "../components/LoadingButton";
import api from "../utils/api";
import Footer from "../components/Footer";
import BackdropWrapper from "../components/modals/BackdropWrapper";
import ActionModal from "../components/modals/ActionModal";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [readImage, setReadImage] = useState({ data: {}, loading: false });
  const [cleanImage, setCleanImage] = useState({ data: "", loading: false });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState("");
  const [actionModal, setActionModal] = useState(false);

  const subscriptionStatus = useSelector(
    (state) => state.user.subscription?.status
  );

  const logoutHandler = async () => {
    try {
      await auth.signOut();
      dispatch(
        userActions.setCurrentUser({
          fullname: "",
          email: "",
          uid: "",
          image: "",
          preferences: {},
        })
      );
      navigate("/login");
    } catch (e) {
      console.log("Logout error", e);
    }
  };

  const checkSubscription = (apiType) => {
    const initialLimit = localStorage.getItem(`${apiType}ImageCheck`);
    console.log("sub check", initialLimit, subscriptionStatus);
    if (subscriptionStatus !== "active" && initialLimit === "used") {
      setActionModal(true);
      return false;
    }
    return true;
  };

  const readImageHandler = async () => {
    const accessActive = checkSubscription("read");
    if (!accessActive) {
      return;
    }
    setError("");
    setReadImage({ data: {}, loading: true });
    setCleanImage({ data: "", loading: false });
    try {
      if (uploadedFiles.length === 0) {
        throw new Error("No file uploaded");
      }
      const formData = new FormData();
      formData.append("file", uploadedFiles[0]); // 'file' is the parameter name for binary data

      const response = await api.post("/get-file-info", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the Content-Type is set
        },
      });
      console.log("Response:", response.data);
      setReadImage({ data: response.data, loading: false });
      localStorage.setItem("readImageCheck", "used");
    } catch (e) {
      setError(e.message);
      console.log("error while reading image", e);
    } finally {
      setReadImage((current) => ({ ...current, loading: false }));
    }
  };

  const downloadCleanedImage = (image) => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "cleaned_image.jpg"; // Set file name
    document.body.appendChild(link); // Append to body to trigger click
    link.click(); // Programmatically click the link
    URL.revokeObjectURL(image); // Clean up URL
    document.body.removeChild(link); // Remove the link
  };

  const cleanImageHandler = async () => {
    const accessActive = checkSubscription("clean");
    if (!accessActive) {
      return;
    }
    console.log("active", accessActive);
    setError("");
    setCleanImage({ data: "", loading: true });
    setReadImage({ data: {}, loading: false });
    try {
      if (uploadedFiles.length === 0) {
        throw new Error("Please uploaded an image first");
      }
      const formData = new FormData();
      formData.append("file", uploadedFiles[0]); // 'file' is the parameter name for binary data

      const response = await api.post("/get-cleaned-file", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the Content-Type is set
        },
        responseType: "blob",
      });
      const url = URL.createObjectURL(response.data);
      setCleanImage({ data: url, loading: false });
      // downloadCleanedImage(url);
      localStorage.setItem("cleanImageCheck", "used");
    } catch (e) {
      setError(e.message);
      console.log("error while cleaning image", e);
    } finally {
      setCleanImage((current) => ({ ...current, loading: false }));
    }
  };

  const backdropHandler = () => {
    setActionModal((current) => !current);
  };

  const actionModalFunction = () => {
    backdropHandler();
    navigate("/upgrade");
  };

  return (
    <>
      <Navbar />
      <StyledHome>
        <BackdropWrapper
          open={actionModal}
          smallSize={true}
          backdropHandler={backdropHandler}
          element={
            <ActionModal
              heading={"Upgrade Required"}
              msg={
                "Free users have limited use of the tool. Please upgrade for unlimited use"
              }
              backdropHandler={backdropHandler}
              buttonName={"Upgrade"}
              action={actionModalFunction}
            />
          }
        />

        <div className="apis">
          <DropFiles
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
          />
          <div className="btns">
            <LoadingButton
              title={"Detect Modifications"}
              onClick={readImageHandler}
              loading={readImage.loading}
            />
            <LoadingButton
              title="Clean Image"
              onClick={cleanImageHandler}
              loading={cleanImage.loading}
              className="secondary-btn"
            />
          </div>
          {error && <h5 className="error">{error}</h5>}
          {Object.keys(readImage.data)?.length > 0 && (
            <div className="read-data">
              {readImage.data.genai_created ? (
                <h5 className="error">This image was generated with AI</h5>
              ) : readImage.data.genai_modified ? (
                <h5 className="error">This image was modified by AI</h5>
              ) : !readImage.data.genai_created &&
                !readImage.data.genai_modified &&
                readImage.data.c2pa_image ? (
                <h5>This image was not modified by AI</h5>
              ) : (
                <h5>
                  We were unable to detect generative AI usage for this image.
                </h5>
              )}
              {readImage.data.other_actions.length > 0 && (
                <ul>
                  {readImage.data.other_actions.map((action) => (
                    <li>{action}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {cleanImage.data && (
            <>
              <img className="fetched-img" src={cleanImage.data} alt="" />
              <a
                className="secondary-btn"
                href={cleanImage.data}
                download={"cleaned-image.jpg"}
              >
                Download
              </a>
            </>
          )}
          <p className="description">
            ClearSlate.io helps you verify whether an image has been marked as
            AI-generated by checking for metadata tags that are commonly added
            by AI image generators, like Photoshop or DALL-E. If these tags are
            found, the image was likely generated or altered by AI. Platforms
            like Facebook and Instagram use similar metadata to flag
            AI-generated images. Use our 'Clean Image' tool to remove the tags
            that might cause your image to be flagged.
          </p>
        </div>
      </StyledHome>
      <Footer />
    </>
  );
}

const StyledHome = styled.section`
  min-height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: var(--section-margin);
  .login-info {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 1rem;
  }
  .description {
    margin: 2rem 1rem;
    max-width: 70ch;
  }
  a.secondary-btn {
    margin-top: 1rem;
    padding: 4px 10px;
    color: white;
    border-radius: 50px;
  }
  .apis {
    margin-top: 2%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3%;
    flex-direction: column;
    .btns {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5%;
    }
    .error,
    .read-data,
    .fetched-img {
      margin-top: 3%;
      color: red;
    }
    .read-data {
      h5 {
        margin-bottom: 3%;
      }
    }
    .fetched-img {
      height: fit-content;
      width: 320px;
      border-radius: 16px;
      box-shadow: 0px 0px 4px 4px var(--shadow);
      margin-top: 1rem;
    }
  }
`;
