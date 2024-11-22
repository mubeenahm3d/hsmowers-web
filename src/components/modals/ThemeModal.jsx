import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { db } from "../../authentication/firebase";
import { doc, setDoc } from "firebase/firestore";
import themes from "../../utils/themes.json";
import LoadingButton from "../LoadingButton";
import { userActions } from "../../store/userSlice";
import { useDispatch } from "react-redux";

export default function ThemeModal({ backdropHandler, heading, userId }) {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleThemeClick = (theme) => {
    setSelectedTheme(theme);
  };

  const handleApplyClick = () => {
    if (selectedTheme) {
      saveThemeToDatabase(selectedTheme);
    } else {
      console.log("No theme selected");
    }
  };

  const saveThemeToDatabase = async (theme) => {
    setLoading(true);
    try {
      const userRef = doc(db, "userInfo", userId);
      const themeData = {
        selectedTheme: theme,
        themeId: themes[theme]?.id,
        primaryColor: themes[theme]?.primaryColor,
        secondaryColor: themes[theme]?.secondaryColor,
        tertiaryColor: themes[theme]?.tertiaryColor,
      };

      dispatch(userActions.setTheme(themeData));
      await setDoc(userRef, themeData, { merge: true });
      console.log("Theme and colors saved to database");
      backdropHandler(false);
    } catch (error) {
      console.error("Error saving theme:", error);
    } finally {
      setLoading(false);
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
            <div
              className="color-top"
              style={{ backgroundColor: themes.theme1.primaryColor }}
            ></div>
            <div className="color-bottom">
              <div
                className="color-left"
                style={{ backgroundColor: themes.theme1.secondaryColor }}
              ></div>
              <div
                className="color-right"
                style={{ backgroundColor: themes.theme1.tertiaryColor }}
              ></div>
            </div>
          </div>

          <div
            className={`theme ${selectedTheme === "theme2" ? "selected" : ""}`}
            onClick={() => handleThemeClick("theme2")}
          >
            <div
              className="color-top"
              style={{ backgroundColor: themes.theme2.primaryColor }}
            ></div>
            <div className="color-bottom">
              <div
                className="color-left"
                style={{ backgroundColor: themes.theme2.secondaryColor }}
              ></div>
              <div
                className="color-right"
                style={{ backgroundColor: themes.theme2.tertiaryColor }}
              ></div>
            </div>
          </div>
        </div>

        <LoadingButton
          loading={loading}
          title="Apply"
          onClick={handleApplyClick}
        />
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

      .theme {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        transition: border 0.3s ease;
        display: flex;
        flex-direction: column;
      }

      .color-top {
        width: 100%;
        height: 50%;
      }

      .color-bottom {
        display: flex;
        width: 100%;
        height: 50%;

        .color-left,
        .color-right {
          width: 50%;
          height: 100%;
        }
      }

      .selected {
        border: 3px solid #000;
      }
    }
  }
`;
