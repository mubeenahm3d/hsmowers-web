import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch } from "react-redux";
import { alertActions } from "../../store/alertSlice";
import LoadingButton from "../LoadingButton";
import { ServiceEmail } from "../../utils/ServiceEmail";

export default function RequestModal({ backdropHandler, heading, uemail }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

   const handleRequest = async () => {
     const result = await ServiceEmail(
       email,
       uemail,
       message,
       setLoading,
       dispatch,
       backdropHandler
     );
     if (result.success) {
       setEmail("");
       setMessage("");
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
          <label htmlFor="email">Enter your email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="message">Message</label>
          <textarea
            placeholder="Write your message"
            rows={5}
            required
            maxLength={200}
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
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
    gap: 1rem;
    margin-top: 2rem;

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
      width: 320px;
      max-width: 320px;
      height: 200px;
      max-height: 200px;
    }
  }
`;
