import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch } from "react-redux";
import { alertActions } from "../../store/alertSlice";
import LoadingButton from "../LoadingButton";
import { ServiceEmail } from "../../utils/ServiceEmail";

export default function RequestModal({ backdropHandler, heading, uemail }) {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [showEmail, setShowEmail] = useState(true);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showSMS, setShowSMS] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

   const handleRequest = async () => {
     setLoading(true);
      console.log("Email:", email);
      console.log("Number:", number);
      console.log("Message:", message);


     const result = await ServiceEmail(
       email, 
       uemail,
       message,
       number, 
       setLoading,
       dispatch,
       backdropHandler
     );

     if (result.success) {
       setEmail("");
       setMessage("");
       setNumber("");
     }
   };




  return (
    <>
      <StyledInfo>
        <div className="heading">
          <h4>{heading}</h4>
          <button className="icon" onClick={() => backdropHandler(false)}>
            <CloseIcon htmlColor="var(--primary-color)" fontSize="large" />
          </button>
        </div>

        <div className="content">
          <label htmlFor="message">Tell me how I can help?</label>
          <textarea
            placeholder="Write your message"
            rows={2}
            required
            maxLength={500}
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <label htmlFor="message">How should I reply?</label>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="email"
              checked={showEmail}
              onChange={() => setShowEmail((prev) => !prev)}
              style={{ marginTop: "0.8rem" }}
            />
            <label htmlFor="email" style={{ marginTop: "1rem" }}>
              Email
            </label>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="number"
              checked={showPhoneNumber}
              onChange={() => setShowPhoneNumber((prev) => !prev)}
            />
            <label htmlFor="number">Phone Number</label>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="sms"
              checked={showSMS}
              onChange={() => setShowSMS((prev) => !prev)}
            />
            <label htmlFor="sms">SMS</label>
          </div>

          <div className="custom-inputs">
            {showEmail && (
              <>
                <label htmlFor="emailInput">Enter your email</label>
                {/* <br /> */}
                <input
                  type="email"
                  id="emailInput"
                  placeholder="Enter your email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginTop: "0.6rem" }}
                />
              </>
            )}
            <br />
            {(showPhoneNumber || showSMS) && (
              <>
                <label htmlFor="numberInput">Enter your Phone Number</label>
                {/* <br /> */}
                <input
                  type="number"
                  id="numberInput"
                  placeholder="Enter your Phone Number"
                  value={number}
                  required
                  onChange={(e) => setNumber(e.target.value)}
                  style={{ marginTop: "0.6rem" }}
                />
              </>
            )}
          </div>

          <LoadingButton
            loading={loading}
            title={"Request"}
            onClick={handleRequest}
          />
        </div>
      </StyledInfo>
    </>
  );
}

const StyledInfo = styled.div`
  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.7rem;

    .custom-inputs {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 1rem;
      width: 320px;
      margin-top: -15px;
      input {
        width: 15px;
        max-width: 15px;
      }
    }

    label {
      font-weight: 500;
      text-align: left;
      width: 320px;
    }

    input {
      width: 320px;
      max-width: 320px;
    }

    textarea {
      padding: 10px 6px;
      border-radius: var(--m-radius);
      margin-bottom: 10px;
      width: 320px;
      max-width: 320px;
      height: 100px;
      max-height: 100px;
    }
  }
`;
