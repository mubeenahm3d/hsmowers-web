import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import ProfileCards from "../components/profile/ProfileCards";
import Footer from "../components/Footer";
import BackdropWrapper from "../components/modals/BackdropWrapper";
import UserConsent from "../components/modals/UserConsent";
import Heading from "../components/Heading";
import LoadingButton from "../components/LoadingButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LandingMenu from "../components/LandingMenu";

export default function GetStarted() {
  const [consentOpen, setConsentOpen] = useState(false);
  function backdropHandler() {
    setConsentOpen((current) => !current);
  }

  return (
    <>
      <BackdropWrapper
        open={consentOpen}
        backdropHandler={backdropHandler}
        element={<UserConsent backdropHandler={backdropHandler} />}
      />
      <LandingMenu />
      <Heading title={"Get Started"} />
      <StyledGetStarted>
        <div className="first">
          <h3>Are you a student?</h3>
          <p>
            HighSchoolMowers.com empowers students to promote their businesses
            and attract customers.Get your own website and access our extensive
            advertising network!
          </p>
          <LoadingButton onClick={backdropHandler}>
            Sign up now! <ArrowForwardIcon fontSize="small" />
          </LoadingButton>
        </div>
        <div className="second">
          <h4>Recently Created Profiles</h4>
          <ProfileCards />
        </div>
      </StyledGetStarted>
      <Footer />
    </>
  );
}

const StyledGetStarted = styled.section`
  width: var(--section-width);
  margin: 0 auto 5% auto;
  .first {
    margin-top: var(--heading-margin);
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: var(--heading-gap);
    p {
      max-width: 65ch;
    }
  }
  .second {
    margin-top: var(--heading-margin);
    & > :first-child {
      margin-bottom: 20px;
      font-weight: 500;
    }
  }

  @media (max-width: 768px) {
    text-align: center;
    .first {
      align-items: center;
      justify-content: center;
    }
  }
`;
