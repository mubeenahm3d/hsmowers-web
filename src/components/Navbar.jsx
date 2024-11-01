import React, { useState } from "react";
import logo from "../assets/MowerLogo.png";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaStar } from "react-icons/fa"; // Importing the star icon for premium users
import BackdropWrapper from "./modals/BackdropWrapper";
import ContactForm from "./modals/ContactForm";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { auth } from "../authentication/firebase";
import { useSelector } from "react-redux"; // Importing useSelector to fetch subscription status
import CloseIcon from "@mui/icons-material/Close";
import Info from "./modals/Info";
import { useParams } from "react-router";

export default function Navbar() {
  const [contactBackdrop, setContactBackdrop] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor (avatar dropdown)
  const navigate = useNavigate();
  
  const { username } = useParams();

  const backdropHandler = () => {
    setContactBackdrop((current) => !current);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false); // Close drawer on navigation
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigate("/login"); // Navigate to login page after sign out
    });
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor element for the dropdown menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the dropdown menu
  };

  // Fetch subscription details from state (assuming it’s stored in Redux)
  const subscription = useSelector((state) => state.user.subscription); // Adjust the state path as necessary
  const isPremiumUser = subscription?.status === "active"; // Check if user is a premium subscriber

  return (
    <StyledNavbar>
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
      <div className="logo" onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" />
        <h2>HighSchoolMowers</h2>
      </div>
      <div className="nav-items">
        <div className="item">
          <Link to="/">Home</Link>
        </div>
        <div className="item">
          <Link to="/about">About</Link>
        </div>

        <div className="item">
          <Link to="/upgrade">Pricing</Link>
        </div>
        {/* <div className="item">
          <Link to="/profile-page">User Profile</Link>
        </div> */}
        {/* <div onClick={backdropHandler} className="item">
          <h5>Contact Us</h5>
        </div> */}
        {/* Avatar or Login button for larger screens */}
        {auth.currentUser ? (
          <div className="avatar-section" onClick={handleAvatarClick}>
            <Avatar
              alt={auth.currentUser.email?.toUpperCase()}
              src="/broken-image.jpg"
              sx={{
                cursor: "pointer",
                width: 50,
                height: 50,
                marginRight: 1,
                background: "var(--secondary-color)",
              }}
            />
          </div>
        ) : (
          <div className="login-section">
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>

      {/* Hamburger icon */}
      <div className="nav-icon" onClick={toggleDrawer(true)}>
        <GiHamburgerMenu size={30} color="var(--text-light-color)" />
      </div>

      {/* Drawer for mobile view */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "280px", // Set your desired width here
          },
        }}
      >
        <DrawerHeader>
          <div className="drawer-logo" onClick={toggleDrawer(false)}>
            <CloseIcon htmlColor="white" fontSize="large" />
          </div>
        </DrawerHeader>
        <Divider />

        <List>
          {auth.currentUser ? (
            <>
              {/* Avatar and email inside the Drawer for logged-in users */}
              <Link to={`/profile-page/${username}`}>
                <Avatar
                  alt={auth.currentUser.email}
                  src="/broken-image.jpg"
                  sx={{ marginRight: "5px" }}
                />
                {/* <ListItemText primary={auth.currentUser.email} /> */}
              </Link>

              {/* {isPremiumUser && (
                <ListItem sx={{ background: "var(--secondary-color)" }}>
                  <FaStar
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: "10px",
                      color: "gold",
                    }}
                  />
                  <h5 style={{ color: "white" }}>Premium User</h5>
                  <button onClick={() => navigate("/subscription-detail")}>
                    Details
                  </button>
                </ListItem>
              )} */}
              <Divider />
              <ListItem button onClick={() => handleNavigation("/")}>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button onClick={() => handleNavigation("/about")}>
                <ListItemText primary="About" />
              </ListItem>
              <ListItem button onClick={() => handleNavigation("/upgrade")}>
                <ListItemText primary="Pricing" />
              </ListItem>
              {/* <ListItem button onClick={backdropHandler}>
                <ListItemText primary="Contact Us" />
              </ListItem> */}
              <Divider />
              {/* Sign out option at the bottom */}
              {/* <ListItem button onClick={handleSignOut}>
                <ListItemText primary="Log Out" />
              </ListItem> */}
            </>
          ) : (
            <>
              {/* Login link for non-logged-in users */}
              <ListItem button onClick={() => handleNavigation("/login")}>
                <ListItemText primary="Login" />
              </ListItem>
              <Divider />
              <ListItem button onClick={() => handleNavigation("/")}>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button onClick={() => handleNavigation("/about")}>
                <ListItemText primary="About" />
              </ListItem>

              <ListItem button onClick={() => handleNavigation("/upgrade")}>
                <ListItemText primary="Pricing" />
              </ListItem>
              {/* <ListItem
                button
                onClick={() => handleNavigation("/profile-page")}
              >
                <ListItemText primary="User Profile" />
              </ListItem> */}
              {/* <ListItem button onClick={backdropHandler}>
                <ListItemText primary="Contact Us" />
              </ListItem> */}
            </>
          )}
        </List>
      </Drawer>

      {/* Menu for Avatar click */}
      
    </StyledNavbar>
  );
}

const StyledNavbar = styled.section`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5%;
  box-shadow: 0px 0px 4px 2px var(--shadow-light);
  width: 100%;
  padding: 0 5%;

  .logo {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 200px;
    cursor: pointer;

    h2 {
      color: var(--text-light-color);
      font-weight: 700;
    }

    img {
      max-width: 60px;
      margin-right: 6px;
      height: auto;
    }
  }

  .nav-icon {
    display: block; // Show hamburger icon by default (for smaller screens)
    cursor: pointer;
  }

  .nav-items {
    display: none; // Hide navigation items by default for smaller screens
    align-items: center;
    justify-content: center;
    gap: 5%;
    white-space: nowrap;

    .item {
      cursor: pointer;
      a,
      h5 {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--text-light-color);

        &:hover {
          color: var(--primary-color);
        }
      }
    }
  }

  .avatar-section {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .login-section {
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--text-light-color);

      &:hover {
        color: var(--primary-color);
      }
    }
  }

  @media (min-width: 769px) {
    .nav-icon {
      display: none; // Hide hamburger icon on larger screens
    }

    .nav-items {
      display: flex; // Show navigation items on larger screens
    }
  }

  @media (max-width: 400px) {
    .logo {
      h2 {
        font-size: var(--m-heading);
        font-weight: 600;
      }
    }
  }
`;

// Styled component for the Drawer Header
const DrawerHeader = styled.div`
  display: flex;
  height: 10vh;
  align-items: center;
  justify-content: end;
  padding: 16px; // Padding for header
  background-color: var(--primary-color); // Match primary color
`;