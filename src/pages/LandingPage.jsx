import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LandingMenu from "../components/LandingMenu";
import BG from "../assets/bg4.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

export default function LandingPage() {
   const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleFindMower = async (e) => {
    e.preventDefault();
    if (!location) return; 
    localStorage.setItem("location", location);
    if (/^\d{5}$/.test(location)) {
      navigate(`/find-mowers?zip=${location}`);
    } else {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            location
          )}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        );
        console.log("Geocoding Response:", response.data);

        if (response.data.status === "OK") {
          const addressComponents = response.data.results[0].address_components;
          const zipCode = addressComponents.find((component) =>
            component.types.includes("postal_code")
          );

          if (zipCode) {
            console.log("ZIP Code:", zipCode.long_name);
            navigate(`/find-mowers?zip=${zipCode.long_name}`); 
          } else {
            console.log("No ZIP Code found for this address.");
          }
        } else {
          console.log("Error fetching data:", response.data.status);
        }
      } catch (error) {
        console.error("Error fetching geocoding data:", error);
      }
    }
  };


  return (
    <>
      <LandingMenu />

      <HeroSection>
        <div className="hero-container">
          {" "}
          <div className="image-container">
            <img src={BG} alt="" />
          </div>
          <div className="card-container">
            <Card
              sx={{
                backgroundColor: "var(--background-color)",
                borderRadius: "var(--l-radius)",
              }}
            >
              <CardInfo>
                <h3>
                  Find your next <span>Mower</span>
                </h3>
                <p>
                  No Ads. No SignUp. Support local students & get a gear looking
                  lawn
                </p>

                <form action="" onSubmit={handleFindMower}>
                  <input
                    type="text"
                    placeholder="Enter Zip Code or Address"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <button type="submit">Find a Mower</button>
                </form>
              </CardInfo>
            </Card>
          </div>
        </div>

        <About>
          <p>
            Local Students everywhere are looking for summer jobs. Help them
            achieve their dreams.
            <br />
            <br />
            HighSchoolMowers.com curates top student mowers, with no cost to you
            at all. No Signup needed, so you will never be contacted by random
            vendors. Students pay a small fee to have their own business
            promoted on the website, making it extremely easy to find the help
            you need.
          </p>
        </About>
      </HeroSection>

      <Footer />
    </>
  );
}

const HeroSection = styled.div`
  min-height: var(--section-height);
  margin-bottom: var(--section-margin);

  .hero-container {
    position: relative;

    .image-container {
      img {
        width: 100%;
        height: 320px;
        object-fit: cover;
      }
    }

    .card-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 95%;
      min-width: 320px;
      z-index: 10;
    }

    @media (min-width: 600px) {
      .card-container {
        left: 32%;
        max-width: 400px;
      }
    }

    @media (min-width: 1024px) {
      .card-container {
        left: 22%;
        max-width: 400px;
      }
      .image-container {
        img {
          width: 100%;
          height: 400px;
          object-fit: cover;
        }
      }
    }
  }
`;

const CardInfo = styled(CardContent)`
  h3 {
    span {
      color: var(--primary-color);
      font-size: inherit;
      font-weight: inherit;
    }
  }

  form {
    margin-top: 1rem;
    input {
      width: 200px;
      border-top-right-radius: 0rem;
      border-bottom-right-radius: 0rem;
    }
    button {
      border-top-left-radius: 0rem;
      border-bottom-left-radius: 0rem;
    }

    @media (min-width: 640px) {
      input {
        width: 220px;
      }
    }
  }
`;

const About = styled.div`
  width: var(--section-width);
  margin: var(--section-margin) auto;
  p {
    text-align: center;
    max-width: 50ch;
  }

  @media (min-width: 600px) {
    p {
      text-align: start;
      max-width: 70ch;
    }
  }

  @media (min-width: 1024px) {
    p {
      text-align: start;
      max-width: 120ch;
    }
  }

  @media (min-width: 1650px) {
    p {
      text-align: start;
      max-width: 140ch;
    }
  }
`;
