import React from "react";
import styled from "styled-components";
import logo from "../../assets/MowerLogo.png";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Link, NavLink } from "react-router-dom";
import Footer from "../Footer";

const LandingFooter = () => {
  return (
    <StyledFooter>
      <div className="footer-content">
        <div className="footer-section">
          <div className="logo">
            <img src={logo} alt="HighSchoolMowers Logo" />
            <h4>
              HighSchool<span>Mowers</span>
            </h4>
          </div>
          <div className="email">
            <EmailOutlinedIcon /> <p>info@highschoolmowers.com</p>
          </div>
          <div className="address">
            <LocationOnOutlinedIcon />
            <p>11650 Olio Rd, STE 1000-103 Fishers, IN 46037</p>
          </div>
        </div>
        <div className="footer-section">
          <NavLink
            to="/"
            style={({ isActive }) => {
              return isActive ? { color: "var(--primary-color)" } : {};
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="/find-mowers"
            style={({ isActive }) => {
              return isActive ? { color: "var(--primary-color)" } : {};
            }}
          >
            Find Mowers
          </NavLink>
          <NavLink
            to="/about"
            style={({ isActive }) => {
              return isActive ? { color: "var(--primary-color)" } : {};
            }}
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact-us"
            style={({ isActive }) => {
              return isActive ? { color: "var(--primary-color)" } : {};
            }}
          >
            Contact Us
          </NavLink>
        </div>
        <div className="footer-section newsletter">
          <h4>Subscribe to Our Newsletter</h4>
          <p>
            Enter your email below to be the first to know about new
            collections.
          </p>
          <div className="subscribe">
            <input type="email" placeholder="Email Address" />
            <button>➔</button>
          </div>
        </div>
      </div>
      <Footer />
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  text-align: left;
  width: var(--section-width);
  margin: 40px auto 10px auto;
  .email,
  .address {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 8px 0;
    svg {
      color: var(--text-light-color);
    }
  }
  .footer-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1.4rem;
    margin-bottom: 24px;
  }

  .logo {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    span {
      font-size: inherit;
      font-weight: inherit;
      color: var(--primary-color);
    }
    img {
      width: 50px;
    }
  }

  .footer-section {
    flex: 1;
    margin: 10px;
  }

  .footer-section a {
    display: block;
    color: inherit;
    text-decoration: none;
    margin: 16px 0;
    font-size: var(--s-heading);
    font-weight: 400;
    
  }

  .newsletter {
    flex: 1;
    margin-top: 20px;
    p {
      margin: var(--heading-gap) 0;
    }
    .subscribe {
      display: flex;
      align-items: center;
    }
  }

  .subscribe input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 20px;
    margin-right: 10px;
    width: 70%;
  }

  .subscribe button {
    background-color: #333;
    color: white;
    border: none;
    border-radius: 50px;
    min-width: 30px;
    height: 30px;
    cursor: pointer;
  }

  .footer-bottom {
    border-top: 2px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    font-size: 0.875rem;
  }

  .social-icons span {
    margin-right: 10px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      align-items: flex-start;
    }

    .footer-bottom {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export default LandingFooter;
