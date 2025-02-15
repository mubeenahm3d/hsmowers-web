import React from "react";
import styled from "styled-components";
import about1 from "../assets/about/about1.jpg";
import about2Img from "../assets/about/about2.jpg";
import about3Img from "../assets/about/about3.jpg";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import LoadingButton from "../components/LoadingButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { LocationCityOutlined } from "@mui/icons-material";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { useNavigate } from "react-router";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import RoofingOutlinedIcon from "@mui/icons-material/RoofingOutlined";
import LandingMenu from "../components/LandingMenu";

export default function About() {
  const navigate = useNavigate();

  return (
    <>
      <LandingMenu/>
      <Heading title={"About Us"} />
      <AboutContainer>
        <HandbookWrapper>
          <div className="info">
            <h3>The Complete Handbook for Lawn Mowing Services</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit lorem
              sagittis, proin ut lectus sed ut. Enim egestas enim id duis.
            </p>
            <ul>
              <li>
                <CheckCircleIcon htmlColor="var(--primary-light-color)" />
                Quick Response
              </li>
              <li>
                <CheckCircleIcon htmlColor="var(--primary-light-color)" />
                Professional Cleaning Team
              </li>
              <li>
                <CheckCircleIcon htmlColor="var(--primary-light-color)" />
                Competitive Pricing
              </li>
              <li>
                <CheckCircleIcon htmlColor="var(--primary-light-color)" />
                Easily Booking
              </li>
              <li>
                <CheckCircleIcon htmlColor="var(--primary-light-color)" />
                Best Service
              </li>
            </ul>
            <LoadingButton onClick={() => navigate("/find-mowers")}>
              Book Service
            </LoadingButton>
          </div>
          <div className="image-container">
            <img src={about1} alt="" />
          </div>
        </HandbookWrapper>
        <HandbookWrapper>
          <div className="image-container image-container2">
            <div className="images">
              <img src={about2Img} alt="" />
              <img src={about3Img} alt="" className="side-img" />
            </div>
          </div>
          <div className="info info-2">
            <h3>Fast, Friendly And Satisfaction Guarantee</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit lorem
              sagittis, proin ut lectus sed ut. Enim egestas enim id duis.
            </p>
            <ul>
              <li>
                <div className="icon">
                  <LocalPoliceOutlinedIcon htmlColor="var(--text-color)" />
                </div>
                <div className="text">
                  <h5>Satisfaction Guaranteed</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </li>
              <li>
                <div className="icon">
                <DateRangeOutlinedIcon htmlColor="var(--text-color)" />
                </div>
                <div className="text">
                  <h5>Flexible Appointment</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </li>
              <li>
                <div className="icon">
                  <DescriptionOutlinedIcon htmlColor="var(--text-color)" />
                </div>
                <div className="text">
                  <h5>Free Quotation</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </li>
              <li>
                <div className="icon">
                  <RoofingOutlinedIcon htmlColor="var(--text-color)" />
                </div>
                <div className="text">
                  <h5>Quick Service</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </HandbookWrapper>
        <HowItWorks>
          <h3>How It Works?</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit lorem
            sagittis, proin ut lectus sed ut. Enim egestas enim id duis.
          </p>
          <div className="steps">
            <div className="step">
              <h4>Sign Up</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
                lorem sagittis, proin ut lectus sed ut. Enim egestas enim id
                duis.
              </p>
              <button
                onClick={() => navigate("/get-started")}
                className="navigate-icon"
              >
                <CallMadeIcon fontSize="small" htmlColor="var(--text-color)" />
              </button>
            </div>
            <div className="step">
              <h4>Create Profile</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
                lorem sagittis, proin ut lectus sed ut. Enim egestas enim id
                duis.
              </p>
              <button
                onClick={() => navigate("/get-started")}
                className="navigate-icon"
              >
                <CallMadeIcon fontSize="small" htmlColor="var(--text-color)" />
              </button>
            </div>
            <div className="step">
              <h4>Browse Nearby Service</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
                lorem sagittis, proin ut lectus sed ut. Enim egestas enim id
                duis.
              </p>
              <button
                onClick={() => navigate("/find-mowers")}
                className="navigate-icon"
              >
                <CallMadeIcon fontSize="small" htmlColor="var(--text-color)" />
              </button>
            </div>
            <div className="step">
              <h4>Book Service</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
                lorem sagittis, proin ut lectus sed ut. Enim egestas enim id
                duis.
              </p>
              <button
                onClick={() => navigate("/find-mowers")}
                className="navigate-icon"
              >
                <CallMadeIcon fontSize="small" htmlColor="var(--text-color)" />
              </button>
            </div>
          </div>
        </HowItWorks>
      </AboutContainer>

      <Footer />
    </>
  );
}

const HowItWorks = styled.div`
  h3 {
    margin-bottom: var(--heading-gap);
  }
  .steps {
    margin: var(--heading-margin) 0;
    .step {
      display: grid;
      grid-template-columns: 1fr 2fr 50px;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid var(--border-color);
      h4 {
        font-weight: bold;
      }
      .navigate-icon {
        width: 45px;
        height: 45px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: 1px solid var(--border-color);
        &:hover {
          transition: all 0.3s ease-in-out;
          background-color: var(--primary-light-color);
          svg {
            transform: scale(1.2);
          }
        }
      }
    }
  }
  @media (max-width: 768px) {
    .steps {
      .step {
        grid-template-columns: 1fr 2fr;
        p {
          grid-row: 1/3;
          grid-column: 2/3;
          padding: 14px 0;
        }
      }
    }
  }
`;

const HandbookWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin: var(--section-margin) 0 150px 0;
  .info {
    flex: 1 1 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--heading-gap);
    margin: 0 auto;
    h3 {
      max-width: 18ch;
    }
    p {
      max-width: 50ch;
    }

    ul {
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin: 12px 0;
      li {
        display: flex;
        align-items: center;
        font-weight: 600;
        color: var(--text-color);
        gap: 8px;
      }
    }
    span {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      background-color: #00c853;
      border-radius: 50%;
      margin-right: 0.5rem;
    }
  }
  .info-2 {
    flex: 1 1 45%;
    ul {
      grid-template-columns: 1fr;
      gap: 20px;
      li {
        display: flex;
        align-items: center;
        gap: 8px;

        .icon {
          background-color: var(--primary-light-color);
          width: 50px;
          height: 50px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .text {
          p {
            margin-top: 6px;
            font-weight: 400;
          }
        }
      }
    }
  }
  .image-container {
    flex: 1 1 45%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 350px;
      border-radius: var(--m-radius);
    }
  }
  .image-container2 {
    flex: 1 1 50%;
    /* justify-content: flex-start; */
    margin-bottom: 60px;
    .images {
      position: relative;
      img {
        max-width: 400px;
      }
      .side-img {
        position: absolute;
        right: -10%;
        bottom: -5%;
        width: 200px;
      }
    }
  }
  @media (max-width: 576px) {
    .info {
      align-items: center;
      text-align: center;
      ul {
        align-self: start;
        grid-template-columns: 1fr;
      }
    }
    .info-2 {
      ul {
        text-align: start;
      }
    }
    .image-container {
      img {
        max-width: 320px !important;
      }
    }
    .image-container2 .images {
      .side-img {
        width: 120px;
        bottom: -5%;
        right: -2%;
      }
    }
  }
  @media (min-width: 900px) {
    .image-container2 {
      justify-content: flex-start;
    }
  }
`;

const AboutContainer = styled.div`
  min-height: var(--section-height);
  width: var(--section-width);
  margin: var(--section-margin) auto;
  h2 {
    text-align: center;
    margin-bottom: var(--heading-margin);
  }

  .info-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: var(--section-margin);

    .content-container {
      h3 {
        text-align: center;
        font-weight: 600;
        span {
          color: var(--primary-color);
          font-size: var(--m-heading);
        }
      }
      p {
        text-align: center;
        /* max-width: 47ch; */
      }
    }

    .image-container {
      img {
        width: 100%;
        height: auto;
        max-width: 500px;
        border-radius: var(--l-radius);
      }
    }
  }

  //For Tablet

  @media (min-width: 600px) {
    .info-container {
      flex-wrap: nowrap;
      &:nth-child(odd) {
        flex-direction: row-reverse;
      }
      .content-container {
        h3 {
          text-align: start;
        }
        p {
          text-align: start;
          max-width: 50ch;
        }
      }
    }
  }

  //For Laptop

  @media (min-width: 1024px) {
    .info-container {
      flex-wrap: nowrap;
      &:nth-child(odd) {
        flex-direction: row-reverse;
      }
      .content-container {
        h3 {
          text-align: start;
        }
        p {
          text-align: start;
          max-width: 50ch;
        }
      }
    }
  }
`;
