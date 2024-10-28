import React from 'react'
import styled from "styled-components";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ConsentNotFound() {
  return (
    <>
      <Navbar />

      <StyledConsent>
        <h4>Sorry, we only have jobs for high school.</h4>
      </StyledConsent>
      <Footer />
    </>
  );
}

const StyledConsent = styled.div`
  width: var(--section-width);
  margin: var(--section-margin) auto;
  min-height: var(--section-height);
  display: flex;
  justify-content: center; 
  align-items: center;
  h4 {
    text-align: center;
  }
`;
