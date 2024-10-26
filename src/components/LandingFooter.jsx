import React from 'react'
import styled from "styled-components";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function LandingFooter() {
  return (
    <>
      <FooterContainer>
        <div className="footer-text">
          <p>
            Students pay a small fee to have their own business promoted on the
            website, making it extremely easy to find the help you need
          </p>
        </div>

        <div className="social-media">
          <div className="icon-container">
            <FaXTwitter className="icon-img" />
            <FaInstagram className="icon-img" />
            <FaFacebookF className="icon-img" />
          </div>
          <h5>HighSchoolMowers.com ©2024</h5>
        </div>
      </FooterContainer>
    </>
  );
}


const FooterContainer = styled.div`
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  width: var(--section-width);
  margin: auto;
  .footer-text {
    p {
      max-width: 40ch;
      text-align: center;
    }
  }

  .social-media {
    .icon_container {
      .icon-img {
        width: 30px;
        height: 30px;
      }
    }
  }
`;