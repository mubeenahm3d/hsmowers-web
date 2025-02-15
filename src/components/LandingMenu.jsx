import React from "react";
import styled from "styled-components";
import logo from "../assets/MowerLogo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LoadingButton from "./LoadingButton";
import { useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

export default function LandingMenu() {
  const navigate = useNavigate();
  const mediaQueryMobile = useMediaQuery("(max-width: 900px)");
  const mediaQueryLg = useMediaQuery("(min-width: 900px)");

  return (
    <>
      {mediaQueryMobile && (
        <BottomMobileNav>
          <div className="nav-tabs">
            <NavLink
              style={({ isActive }) => {
                return isActive ? { color: "var(--primary-color)" } : {};
              }}
              to="/"
            >
              <HomeOutlinedIcon />
              <span>Home</span>
            </NavLink>
            <NavLink
              style={({ isActive }) => {
                return isActive ? { color: "var(--primary-color)" } : {};
              }}
              to="/find-mowers"
            >
              <SearchIcon />
              <span>Mowers</span>
            </NavLink>
            <NavLink
              style={({ isActive }) => {
                return isActive ? { color: "var(--primary-color)" } : {};
              }}
              to="/about"
            >
              <LightbulbOutlinedIcon />
              <span>About Us</span>
            </NavLink>
            <NavLink
              style={({ isActive }) => {
                return isActive ? { color: "var(--primary-color)" } : {};
              }}
              to="/contact-us"
            >
              <PhoneOutlinedIcon />
              <span>Contact Us</span>
            </NavLink>
          </div>
        </BottomMobileNav>
      )}
      <StyledNavbar>
        <div className="navbar-container">
          <div onClick={() => navigate("/")} className="image-container">
            <img src={logo} alt="" />
            <h3>
              HighSchool<span>Mowers</span>
            </h3>
          </div>
          {mediaQueryLg && (
            <div className="links">
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
          )}
          <div className="btns">
            {mediaQueryLg ? <p>Are you a Student?</p> : <p></p>}
            <LoadingButton onClick={() => navigate("/get-started")}>
              Signup
            </LoadingButton>
          </div>
        </div>
      </StyledNavbar>
    </>
  );
}

const BottomMobileNav = styled.div`
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  height: 56px;
  display: flex;
  justify-content: center;
  box-shadow: 0 -1px 8px 0px var(--shadow);
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  z-index: 10;
  .nav-tabs {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto 5%;
    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--text-light-color);
      span {
        color: inherit;
        font-size: 0.8rem;
        margin-top: 4px;
      }
    }
  }
`;

const StyledNavbar = styled.div`
  background-color: var(--background-color);
  width: var(--section-width);
  margin: 1rem auto;

  h3 span {
    font-weight: inherit;
    font-size: inherit;
    color: var(--primary-color);
  }

  .navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;

    .links,
    .btns {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .links {
      gap: 2rem;
      a {
        font-size: 1.1rem;
        color: var(--text-light-color);
      }
    }
    .image-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;

      img {
        max-width: 60px;
        margin-right: 6px;
        height: auto;
      }
    }
  }

  @media (max-width: 520px) {
    h3{
      display: none;
    }
  }
  @media (max-width: 900px) {
    h3{
      font-size: 1.8rem;
    }
    .navbar-container {
      justify-content: space-between;
    }
  }
  @media (max-width: 1272px) {
    .navbar-container {
      .links{
        display: none;
      }
    }
  }

`;
