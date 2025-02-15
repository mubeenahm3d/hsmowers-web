import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import LandingMenu from "../components/LandingMenu";
import BG from "../assets/profile-banner.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import { loadGoogleMapsScript } from "../utils/googleMap";
import { initAutocomplete } from "../utils/autoComplete";
import { geocodeAddress } from "../utils/geocodeAddress";
import { alertActions } from "../store/alertSlice";
import { useDispatch } from "react-redux";
import Benefits from "../components/landing-page/Benefits";
import BookingGuide from "../components/landing-page/BookingGuide";
import Locations from "../components/landing-page/Locations";
import Faq from "../components/landing-page/Faq";
import CallToAction from "../components/landing-page/CallToAction";
import LandingFooter from "../components/landing-page/LandingFooter";
import HeroSection from "../components/landing-page/HeroSection";

export default function LandingPage() {
  const [location, setLocation] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handlePlaceChanged = () => {
      const place = inputRef.current.value;

      if (place) {
        geocodeAddress(
          place,
          (zipCode) => {
            if (zipCode) {
              console.log("zipCode", zipCode);
              setLocation(zipCode);
              localStorage.setItem("location", place);
              navigate(`/find-mowers?zip=${zipCode}`);
            } else {
              console.log("No ZIP code found.");
            }
          },
          dispatch,
          alertActions
        );
      }
    };

    const initializeGoogleMaps = () => {
      loadGoogleMapsScript(process.env.REACT_APP_GOOGLE_MAPS_API_KEY, () => {
        initAutocomplete(inputRef.current, handlePlaceChanged);
      });
    };

    initializeGoogleMaps();
  }, [navigate, dispatch, alertActions]);

  const handleFindMower = (e) => {
    e.preventDefault();

    const address = inputRef.current.value;
    if (!address) return;

    geocodeAddress(
      address,
      (zipCode) => {
        if (zipCode) {
          setLocation(zipCode);
          localStorage.setItem("location", address);
          navigate(`/find-mowers?zip=${zipCode}`);
        } else {
          console.log("No ZIP code found.");
        }
      },
      dispatch,
      alertActions
    );
  };

  return (
    <>
      <LandingMenu />
      {/* <HeroSection>
        <div className="hero-container">
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
                  No Ads. No SignUp. Support local students & get a great
                  looking lawn
                </p>

                <form onSubmit={handleFindMower}>
                  <input
                    type="text"
                    ref={inputRef}
                    placeholder="Enter Zip Code or Address"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <button type="submit">Find a Mower</button>
                </form>
              </CardInfo>
            </Card>
          </div>
          <div className="image-container">
            <img src={BG} alt="" />
          </div>
        </div>
      </HeroSection> */}
      <HeroSection />
      <Benefits />
      <BookingGuide />
      {/* <Locations /> */}
      <Faq />
      <CallToAction />
      <LandingFooter />
    </>
  );
}

// const HeroSection = styled.div`
//   min-height: var(--section-height);
//   margin-bottom: var(--section-margin);
//   .hero-container {
//     position: relative;

//     .image-container {
//       margin-top: 2rem;
//       img {
//         width: 100%;
//         height: 320px;
//         object-fit: cover;
//       }
//     }

//     .card-container {
//       position: static;
//       /* top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%); */
//       width: 95%;
//       margin: auto;
//       min-width: 320px;
//       z-index: 10;
//     }

//     @media (min-width: 600px) {
//       .card-container {
//         position: absolute;
//         top: 50%;
//         /* left: 50%; */
//         transform: translate(-50%, -50%);
//         left: 32%;
//         max-width: 400px;
//       }
//     }

//     @media (min-width: 1024px) {
//       .card-container {
//         position: absolute;
//         top: 50%;
//         /* left: 50%; */
//         transform: translate(-50%, -50%);
//         left: 22%;
//         max-width: 400px;
//       }
//       .image-container {
//         img {
//           width: 100%;
//           height: 400px;
//           object-fit: cover;
//         }
//       }
//     }
//   }
// `;

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
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    gap: 1rem;
    input {
      width: 300px;
      height: 38px;
    }

    @media (min-width: 640px) {
      display: block;
      input {
        width: 220px;
        border-top-right-radius: 0rem;
        border-bottom-right-radius: 0rem;
        border-right: none;
      }
      button {
        border-top-left-radius: 0rem;
        border-bottom-left-radius: 0rem;
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
