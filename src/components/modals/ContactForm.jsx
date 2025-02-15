import React, { useRef } from "react";
import styled from "styled-components";
import LoadingButton from "../LoadingButton";
import { useState } from "react";
import api from "../../utils/api";
import { alertActions } from "../../store/alertSlice";
import { useDispatch } from "react-redux";

export default function ContactForm({ backdropHandler }) {
  const [submitLoading, setSubmitLoading] = useState(false);
  const emailRef = useRef();
  const messageRef = useRef();

  const dispatch = useDispatch();

  async function submitHandler(e) {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      // const response = await api.post("/contact", {
      //   email: emailRef.current.value,
      //   content: messageRef.current.vaue,
      // });
      // console.log("response", response.data);
      // backdropHandler();
      dispatch(
        alertActions.setAlert({
          title: "Contact request successful",
          messageType: "success",
        })
      );
    } catch (error) {
      dispatch(
        alertActions.setAlert({
          title: "Contact request unsuccessful",
          messageType: "error",
        })
      );
      console.log("form submission error", error.message);
    }
    setSubmitLoading(false);
  }

  return (
    <StyledForm>
      {
        <form onSubmit={submitHandler}>
          <div className="input">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              required={true}
              type="text"
              placeholder="Type name here"
              ref={emailRef}
            />
          </div>
          <div className="input">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              required={true}
              type="email"
              placeholder="Type email here"
              ref={emailRef}
            />
          </div>
          <div className="input">
            <label htmlFor="message">Message</label>
            <textarea
              required={true}
              name="message"
              id="message"
              placeholder="Type message here"
              ref={messageRef}
            ></textarea>
          </div>
          <LoadingButton loading={submitLoading} type="submit">
            Send your message
          </LoadingButton>
        </form>
      }
    </StyledForm>
  );
}

const StyledForm = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  form {
    /* padding: 1rem 3rem; */
    width: 100%;
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 1rem;
    .input {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      width: 80%;
      textarea {
        min-width: 300px;
        max-width: 3000px;
        min-height: 120px;
        max-height: 120px;
        padding: 6px 14px;
      }
      input,
      textarea {
        width: 100%;
        border-width: 2px;
      }
      textarea {
        border-radius: 20px;
      }
    }
  }
  button {
    align-self: flex-start;
    margin-left: 10%;
    margin-top: 16px;
  }
  @media (max-width: 576px) {
    form {
      justify-content: flex-start;
      align-items: flex-start;
      .input input {
        width: 300px;
      }
      button{
        margin-left: 0;
      }
    }
  }
`;
