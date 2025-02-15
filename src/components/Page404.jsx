import React from 'react'
import styled from 'styled-components'
import Navbar from "./Navbar";
import Footer from "./Footer";
import ErrorImg from '../assets/404.svg'
import LandingMenu from './LandingMenu';

export default function Page404() {
  return (
    <>
      <LandingMenu />
      <Main>
        {/* <h1>404</h1> */}
        <img src={ErrorImg} alt="" />
        <h4>Page not found</h4>
      </Main>
      <Footer />
    </>
  );
}

const Main = styled.div`
  min-height: var(--section-height);
  margin: var(--section-margin) auto;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img{
    max-width: 500px;
    height: auto;
  }

  h4{
    color: var(--primary-color);
  }
`;
