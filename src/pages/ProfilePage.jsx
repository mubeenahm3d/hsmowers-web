import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import BackdropWrapper from "../components/modals/BackdropWrapper";
import Footer from "../components/Footer";
import ProfileImg from "../assets/profilesvg.svg";
import UploadModal from "../components/modals/UploadModal";
import { FaCamera } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../authentication/firebase";
import { auth } from "../authentication/firebase";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const uid = useSelector((state) => state.user.uid);

  const [userData, setUserData] = useState({});
  const [showNumber, setShowNumber] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);

  const { username } = useParams();
  const navigate = useNavigate();

  const shownumberHandle = () => {
    setShowNumber((prev) => !prev);
  };

  const [uploadModal, setUploadModal] = useState(false);

  const backdropHandler = () => {
    setUploadModal((current) => !current);
  };

  const actionModalFunction = () => {
    backdropHandler();
  };

   const getData = async () => {
     const collectionRef = collection(db, "userInfo");
     const q = query(collectionRef, where("userName", "==", username));

     try {
       const querySnapshot = await getDocs(q);
       let fetchedData = {};

       querySnapshot.forEach((doc) => {
         console.log(`${doc.id} =>`, doc.data());
         fetchedData = doc.data();
         console.log("fetched Data is:", fetchedData);
       });

       if (Object.keys(fetchedData).length > 0) {
         setUserData(fetchedData);
       }
     } catch (error) {
       console.error("Error fetching documents: ", error);
     } finally {
       setLoading(false);
     }
   };


  useEffect(() => {
    if (
      userInfo &&
      Object.keys(userInfo).length > 0 &&
      username === userInfo.userName
    ) {
      setUserData(userInfo);
      setLoading(false);
    } else {
      getData();
      setLoading(false); 
    }
  }, [userInfo]);

  const generateMapUrl = (path) => {
    const baseUrl = "https://maps.googleapis.com/maps/api/staticmap?";
    const pathParam = `path=color:0xFF0000|weight:2|${path
      .map((coord) => `${coord.lat},${coord.lng}`)
      .join("|")}`;
    const fillParam = `fillcolor:0x0000FF|weight:2|${path
      .map((coord) => `${coord.lat},${coord.lng}`)
      .join("|")}`;
    const center =
      path.length > 0 ? `center=${path[0].lat},${path[0].lng}` : "";
    const size = "size=900x300";
    const key = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    return `${baseUrl}${size}&${center}&${pathParam}&${fillParam}&key=${key}`;
  };

  const serviceAreaPath = userData.serviceArea?.path || [];
  const mapUrl = generateMapUrl(serviceAreaPath);

  return (
    <>
      <Navbar />
      <StyledProfile>
        {loading ? (
          <div className="loader-container">
            <CircularProgress
              style={{ color: "var(--primary-color)" }}
              size={30}
            />
          </div>
        ) : (
          <>
            <BackdropWrapper
              open={uploadModal}
              smallSize={true}
              backdropHandler={backdropHandler}
              element={
                <UploadModal
                  heading={"Upload Image"}
                  backdropHandler={backdropHandler}
                />
              }
            />

            <div className="profile-container">
              <div
                className="image-container"
                onMouseEnter={() => userData.uid === uid && setIsHovered(true)}
                onMouseLeave={() => userData.uid === uid && setIsHovered(false)}
                onClick={actionModalFunction}
              >
                <img src={userData.photoURL || ProfileImg} alt="Profile" />
                {userData.uid === uid && isHovered && (
                  <FaCamera className="change-btn" />
                )}
              </div>

              <div className="profile-details">
                <h4>{userData.displayName}</h4>
                <p>{userData.userName}</p>
                <p>
                  {Number(userData.grade) === 9
                    ? "Fresher"
                    : Number(userData.grade) === 10
                    ? "Sophomore"
                    : Number(userData.grade) === 11
                    ? "Junior"
                    : Number(userData.grade) === 12
                    ? "Senior"
                    : null}
                </p>
              </div>

              <div className="buttons">
                {userData.phoneNumber && (
                  <button onClick={shownumberHandle}>
                    {showNumber ? userData.phoneNumber : "Show Number"}
                  </button>
                )}
              </div>
            </div>

            <hr />

            <div className="info-container">
              <p>{userData.description}</p>

              {userData.services && userData.services.length > 0 ? (
                <div className="profile-services">
                  {userData.services.map((service, index) => (
                    <div key={index} className="service-btn">
                      {service}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No services available</p>
              )}

              <div className="service-area">
                <div className="service-area-header">
                  <h5>Service Area</h5>
                  {uid === userData.uid && (
                    <button onClick={() => navigate("/select-area")}>
                      Edit Service Area
                    </button>
                  )}
                </div>
                <div className="service-area-map">
                  {serviceAreaPath.length > 0 ? (
                    <img src={mapUrl} alt="Service Area Map" />
                  ) : (
                    <p>No service area Available</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </StyledProfile>
      <Footer />
    </>
  );
}

const StyledProfile = styled.div`
  width: 80%;
  margin: var(--section-margin) auto;
  /* height: var(--section-height); */
  min-height: calc(100vh - 80px);

  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  hr {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .profile-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;

    .image-container {
      position: relative;
      transition: filter 0.3s ease;

      &:hover {
        filter: brightness(0.7);
      }

      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
        cursor: pointer;
      }

      .change-btn {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        width: 34px;
        height: 34px;
        z-index: 2;
        cursor: pointer;
        pointer-events: none;
        opacity: 1;
        transition: opacity 0.3s ease;
      }
    }
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 1rem;
    /* .logout-btn {
      min-width: 180px;
      max-width: 180px;
      color: var(--gray-color);
      border: 1px solid var(--gray-color);
      background-color: transparent;
      padding: 4px 6px;
    } */
    button {
      min-width: 180px;
      max-width: 180px;
      white-space: nowrap;
    }
  }

  .info-container {
    .profile-services {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      gap: 2rem;
      margin-top: 3rem;

      .service-btn {
        border-radius: 50px;
        border: 1px solid var(--gray-color);
        color: var(--gray-color);
        background-color: transparent;
        padding: 4px 6px;
        pointer-events: none;
      }
    }

    .service-area {
      margin-top: 3rem;
      .service-area-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .service-area-map {
        margin-top: 3rem;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }

  @media (min-width: 600px) {
    .profile-container {
      align-items: flex-start;
      .buttons {
        align-self: flex-start;
        .logout-btn {
          padding: 8px 8px;
        }
      }
    }
  }

  @media (min-width: 1024px) {
    .profile-container {
      align-items: flex-start;
      .buttons {
        align-self: flex-start;
        margin-left: auto;
        .logout-btn {
          padding: 8px 8px;
        }
      }
    }
  }
`;
