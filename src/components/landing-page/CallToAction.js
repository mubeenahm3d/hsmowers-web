import React from "react";
import styled from "styled-components";
import LoadingButton from "../LoadingButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CallToAction = () => {
  return (
    <StyledCTA>
      <div className="wrapper">
        <h1>Find Perfect Mower for Your Lawn</h1>
        <div className="right">
          <p>
            Connect with skilled mowers nearby for regular lawn care or one-time
            services. We help you find reliable professionals to transform your
            outdoor space.
          </p>
          <LoadingButton className="white">
            Find out in Your Area <ArrowForwardIcon fontSize="small" />
          </LoadingButton>
        </div>
      </div>
    </StyledCTA>
  );
};

const StyledCTA = styled.div`
  background-color: var(--primary-color);
  padding: var(--section-margin) 0;
  .wrapper {
    width: var(--section-width);
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    color: var(--text-base-color);
    gap: 2rem;
    h1 {
      font-weight: 500;
      flex: 1 1 40%;
    }
    .right {
      flex: 1 1 55%;
      p {
        color: inherit;
      }
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: var(--heading-gap);
    }
  }
`;
export default CallToAction;
