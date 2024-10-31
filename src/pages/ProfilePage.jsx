import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import ProfileImg from "../assets/profileimg.avif";
import BackdropWrapper from "../components/modals/BackdropWrapper";
import { auth } from "../authentication/firebase";
import Footer from "../components/Footer";
import UploadModal from "../components/modals/UploadModal";
import { FaCamera } from "react-icons/fa";

export default function ProfilePage() {

  const currentUser = auth?.currentUser;

  const [showNumber, setShowNumber] = useState(false);
  const [number, setNumber] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const shownumberHandle = () => {
    setNumber(true);
  };

  const handleImageClick = () => {
    setIsEditing(true);
  };

  const [actionModal, setActionModal] = useState(true);

  const backdropHandler = () => {
    setActionModal((current) => !current);
    setIsEditing(false);
  };

  return (
    <>
      <Navbar />
      <StyledProfile>
        <BackdropWrapper
          open={actionModal}
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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img src={ProfileImg} alt="Profile" />
            {isHovered && (
              <FaCamera className="change-btn" onClick={e => handleImageClick()} />
            )}
          </div>

          <div className="profile-details">
            <h4>Muhammad Shahzad</h4>
            <p>User Name</p>
            <p>Grade</p>
            <p>City, State, USA</p>
          </div>
          <div className="buttons">
            {currentUser && <button>Edit Profile</button>}
            <button onClick={shownumberHandle}>{number}</button>
          </div>
        </div>

        <hr />

        <div className="info-container">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
            numquam possimus corporis vel doloribus officia soluta, suscipit
            nemo, repellendus, amet saepe neque molestias eum fuga tenetur
            aliquid sunt maxime quae.
          </p>

          <div className="profile-services">
            <div className="service-btn">Mowing</div>
            <div className="service-btn">Baby Sitting</div>
            <div className="service-btn">Window Cleaning</div>
            <div className="service-btn">Edging</div>
            <div className="service-btn">Leaf Removal</div>
          </div>
        </div>
      </StyledProfile>
      <Footer />
    </>
  );
}

const StyledProfile = styled.div`
  width: 80%;
  margin: var(--section-margin) auto;
  height: auto;

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
        max-width: 150px;
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
        pointer-events: auto;
        opacity: 1;
        transition: opacity 0.3s ease;
      }
    }
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
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
        &:hover {
          border-color: var(--primary-color);
          color: var(--primary-color);
        }
      }
    }
  }

  @media (min-width: 600px) {
    height: var(--section-height);
    .profile-container {
      align-items: flex-start;
      .buttons {
        align-self: flex-start;
      }
    }
  }

  @media (min-width: 1024px) {
    height: var(--section-height);
    .profile-container {
      align-items: flex-start;
      .buttons {
        align-self: flex-start;
        margin-left: auto;
      }
    }
  }
`;
