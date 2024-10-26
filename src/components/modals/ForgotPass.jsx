import React, { useRef } from "react";
import styled from "styled-components";
import { auth } from "../../authentication/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "../LoadingButton";

export default function ForgotPass({ backdropHandler }) {
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, emailRef.current.value);
      setLinkSent(true);
    } catch (e) {
      console.log("reset error", e);
    }
    setLoading(false);
  };

  return (
    <>
      <StyledPass>
        <div className="heading">
          <h4>Change Password</h4>
          <button className="icon" onClick={(e) => backdropHandler(false)}>
            {<CloseIcon htmlColor="var(--primary-color)" fontSize="large" />}
          </button>
        </div>
        {linkSent ? (
          <p>Change password link has been sent to your email</p>
        ) : (
          <form onSubmit={submitHandler}>
            {/* <label htmlFor="email">Enter Recovery Email</label> */}
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              ref={emailRef}
              required
            />
            <LoadingButton
              loading={loading}
              type="submit"
              title="Change Password"
            />
          </form>
        )}
      </StyledPass>
    </>
  );
}

const StyledPass = styled.div`
  p {
    text-align: center;
    max-width: 35ch;
    margin: auto;
  }
  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
  }
  form {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    label {
      align-self: flex-start;
    }
    input {
      width: 240px;
    }
  }
`;
