import React from "react";
import { StyledProfileSetupStep } from "../../styles/StyledProfileSetup";

export default function BusinessInfo({ form, onChangeHandler }) {
  return (
    <StyledProfileSetupStep className="step4">
      <h3>Create your Business Page</h3>
      <p className="description">State your basic business details</p>
      <div className="fields">
        <div className="field">
          <label htmlFor="fullName">Name of your business</label>
          <input
            type="text"
            placeholder="Enter name"
            required
            minLength={5}
            value={form.businessName}
            onChange={(e) =>
              onChangeHandler({
                target: { name: "businessName", value: e.target.value },
              })
            }
          />
        </div>
        <div className="field">
          <label htmlFor="fullName">Describe your business</label>
          <textarea
            placeholder="Tell customers about your business"
            rows={3}
            required
            maxLength={200}
            name={"description"}
            value={form.description}
            onChange={onChangeHandler}
          />
        </div>
        <div className="field">
          <label htmlFor="fullName">Where did you start this business?</label>
          <input
            type="text"
            placeholder="Write here"
            required
            minLength={5}
            value={form.businessName}
            onChange={(e) =>
              onChangeHandler({
                target: { name: "businessName", value: e.target.value },
              })
            }
          />
        </div>
        {/* <div className="field">
          <label htmlFor="fullName">Enter Your Zip Code</label>
          <input
            type="number"
            placeholder="Enter Zip Code"
            required
            minLength={5}
            value={form.zipCode}
            onChange={(e) =>
              onChangeHandler({
                target: { name: "zipCode", value: e.target.value },
              })
            }
          />
        </div>
        <div className="field">
          <label htmlFor="fullName">Enter Your Address</label>
          <input
            type="text"
            placeholder="Enter Address"
            required
            value={form.address}
            onChange={(e) =>
              onChangeHandler({
                target: { name: "address", value: e.target.value },
              })
            }
          />
        </div> */}
      </div>
    </StyledProfileSetupStep>
  );
}
