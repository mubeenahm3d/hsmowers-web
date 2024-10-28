import React from 'react'
import styled from "styled-components";
import logo from "../assets/MowerLogo.png";
import { useNavigate } from "react-router-dom";

export default function LandingMenu() {
  const navigate = useNavigate();
  return (
    <>
      <StyledNavbar>
        <div className="navbar-container">
          <div className="image-container">
            <img src={logo} alt="" />
            <h2>HighSchoolMowers</h2>
          </div>
          <button onClick={() => navigate("/signup")}>
            Student? Signup!
          </button>
        </div>
      </StyledNavbar>
    </>
  );
}


const StyledNavbar = styled.div`
  background-color: var(--background-color);
  width: var(--section-width);
  margin: 1rem auto;

  .navbar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;

    .image-container {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2 {
        color: var(--text-light-color);
        font-weight: 700;
      }

      img {
        max-width: 60px;
        margin-right: 6px;
        height: auto;
      }
    }
  }

  @media (min-width: 600px) {
    .navbar-container {
      justify-content: space-between;
    }
  }

  @media (min-width: 1024px) {
    .navbar-container {
      justify-content: space-between;
    }
  }

  @media (max-width: 400px) {
    .image-container {
      h2 {
        font-size: var(--m-heading);
        font-weight: 600;
      }
    }
  }
`;
