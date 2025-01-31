import React from "react";
import styled from "styled-components";
import logo from "../../assets/MowerLogo.png";

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
          <p>info@highschoolmowers.com</p>
          <p>2464 Royal Ln. Mesa, New Jersey 45463</p>
        </div>
        <div className="footer-section">
          <a href="#">Home</a>
          <a href="#">Find Mowers</a>
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
        </div>
        <div className="footer-section">
          <a href="#">Pricing</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
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
      <div className="footer-bottom">
        <p>©2025 HighSchoolMowers All Rights are reserved</p>
        <div className="social-icons">
          <span>👍</span>
          <span>📸</span>
          <span>✖️</span>
        </div>
      </div>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  text-align: left;
  width: var(--section-width);
  margin: 40px auto 10px auto;

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
    margin: 10px 0;
    font-size: var(--s-heading);
    font-weight: 400;
    &:hover {
      color: var(--primary-color);
    }
  }

  .newsletter {
    min-width: 200px;
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
    border-radius: 50%;
    width: 30px;
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
