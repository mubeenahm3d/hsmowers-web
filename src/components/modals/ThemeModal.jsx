import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { db } from "../../authentication/firebase";
import { doc, setDoc } from "firebase/firestore";
import themes from "../../utils/theme.json";
import LoadingButton from "../LoadingButton";

export default function ThemeModal({ backdropHandler, heading, userId }) {
  const [selectedTheme, setSelectedTheme] = useState(null);


  const handleThemeClick = (theme) => {
    setSelectedTheme(theme);
    saveThemeToDatabase(theme);
  };

  const saveThemeToDatabase = async (theme) => {
    
    try {
      const userRef = doc(db, "userInfo", userId);

     
      await setDoc(
        userRef,
        {
          selectedTheme: theme,
          themeId: themes[theme]?.id,
          primaryColor: themes[theme]?.primaryColor,
          secondaryColor: themes[theme]?.secondaryColor,
        },
        { merge: true }
       
      );
      console.log("Theme and colors saved to database");
       backdropHandler(false);
    } catch (error) {
      console.error("Error saving theme:", error);
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
        <div className="themes">
          <div
            className={`theme ${selectedTheme === "theme1" ? "selected" : ""}`}
            onClick={() => handleThemeClick("theme1")}
          >
            <div className="color1"></div>
            <div className="color2"></div>
          </div>

          <div
            className={`theme2 ${selectedTheme === "theme2" ? "selected" : ""}`}
            onClick={() => handleThemeClick("theme2")}
          >
            <div className="color3"></div>
            <div className="color4"></div>
          </div>
        </div>


        {/* <button>Apply</button> */}
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
    justify-content: space-between;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;

    .themes {
      display: flex;
      flex-direction: row;
      gap: 1rem;

      .theme,
      .theme2 {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        transition: border 0.3s ease;
      }

      .color1 {
        background-color: red;
        width: 100%;
        height: 50%;
        position: absolute;
        top: 0;
        left: 0;
      }

      .color2 {
        background-color: orange;
        width: 100%;
        height: 50%;
        position: absolute;
        bottom: 0;
        left: 0;
      }

      .color3 {
        background-color: blue;
        width: 100%;
        height: 50%;
        position: absolute;
        top: 0;
        left: 0;
      }

      .color4 {
        background-color: green;
        width: 100%;
        height: 50%;
        position: absolute;
        bottom: 0;
        left: 0;
      }

      .selected {
        border: 3px solid #000;
      }
    }

    span {
      max-width: 35ch;
      text-align: center;
    }
  }
`;
