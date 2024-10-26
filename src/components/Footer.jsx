import React, { useRef } from "react";
import styled from "styled-components";
import logo from "../assets/logo-white.png";
// import LoadingButton from "../components/LoadingButton";
// import { FaFacebook, FaYoutube, FaLinkedin, FaTiktok } from "react-icons/fa";
// import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";
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
        element={<Info heading={"Contact Us"} msg="For all inquires please contact: info@decanlys.com" backdropHandler={backdropHandler} />}
      />
      <div className="content">
        <div className="socials">
          <img src={logo} alt="" className="logo" />
        </div>
        <div className="tabs">
          <div className="nav-tabs">
            <h5>
              Want to check more?{"  "}
              <Link to="/upgrade">Upgrade Now</Link>
            </h5>
            {/* <h5>
              Want to check live?{"  "}
              <Link
                className="landing-meal-planning-gtag"
                to="/dashboard/meal-planning"
              >
                Use our API
              </Link>
            </h5> */}
            <h5>
              Custom solution for your business?{"  "}
              <span onClick={backdropHandler}>Contact Us</span>
            </h5>
          </div>
        </div>
        {/* <div className="recipes">
          <h5>Recipes</h5>
          <div className="nav-tabs">
            <Link className="footer-recipes-gtag" to="/dashboard/explore">
              Best
            </Link>
            <Link className="footer-recipes-gtag" to="/dashboard/explore">
              Diets
            </Link>
            <Link className="footer-recipes-gtag" to="/dashboard/explore">
              Cuisines
            </Link>
            <Link className="footer-recipes-gtag" to="/dashboard/explore">
              Under 45 minutes
            </Link>
            <Link className="footer-recipes-gtag" to="/dashboard/explore">
              Under 30 minutes
            </Link>
          </div>
        </div> */}
      </div>
      <div className="copyright">
        <p>Copyright © {year}, ClearSlate</p>
        {/* <p>|</p>
        <Link to="/terms-of-service">Terms of Service</Link>
        <p>|</p>
        <Link to="/privacy-policy">Privacy Policy</Link> */}
      </div>
    </StyledFooter>
  );
}

const StyledFooter = styled.section`
  background-color: var(--primary-color);
  padding: 40px 8%;
  h5,
  li,
  p,
  a {
    color: var(--text-white-color);
  }
  .content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border-bottom: 1px solid white;
    padding-bottom: 10px;
    flex-wrap: wrap;
    gap: 1.2rem;
    .socials {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      gap: 20px;
      .logo {
        width: 200px;
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
        a,span {
          cursor: pointer;
          color: white;
          font-size: inherit;
          text-decoration: underline;
        }
      }
      .nav-tabs {
        display: flex;
        flex-direction: column;
        gap: 6px;
        a {
          color: white;
        }
      }
    }
  }
  .copyright {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    a {
      text-decoration: underline;
    }
  }
`;
