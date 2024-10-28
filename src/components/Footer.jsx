import React, { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { useState } from "react";
import BackdropWrapper from "./modals/BackdropWrapper";
import Info from "./modals/Info";

export default function Footer() {
  const year = new Date().getFullYear();
  const [contactBackdrop, setContactBackdrop] = useState(false);

  const backdropHandler = () => {
    setContactBackdrop((current) => !current);
  };

  return (
    <StyledFooter>
      <BackdropWrapper
        open={contactBackdrop}
        smallSize={true}
        backdropHandler={backdropHandler}
        element={
          <Info
            heading={"Contact Us"}
            msg="For all inquires please contact: info@decanlys.com"
            backdropHandler={backdropHandler}
          />
        }
      />
      <div className="content">
        <div className="socials">
          {/* <h2>HighSchoolMowers</h2> */}
          <p>
            Students pay a small fee to have their own business promoted on the
            website, making it extremely easy to find the help you need.
          </p>
        </div>
      </div>
      <div className="copyright">
        <p> HighSchoolMowers, Copyright © {year}</p>
        <div className="tabs">
          <div className="nav-tabs">
            <FaXTwitter className="icon-img" />
            <FaInstagram className="icon-img" />
            <FaFacebookF className="icon-img" />
          </div>
        </div>
      </div>
    </StyledFooter>
  );
}

const StyledFooter = styled.section`
  background-color: var(--background-color);
  box-shadow: 0px 0px 4px 2px var(--shadow-light);
  padding: 40px 8%;
  h5,
  li,
  p,
  a {
    color: var(--text-white-color);
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid green;
    padding-bottom: 10px;
    flex-wrap: wrap;
    gap: 1.2rem;
    .socials {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      gap: 20px;

      p {
        color: var(--text-color);
      }
      .logo {
        width: 100px;
        height: 100px;
        border-radius: 60px;
      }
      form {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        input {
          border-radius: 50px;
        }
        button {
          background-color: var(--secondary-color);
          &:hover {
            background-color: var(--secondary-dark-color);
          }
        }
      }
      .connect {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
        a {
          margin-right: 10px;
        }
        svg {
          width: 20px;
          height: 20px;
          color: white;
        }
      }
    }
    .tabs,
    .recipes {
      h5 {
        margin-bottom: 8px;
        a,
        span {
          cursor: pointer;
          color: white;
          font-size: inherit;
          text-decoration: underline;
        }
      }
      /* .nav-tabs {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        a {
          color: white;
        }
        .icon-img {
          width: 30px;
          height: 30px;
          color: var(--primary-color);
        }
      } */
    }
  }
  .copyright {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    p {
      color: var(--text-color);
      font-size: var(--text);
    }
    a {
      text-decoration: underline;
    }

    .nav-tabs {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
      flex-shrink: 0;
      a {
        color: white;
      }
      .icon-img {
        min-width: 20px;
        min-height: 20px;
        max-width: 30px;
        max-height: 30px;
        color: var(--primary-color);
      }
    }
  }
`;
