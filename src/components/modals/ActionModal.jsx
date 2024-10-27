import React from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

export default function ActionModal({
  backdropHandler,
  heading,
  msg,
  buttonName,
  action,
}) {
  return (
    <StyledInfo>
      <div className="heading">
        <h4>{heading}</h4>
        <button className="icon" onClick={backdropHandler}>
        {<CloseIcon htmlColor="var(--primary-color)" fontSize="large" />}
        </button>
      </div>

      <div className="content">
        <p>{msg}</p>
        <button onClick={action}>{buttonName}</button>
      </div>
    </StyledInfo>
  );
}

const StyledInfo = styled.section`
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
    span {
      max-width: 35ch;
      text-align: center;
    }
  }
`;
