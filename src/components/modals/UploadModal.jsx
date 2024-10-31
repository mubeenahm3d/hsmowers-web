import React, { useState } from "react";
import styled from "styled-components";
import ProfileImg from "../../assets/profilesvg.svg";
import CloseIcon from "@mui/icons-material/Close";
import { auth } from "../../authentication/firebase";

export default function UploadModal({ backdropHandler, heading }) {
  const [currentImage, setCurrentImage] = useState(ProfileImg);
  const currentUser = auth?.currentUser;
  const currentUserPhoto = currentUser?.photoURL; 

  const fileSelectedHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setCurrentImage(reader.result); 
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
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
        <img src={currentUserPhoto ? currentUserPhoto : currentImage} alt="" />
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
        <button>Save</button>
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
      max-width: 150px;
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
      &:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
      }
    }
  }
`;
