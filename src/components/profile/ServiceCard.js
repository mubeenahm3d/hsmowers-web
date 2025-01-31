import React from "react";
import styled from "styled-components";

export default function ServiceCard({ serviceName }) {
  const serviceImg = require("../../assets/services/mowing.png");
  return (
    <StyledServiceCard>
      <img src={serviceImg} alt="" />
      <h5>{serviceName.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase())}</h5>
    </StyledServiceCard>
  );
}

const StyledServiceCard = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
gap: var(--heading-gap);
width: 240px;
aspect-ratio: 16/9;
border: 1px solid var(--border-color);
`;
