import React from "react";
import styled from "styled-components";

export default function ServiceCard({ serviceName }) {

  const serviceImg = require(`../../assets/profile/${serviceName}.png`);
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
width: 280px;
height: 160px;
aspect-ratio: 16/9;
border: 1px solid var(--border-color);
border-radius: 8px;
img{
  height: 60px;
}
`;
