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
import { useNavigate } from "react-router-dom";
import RequestModal from "../components/modals/RequestModal";
import BannerImg from "../assets/profile-banner.jpg";
import Mower from "../assets/mower.svg";
import SnowRemoval from "../assets/snow removal.svg";
import Edging from "../assets/edging.png";
import LeafRemoval from "../assets/leaf-removal.png";
import Weeding from "../assets/weeding.png";
import BabySitting from "../assets/baby-sitting.png";
import DogWalking from "../assets/dog-walking.svg";
import WindowCleaning from "../assets/window-cleaning.svg";
import CloseIcon from "@mui/icons-material/Close";
import ThemeModal from "../components/modals/ThemeModal";

export default function ProfilePage() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const userSubscription = useSelector((state) => state.user.subscription);

  const uid = useSelector((state) => state.user.uid);
  const userId = useSelector((state) => state.user.uid);

  const [userData, setUserData] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadModal, setUploadModal] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [requestModalEmail, setRequestModalEmail] = useState(false);
  const [mapModal, setMapModal] = useState(false);
  const [themeModal, setThemeModal] = useState(false);



  const { username } = useParams();
  const navigate = useNavigate();
  

  const serviceImages = {
    mowing: Mower,
    "snow-removal": SnowRemoval,
    edging: Edging,
    "dog-walking": DogWalking,
    "leaf-removal": LeafRemoval,
    weeding: Weeding,
    "baby-sitting": BabySitting,
    "window-cleaning": WindowCleaning,
  };

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
        //  console.log(`${doc.id} =>`, doc.data());
        fetchedData = doc.data();
        console.log(fetchedData.email);
      
        setRequestModalEmail(fetchedData.email);
        //  console.log("Email send:", fetchedData.email);
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

  const primarytheme = userData.primaryColor || "var(--primary-color)";
  const secondarytheme = userData.secondaryColor || "var(--primary-color)";

  useEffect(() => {
    if (userInfo && username === userInfo.userName) {
      setTimeout(() => {
        setUserData(userInfo);
        setLoading(false);
      }, 2000);
    } else {
      getData();
      // setLoading(false);
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
    const size = "size=300x200";
    const key = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    return `${baseUrl}${size}&${center}&${pathParam}&${fillParam}&key=${key}`;
  };

  const serviceAreaPath = userData.serviceArea?.path || [];
  const mapUrl = generateMapUrl(serviceAreaPath);

  const upgradeHandle = () => {
    navigate("/upgrade");
  };

  const requestModalfunc = () => {
    backdropHandlerRequest();
  };

  const backdropHandlerRequest = () => {
    setRequestModal((current) => !current);
  };

  const backdropHandlerMap = () => {
     setMapModal((current) => !current);
  }

  const mapModalFunction = () => {
    backdropHandlerMap();
  };

  const backdropHandlerTheme = () => {
    setThemeModal((current) => !current);
  };

  const themeModalfunc = () => {
    backdropHandlerTheme();
  };


  const generateMapUrlModal = (path) => {
    const baseUrl = "https://maps.googleapis.com/maps/api/staticmap?";
    const pathParam = `path=color:0xFF0000|weight:2|${path
      .map((coord) => `${coord.lat},${coord.lng}`)
      .join("|")}`;
    const fillParam = `fillcolor:0x0000FF|weight:2|${path
      .map((coord) => `${coord.lat},${coord.lng}`)
      .join("|")}`;
    const center =
      path.length > 0 ? `center=${path[0].lat},${path[0].lng}` : "";
    const size = "size=900x600";
    const key = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    return `${baseUrl}${size}&${center}&${pathParam}&${fillParam}&key=${key}`;
  };
  const mapUrlModal = generateMapUrlModal(serviceAreaPath);

  return (
    <>
      <Navbar />

      <BackdropWrapper
        open={requestModal}
        smallSize={true}
        backdropHandler={backdropHandlerRequest}
        element={
          <RequestModal
            heading={"Request Service"}
            backdropHandler={backdropHandlerRequest}
            uemail={requestModalEmail}
          />
        }
      />

      <BackdropWrapper
        open={themeModal}
        smallSize={true}
        backdropHandler={backdropHandlerTheme}
        element={
          <ThemeModal
            heading={"Select Theme"}
            backdropHandler={backdropHandlerTheme}
            userId={userId}
          />
        }
      />

      <BackdropWrapper
        open={mapModal}
        backdropHandler={backdropHandlerMap}
        element={
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "6px",
              }}
            >
              <h4>Service Area</h4>
              <button
                className="icon"
                onClick={() => backdropHandlerMap(false)}
              >
                <CloseIcon htmlColor="var(--primary-color)" fontSize="large" />
              </button>
            </div>

            <div>
              {serviceAreaPath.length > 0 ? (
                <img
                  src={mapUrlModal}
                  alt="Service Area Map"
                  style={{ borderRadius: "var(--l-radius)", width:'100%', height:'auto' }}
                />
              ) : (
                <p>No service area Available</p>
              )}
            </div>
          </>
        }
      />

      {uid === userData.uid && !userSubscription.status && (
        <Banner>
          <p>
            Your Business Page is still in Preview Mode - Make it Public to
            start recieving customers?
          </p>
          <button onClick={upgradeHandle}>Publish</button>
        </Banner>
      )}

      <StyledProfile
        primarytheme={primarytheme}
        secondarytheme={secondarytheme}
      >
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
            <div className="profile-banner-container">
              <div className="banner-image">
                <img src={BannerImg} alt="Banner" />
              </div>

              <div className="profile-container">
                <div className="profile">
                  <div
                    className="image-container"
                    onMouseEnter={() =>
                      userData.uid === uid && setIsHovered(true)
                    }
                    onMouseLeave={() =>
                      userData.uid === uid && setIsHovered(false)
                    }
                    onClick={() => {
                      if (userData.uid === uid) {
                        actionModalFunction();
                      }
                    }}
                  >
                    <img src={userData.photoURL || ProfileImg} alt="Profile" />
                    {userData.uid === uid && isHovered && (
                      <FaCamera className="change-btn" />
                    )}
                  </div>

                  <div className="profile-buttons">
                    {uid !== userData.uid && (
                      <button
                        onClick={requestModalfunc}
                        className="contact-btn"
                      >
                        Contact
                      </button>
                    )}
                    {uid === userData.uid && (
                      <button onClick={themeModalfunc} className="green-btn">
                        Theme
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-details">
              <div className="details">
                <h4>{userData.displayName}</h4>

                {/* <p>{}</p> */}
                <p>
                  {Number(userData.grade) === 9
                    ? "Fresherman"
                    : Number(userData.grade) === 10
                    ? "Sophomore"
                    : Number(userData.grade) === 11
                    ? "Junior"
                    : Number(userData.grade) === 12
                    ? "Senior"
                    : null}{" "}
                  <span style={{ fontWeight: "bold" }}>. </span>
                  {userData.schoolName}
                </p>
                <p style={{ marginTop: "20px" }}>{userData.description}</p>
              </div>

              <div className="service-area-map">
                {serviceAreaPath.length > 0 ? (
                  <img
                    src={mapUrl}
                    alt="Service Area Map"
                    onClick={mapModalFunction}
                  />
                ) : (
                  <p>No service area Available</p>
                )}
              </div>
            </div>

            <hr />

            <div className="info-container">
              <h4>Services</h4>
              <div className="profile-services">
                {userData.services && userData.services.length > 0 ? (
                  userData.services.map((service, index) => (
                    <>
                      <div key={index} className="service-item">
                        <div className="image-border">
                          <img
                            src={serviceImages[service]}
                            alt={service}
                            style={{ width: "50px", height: "50px" }}
                          />
                        </div>

                        <div>
                          <h5>
                            {service
                              .replace(/-/g, " ")
                              .replace(/^\w/, (c) => c.toUpperCase())}{" "}
                          </h5>
                        </div>
                      </div>
                    </>
                  ))
                ) : (
                  <p>No services available</p>
                )}
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
  min-height: calc(100vh - 80px);

  .profile-banner-container {
    position: relative;
    .banner-image {
      position: relative;
      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
    }

    .profile-container {
      position: absolute;
      top: 58%;
      left: 0;
      width: 100%;
      z-index: 1;
      padding: 2rem;
      .profile {
        width: 90%;
        margin: auto;
        display: flex;
        justify-content: center;
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

        .profile-buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          

          .green-btn {
            border: 2px solid ${(props) => props.secondarytheme};
            color: ${(props) => props.secondarytheme};
          }
          .contact-btn {
            background-color: ${(props) => props.secondarytheme};
          }
        }
      }
    }

    @media (min-width: 600px) {
      .profile-container {
        top: 60%;
        .profile {
          justify-content: space-between;
          width: 80%;
          .profile-buttons{
            
          }
        }
      }
    }
  }

  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  hr {
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 80%;
    margin: auto auto var(--section-margin) auto;
  }

  .profile-details {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    width: 90%;
    margin: 120px auto var(--section-margin) auto;
    .service-area-map {
      margin-top: 3rem;

      img {
        width: 100%;
        height: auto;
        border-radius: var(--l-radius);
      }
    }
  }

  .info-container {
    width: 90%;
    margin: auto auto var(--section-margin) auto;
    .profile-services {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 2rem;
      margin-top: 3rem;
      .service-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 1rem;

        .image-border {
          background-color: ${(props) => props.primarytheme};
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .service-btn {
        border-radius: 50px;
        border: 1px solid var(--gray-color);
        color: var(--gray-color);
        background-color: transparent;
        padding: 4px 6px;
        pointer-events: none;
      }
    }

    /* .service-area {
      margin-top: 3rem;
      .service-area-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
      }
  
    } */
  }

  @media (min-width: 630px) {
    /* width: 80%;
    margin: 90px auto var(--section-margin) auto; */

    .info-container {
      width: 80%;
      margin: auto auto var(--section-margin) auto;
      .profile-services {
        justify-content: flex-start;
      }
    }

    .profile-details {
      width: 80%;
      margin: 90px auto var(--section-margin) auto;
      justify-content: space-between;
    }

    .profile-container {
      justify-content: space-between;
      align-items: center;
      .buttons {
        align-self: flex-start;
        .profile-buttons {
          flex-direction: row;
        }
      }
    }
  }

  @media (min-width: 1024px) {
  }
`;



const Banner = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  background-color: coral;
  padding: 5px;
  width: 100%;
  p {
    color: white;
    text-align: center;
  }
`;