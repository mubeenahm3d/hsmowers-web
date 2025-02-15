import React from "react";
import { StyledProfileSetupStep } from "../../styles/StyledProfileSetup";
import { Avatar } from "@mui/material";

export default function ProfileInfo({ form, onChangeHandler }) {
  const fileSelectedHandler = (e) => {
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        onChangeHandler({ target: { name: "photoURL", value: reader.result } });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <StyledProfileSetupStep className="step3">
    <h3>Create your Business Page</h3>
    <p className="description">State your basic business details</p>
    <div className="fields">
      <div className="field">
        <label htmlFor="photoURL">Profile Picture (optional)</label>
        <Avatar src={form.photoURL} sx={{ width: "100px", height: "100px" }} />
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          name="photoURL"
          onChange={(e) => fileSelectedHandler(e)}
          id="img-upload"
        />
        <label htmlFor="img-upload" className="gray-btn">
          Upload Image
        </label>
      </div>
      <div className="field">
        <label htmlFor="userName">School Name</label>
        <input
          type={"text"}
          minLength={3}
          placeholder="Enter School Name"
          name={"schoolName"}
          value={form.schoolName}
          onChange={onChangeHandler}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="grade">Grade</label>
        <select
          name="grade"
          value={form.grade}
          onChange={onChangeHandler}
          required
        >
          <option value={9}>Fresherman</option>
          <option value={10}>Sophomore</option>
          <option value={11}>Junior</option>
          <option value={12}>Senior</option>
        </select>
      </div></div>
    </StyledProfileSetupStep>
  );
}
