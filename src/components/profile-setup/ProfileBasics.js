import React from "react";
import PhoneInput from "react-phone-input-2";
import { StyledProfileSetupStep } from "../../styles/StyledProfileSetup";

export default function ProfileBasics({ form, onChangeHandler }) {
  return (
    <StyledProfileSetupStep>
      <h3>Create Business Profile</h3>
      <p className="description">Enter your name & email to view your business page.</p>
      <div className="fields">
        <div className="field">
          <label htmlFor="fullName">Full Name</label>
          <input
            type={"text"}
            minLength={3}
            placeholder="Enter Full Name"
            name={"displayName"}
            value={form.displayName}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="userName">Username</label>
          <input
            type={"text"}
            minLength={3}
            placeholder="Enter Username"
            name={"userName"}
            value={form.userName}
            onChange={onChangeHandler}
            required
            readOnly
            title="Username cannot be changed"
          />
        </div>
        <div className="field">
          <label htmlFor="phoneNumber">Phone Number</label>
          <PhoneInput
            country={"us"}
            value={form.phoneNumber}
            onChange={(phone) =>
              onChangeHandler({
                target: { name: "phoneNumber", value: phone },
              })
            }
            onlyCountries={["us"]}
            placeholder="Enter phone number"
            required
          />
        </div>
      </div>
    </StyledProfileSetupStep>
  );
}

