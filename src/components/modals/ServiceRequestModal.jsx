import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { db } from "../../authentication/firebase";
import { alertActions } from "../../store/alertSlice";
import { addDoc, collection } from "firebase/firestore"; 
import { useDispatch } from "react-redux";
import LoadingButton from "../LoadingButton";

export default function ServiceRequestModal({ backdropHandler, heading }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
     const dispatch = useDispatch();

    const requestRef = collection(db, "serviceRequests");

    const handleRequest = async() => {
        setLoading(true)
        try {
             await addDoc(requestRef, {
               name: name,
               email: email,
               message: message
             });
             dispatch(
               alertActions.setAlert({
                 messageType: "success",
                 title: "Request sent successfully!",
               })
             );
             setName("");
             setEmail("");
             setMessage("");
             backdropHandler(false);
        } catch (error) {
              console.log(error);
              dispatch(
                alertActions.setAlert({
                  messageType: "error",
                  title: "Failed to send Request!",
                })
              );
        }
        finally{
            setLoading(false)
        }
    }


  return (
    <>
      <StyledRequest>
        <div className="heading">
          <h4>{heading}</h4>
          <button className="icon" onClick={() => backdropHandler(false)}>
            <CloseIcon htmlColor="var(--primary-color)" fontSize="large" />
          </button>
        </div>

        <div className="content">
          <label htmlFor="name">Enter your Name</label>
          <input
            type="name"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <p style={{color:'var(--primary-color)'}}>We'll notify you when mower available in your area.</p>
          <LoadingButton
            loading={loading}
            title={"Request"}
            onClick={handleRequest}
          />
        </div>
      </StyledRequest>
    </>
  );
}

const StyledRequest = styled.div`
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
