import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import ProfileCards from "../components/profile/ProfileCards";
import Footer from "../components/Footer";
import ProfileSetup from "../components/modals/ProfileSetup";
import BackdropWrapper from "../components/modals/BackdropWrapper";

export default function GetStarted() {
  return (
    <>
      <Navbar />
      <StyledGetStarted>
      <BackdropWrapper
        open={false}
        // backdropHandler={backdropHandler}
        element={<ProfileSetup />}
      />
        <div className="first">
          <h1>Student Signup</h1>
          <p>
            HighSchoolMowers.com helps High School Students promote their own
            business and gain customers Get your own Business Website Plus Tap
            into our Large Advertising Network to grow your business
          </p>
          <button>Get Started Today!</button>
        </div>
        <div className="second">
          <h4>Recently Created Profiles</h4>
          <ProfileCards  />
        </div>
      </StyledGetStarted>
      <Footer />
    </>
  );
}

const StyledGetStarted = styled.section`
  width: 70%;
  min-height: var(--section-height);
  margin: var(--section-margin) auto;
  .first {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  .second {
    margin-top: var(--section-margin);
    & > :first-child {
      margin-bottom: 20px;
      font-weight: 500;
    }
  }

  @media (max-width: 690px) {
    text-align: center;
  }
`;
