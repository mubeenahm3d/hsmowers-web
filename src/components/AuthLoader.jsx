import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

export default function AuthLoader() {
  return (
    <StyledAuthLoader>
      <CircularProgress color="primary" style={{color: "var(--primary-color)"}} />
    </StyledAuthLoader>
  );
}

const StyledAuthLoader = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
