import React from "react";
import PhoneInput from "react-phone-input-2";
import { StyledProfileSetupStep } from "../../styles/StyledProfileSetup";
import { Link } from "react-router-dom";

export default function LoginInfo({ form, onChangeHandler }) {
  return (
    <StyledProfileSetupStep>
      <p>Almost there!</p>
      <h3 style={{ maxWidth: "16ch" }} className="description">
        Just one more step to set up your account
      </h3>
      <div className="fields">
        <div className="field">
          <label htmlFor="fullName">Email</label>
          <input
            type={"email"}
            minLength={3}
            placeholder="Enter Email"
            name={"email"}
            value={form.email}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="password">Create Password*</label>
          <input
            type="password"
            minLength={8}
            placeholder="Create new password*"
            name={"password"}
            value={form.password}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="confirmPassword">Confirm Password*</label>
          <input
            type="password"
            minLength={8}
            placeholder="Confirm password*"
            name={"confirmPassword"}
            value={form.password}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="field" style={{flexDirection: "row", alignItems: "center"}}>
          <input
            type="checkbox"
            name={"terms"}
            value={form.terms}
            onChange={onChangeHandler}
            required
          />
          <label htmlFor="terms">
            I agree to the <Link to="/terms-of-service">Terms of Service</Link>{" "}
            & <Link to="/privacy-policy">Privacy Policy</Link>
          </label>
        </div>
      </div>
    </StyledProfileSetupStep>
  );
}
