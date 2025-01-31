import React from "react";
import styled from "styled-components";

export default function Heading({ title }) {
  return (
    <StyledHeading>
      <div className="content">
        <h1>{title}</h1>
      </div>
    </StyledHeading>
  );
}

const StyledHeading = styled.div`
  height: 35vh;
  background-color: var(--section-bg-color);
  display: flex;
  align-items: flex-end;
  padding: 7% 0;
  .content {
    width: var(--section-width);
    margin: auto;
    display: flex;
    align-items: flex-end;
    h1{
        font-weight: bolder;
    }
  }
`;
