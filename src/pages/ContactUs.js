import React from "react";
import Heading from "../components/Heading";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { LocationCityOutlined } from "@mui/icons-material";
import ContactForm from "../components/modals/ContactForm";
import Footer from "../components/Footer";

export default function ContactUs() {
  return (
    <>
      <Navbar />
      <Heading title={"Contact Us"} />
      <StyledContactUs>
        <div className="main-container">
          <div className="info info-2">
            <h3>Have Questions? Get in Touch!</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit lorem
              sagittis, proin ut lectus sed ut. Enim egestas enim id duis.
            </p>
            <ul>
              <li>
                <div className="icon">
                  <LocationCityOutlined htmlColor="white" />
                </div>
                <div className="text">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <h5>Satisfaction Guaranteed</h5>
                </div>
              </li>
              <li>
                <div className="icon">
                  <LocationCityOutlined htmlColor="white" />
                </div>
                <div className="text">
                  <p>
                    Lorem ipsum
                  </p>
                  <h5>Satisfaction Guaranteed</h5>
                </div>
              </li>
              <li>
                <div className="icon">
                  <LocationCityOutlined htmlColor="white" />
                </div>
                <div className="text">
                  <p>
                    Lorem ipsum
                  </p>
                  <h5>Satisfaction Guaranteed</h5>
                </div>
              </li>
            </ul>
          </div>
          <div className="image-container image-container2">
            <ContactForm />
          </div>
        </div>
      </StyledContactUs>
      <Footer />
    </>
  );
}

const StyledContactUs = styled.div`
  width: var(--section-width);
  margin: auto;
  .main-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    margin: 80px 0;
    .info {
      flex: 1 1 50%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--heading-gap);
      margin: 0 auto;
      h3 {
        max-width: 14ch;
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
            background-color: var(--primary-color);
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
      justify-content: flex-start;
      .images {
        position: relative;
        img {
          max-width: 400px;
        }
        .side-img {
          position: absolute;
          right: -10%;
          bottom: -10%;
          width: 200px;
        }
      }
    }
  }
`;
