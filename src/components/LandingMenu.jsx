import React from 'react'
import styled from "styled-components";
import logo from "../assets/MowerLogo.png";

export default function LandingMenu() {
  return (
    <>
      <Main>
        <StyledNavbar>
          <div className="image-container">
            <img src={logo} alt="" />
            <h2>HighSchoolMowers</h2>
          </div>
              <button>Student? Signup!</button>

        </StyledNavbar>
      </Main>
    </>
  );
}

const Main = styled.div`
  background-color: var(--background-color);
  width: var(--section-width);
  margin: 1rem auto;
`;

const StyledNavbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  .image-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    img {
      max-width: 70px;
      height: auto;
    }
  }

  button{
    justify-content: center;
  } 
  
  @media (min-width: 600px) {
    justify-content: space-between;
    gap: 1rem;
    /* .image-container {
      img {
        width: 80px;
        height: 80px;
      }
    } */
  }
`;