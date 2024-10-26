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
      backdropHandler();
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
          <h4>Contact Us</h4>
          <input
            required={true}
            type="email"
            placeholder="Email"
            ref={emailRef}
          />
          <textarea
            required={true}
            name="message"
            id=""
            placeholder="Message"
            ref={messageRef}
          ></textarea>
          <LoadingButton loading={submitLoading} title="Submit" type="submit" />
        </form>
      }
    </StyledForm>
  );
}

const StyledForm = styled.section`
  display: flex;
  flex-direction: column;
  form {
    padding: 1rem 3rem;
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 1rem;
    textarea {
      min-width: 300px;
      max-width: 3000px;
      min-height: 120px;
      max-height: 120px;
      padding: 6px 14px;
    }
    input,
    textarea {
      width: 300px;
      border-radius: 8px;
      border-width: 2px;
    }
  }
  .contact-btn {
    align-self: flex-end;
    background-color: var(--green-color);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-width: auto;
    max-width: 38px;
    overflow: hidden;
    padding: 8px 9.5px;
    box-shadow: 0px 1px 4px 1px var(--shadow);
    span {
      color: inherit;
      white-space: nowrap;
    }
    &:hover {
      background-color: #76a246;
      max-width: 200px;
    }
  }
  @media (max-width: 500px) {
    form {
      padding: 1rem;
    }
  }
`;
