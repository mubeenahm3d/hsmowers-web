import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import ProfileCards from "../components/profile/ProfileCards";
import Footer from "../components/Footer";
import BackdropWrapper from "../components/modals/BackdropWrapper";
import Info from "../components/modals/Info";
import UserConsent from "../components/modals/UserConsent";

export default function GetStarted() {
    const [consentOpen, setConsentOpen] = useState(true)
    function backdropHandler() {
        setConsentOpen(current => !current)
    }
  return (
    <>
      <Navbar />
      <StyledGetStarted>
      <BackdropWrapper
        open={consentOpen}
        backdropHandler={backdropHandler}
        element={<UserConsent backdropHandler={backdropHandler} />}
      />
        <div className="first">
          <h1>Student Signup</h1>
          <p>
            HighSchoolMowers.com helps High School Students promote their own
            business and gain customers Get your own Business Website Plus Tap
            into our Large Advertising Network to grow your business
          </p>
          <button onClick={backdropHandler}>Get Started Today!</button>
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
