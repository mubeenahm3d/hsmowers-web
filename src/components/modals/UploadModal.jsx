import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfileImg from "../../assets/profilesvg.svg";
import CloseIcon from "@mui/icons-material/Close";
import { auth } from "../../authentication/firebase";
import uploadImg from "../../utils/uploadImg";
import { updateProfile } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { dbStorage } from "../../authentication/firebase";
import { userActions } from "../../store/userSlice";
import LoadingButton from "../../components/LoadingButton";

export default function UploadModal({ backdropHandler, heading }) {
  const [currentImage, setCurrentImage] = useState(ProfileImg);
  const [loading, setLoading] = useState(false); 
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const currentUserPhoto = userInfo.photoURL;

  useEffect(() => {
    if (currentUserPhoto) {
      setCurrentImage(currentUserPhoto);
    }
  }, [currentUserPhoto]);

  const fileSelectedHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

   async function getImgURL() {
     try {
       const userName = userInfo.userName;

       const photoURL = await uploadImg(
         { name: userName, data: currentImage },
         "profilePics"
       );

       if (!photoURL) {
         console.error("Image upload failed. No URL returned.");
         return; 
       }

       const user = auth.currentUser;

       await updateProfile(user, { photoURL });

       if (currentUserPhoto) {
         const previousImageRef = dbStorage.refFromURL(currentUserPhoto);
         await previousImageRef.delete();
       }

       dispatch(userActions.setUserImage(photoURL));

       return photoURL;
     } catch (e) {
       console.error("Error while uploading profile pic", e);
     }
   }


     const handleSave = async () => {
       setLoading(true);
       try {
         await getImgURL(); 
         console.log("saved image");
       } catch (error) {
         console.error("Failed to save image:", error);
       } finally {
         setLoading(false); 
         backdropHandler(false); 
       }
     };



  return (
    <StyledInfo>
      <div className="heading">
        <h4>{heading}</h4>
        <button className="icon" onClick={() => backdropHandler(false)}>
          <CloseIcon htmlColor="var(--primary-color)" fontSize="large" />
        </button>
      </div>

      <div className="content">
        <img src={currentImage} alt="Profile" />
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          name="photoURL"
          onChange={fileSelectedHandler}
          id="img-upload"
        />
        <label htmlFor="img-upload" className="gray-btn">
          Upload Image
        </label>
        <LoadingButton
          onClick={handleSave}
          loading={loading}
          type="submit"
          title={"Save"}
        />
        {/* <button onClick={handleSave}>Save</button> */}
      </div>
    </StyledInfo>
  );
}

const StyledInfo = styled.section`
  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
    }

    .gray-btn {
      border-radius: 50px;
      border: 1px solid var(--gray-color);
      color: var(--gray-color);
      padding: 4px 8px;
      background-color: transparent;
      cursor: pointer;
      &:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
      }
    }
  }
`;
