import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

export default function ProfileSetup({ backdropHandler }) {
  const [stepNum, setStepNum] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    userName: "",
    phoneNumber: "",
    zipCode: "",
    grade: "",
    description: "",
    schoolName: "",
    profileImg: "",
    services: "",
  });

  function onChangeHandler(e) {
    console.log("e", e.target.name, e.target.value);
    setForm((current) => ({ [current[e.target.name]]: e.target.value }));
  }

  return (
    <StyledProfileSetup>
      <div className="heading">
        <h4>Profile Setup</h4>
        <button className="icon" onClick={(e) => backdropHandler(false)}>
          {<CloseIcon htmlColor="var(--primary-color)" fontSize="medium" />}
        </button>
      </div>
      <div className="content">
        <h4>Start Creating your page</h4>
        <form>
          <Step1 form={form} onChangeHandler={onChangeHandler} />
        </form>
      </div>
    </StyledProfileSetup>
  );
}

function Step1({ form, onChangeHandler }) {
  return (
    <>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          type={"text"}
          minLength={3}
          placeholder="Enter Full Name"
          name={"fullName"}
          value={form.fullName}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <label htmlFor="userName">Username</label>
        <input
          type={"text"}
          minLength={3}
          placeholder="Enter Username"
          name={"userName"}
          value={form.userName}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number</label>
        <PhoneInput
          country={"us"}
          value={form.phoneNumber}
          onChange={(phone) =>
            onChangeHandler({ target: { name: "phoneNumber", value: phone } })
          }
          onlyCountries={["us"]}
          placeholder="Enter phone number"
        />
      </div>
    </>
  );
}

const StyledProfileSetup = styled.section`
  h4,
  h5 {
    font-weight: 500;
    color: var(--text-color);
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h4{
        margin: 2rem auto;
    }
  }
`;

// const StyledStep = styled(React.Fragment)`
// min-height: 400px;

// `
