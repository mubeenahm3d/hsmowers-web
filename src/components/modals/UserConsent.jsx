import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";

export default function UserConsent({ backdropHandler }) {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate()

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault()
    navigate("/login")
  }

  console.log('selected option', selectedOption)
  return (
    <StyledUserConsent>
      <div className="heading">
        <h4>User Consent</h4>
        <button className="icon" onClick={(e) => backdropHandler(false)}>
          {<CloseIcon htmlColor="var(--primary-color)" fontSize="large" />}
        </button>
      </div>
      <h4 className="mid-heading">Confirm Your Status</h4>
      <form onSubmit={submitHandler} className="content">
        <label htmlFor="1st">
          <input required type="radio" id="1st" name="consent"  value={true} onChange={handleOptionChange}/>
          Yes, I am over 13 years old and I am currently enrolled in High School
        </label>
        <label htmlFor="2nd">
          <input required type="radio" id="2nd" name="consent" value={false} onChange={handleOptionChange}/>
          No, I am not over 13 years old
        </label>
        <label htmlFor="3rd">
          <input required type="radio" id="3rd" name="consent" value={false} onChange={handleOptionChange}/>
          No, I am not currently enrolled in High School
        </label>
        <button type="submit">Submit</button>
      </form>
    </StyledUserConsent>
  );
}

const StyledUserConsent = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  .heading {
    width: 100%;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 70%;
    margin: auto;
    margin-top: 32px;
    label {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    button {
      margin-top: 16px;
      align-self: center;
    }
  }
`;
