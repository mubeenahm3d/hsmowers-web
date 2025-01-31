// import { useNavigate } from "react-router-dom";
// import { loadGoogleMapsScript } from "../utils/googleMap";
// import { initAutocomplete } from "../utils/autoComplete";
// import { geocodeAddress } from "../utils/geocodeAddress";
// import { alertActions } from "../store/alertSlice";
// import { useDispatch } from "react-redux";
// import React, { useState, useEffect, useRef } from "react";
import LoadingButton from "../LoadingButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styled from "styled-components";
import heroImg from "../../assets/landing-page/hero-img.webp";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";

export default function HeroSection() {
  //   const [location, setLocation] = useState("");
  //   const inputRef = useRef(null);
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     const handlePlaceChanged = () => {
  //       const place = inputRef.current.value;

  //       if (place) {
  //         geocodeAddress(
  //           place,
  //           (zipCode) => {
  //             if (zipCode) {
  //               console.log("zipCode", zipCode);
  //               setLocation(zipCode);
  //               localStorage.setItem("location", place);
  //               navigate(`/find-mowers?zip=${zipCode}`);
  //             } else {
  //               console.log("No ZIP code found.");
  //             }
  //           },
  //           dispatch,
  //           alertActions
  //         );
  //       }
  //     };

  //     const initializeGoogleMaps = () => {
  //       loadGoogleMapsScript(process.env.REACT_APP_GOOGLE_MAPS_API_KEY, () => {
  //         initAutocomplete(inputRef.current, handlePlaceChanged);
  //       });
  //     };

  //     initializeGoogleMaps();
  //   }, [navigate, dispatch, alertActions]);

  //   const handleFindMower = (e) => {
  //     e.preventDefault();

  //     const address = inputRef.current.value;
  //     if (!address) return;

  //     geocodeAddress(
  //       address,
  //       (zipCode) => {
  //         if (zipCode) {
  //           setLocation(zipCode);
  //           localStorage.setItem("location", address);
  //           navigate(`/find-mowers?zip=${zipCode}`);
  //         } else {
  //           console.log("No ZIP code found.");
  //         }
  //       },
  //       dispatch,
  //       alertActions
  //     );
  //   };
  return (
    <StyledHeroSection hero_img={heroImg}>
      <div className="container">
        <h1>
          Find your next Powerful <span>Mower!</span>
        </h1>
        <p>
          No Ads. No SignUp. Support local students & get a great looking lawn
        </p>
        <form>
          <div className="input-div">
            <input placeholder="Enter your zip code or address" />
            <button>
              <MyLocationOutlinedIcon /> Locate Me
            </button>
          </div>
          <LoadingButton>
            Find Mowers <ArrowForwardIcon />
          </LoadingButton>
        </form>
      </div>
    </StyledHeroSection>
  );
}

const StyledHeroSection = styled.div`
  height: 90vh;
  background: url(${({ hero_img }) => hero_img});
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  .container {
    width: 60%;
    height: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 8%;
    gap: 1.2rem;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.9) 10%,
      rgba(0, 0, 0, 0.8) 50%,
      rgba(0, 0, 0, 0.6) 80%,
      rgba(0, 0, 0, 0) 100%
    );
    h1 {
      color: white;
      max-width: 15ch;
      span {
        font-weight: inherit;
        font-size: inherit;
        color: var(--primary-color);
      }
    }
    p {
      max-width: 37ch;
    }
    form {
      .input-div,
      button {
        width: min(360px, 95%);
      }

      .input-div {
        height: 45px;
        margin-bottom: 1.2rem;
        border: 2px solid white;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 0 10px;
        input {
          border: none;
          height: 100%;
          background-color: transparent;
          color: white;
          flex-grow: 1;
          padding: 0;
          &::placeholder {
            color: white;
          }
          &:focus {
            border: none;
          }
        }
        button {
          color: white;
          white-space: nowrap;
          outline: none;
          border: none;
          width: min-content;
          background-color: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
      }
    }
  }
`;
