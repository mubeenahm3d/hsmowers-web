import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import BackdropWrapper from "../../components/modals/BackdropWrapper";
import ProfileSetupModal from "./ProfileSetupModal";

export default function UserConsent({ backdropHandler }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [consent, setConsent] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(parseInt(event.target.value));
  };

  function submitHandler(e) {
    e.preventDefault();
    console.log("selected option", )
    if (selectedOption) {
      // backdropHandler(false);
      setProfileModal(true);
    }
     else {
      // setConsent(true);
      setProfileModal(false);
    }
  }

  return (
    !profileModal ? (<StyledUserConsent>
      <div className="heading">
        <h4>User Consent</h4>
        <button className="icon" onClick={() => backdropHandler(false)}>
          <CloseIcon htmlColor="var(--primary-color)" fontSize="large" />
        </button>
      </div>
      <h4 className="mid-heading">Confirm Your Status</h4>
      {consent ? (
        <div className="consent-resonse">
          <p>Sorry, we only have jobs for high school students.</p>
          <button type="submit" onClick={() => backdropHandler(false)}>
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={submitHandler} className="content">
          <label htmlFor="1st">
            <input
              type="radio"
              id="1st"
              name="consent"
              value="true"
              onChange={handleOptionChange}
            />
            Yes, I am over 13 years old and I am currently enrolled in High
            School
          </label>
          <label htmlFor="2nd">
            <input
              type="radio"
              id="2nd"
              name="consent"
              value="false"
              onChange={handleOptionChange}
            />
            No, I am not over 13 years old
          </label>
          <label htmlFor="3rd">
            <input
              type="radio"
              id="3rd"
              name="consent"
              value="false"
              onChange={handleOptionChange}
            />
            No, I am not currently enrolled in High School.
          </label>
          <button type="submit">Submit</button>
        </form>
      )}

    </StyledUserConsent> ):  (
      <ProfileSetupModal
              heading={"Profile Setup"}
              backdropHandler={() => setProfileModal(false)}
            />
    )
  );
}

const StyledUserConsent = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  .heading {
    width: 100%;
  }
  .consent-resonse {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 70%;
    margin: auto;
    margin-top: 2rem;
    label {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    button {
      align-self: center;
    }
  }
`;
