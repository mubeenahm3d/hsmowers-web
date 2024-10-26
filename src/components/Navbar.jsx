import React, { useState } from "react";
import logo from "../assets/MowerLogo.jpeg";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaStar } from "react-icons/fa"; 
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

export default function Navbar() {
  const [contactBackdrop, setContactBackdrop] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor (avatar dropdown)
  const navigate = useNavigate();

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
        element={<Info heading={"Contact Us"} msg="For all inquires please contact: info@decanlys.com" backdropHandler={backdropHandler} />}
      />
      <div className="logo" onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" />
        <h4>HighSchoolShovelers.com</h4>
      </div>
      <div className="nav-items">
        <div className="item">
          <Link to="/blog">Home</Link>
        </div>
        <div className="item">
          <Link to="/upgrade">About</Link>
        </div>
        <div onClick={backdropHandler} className="item">
          <h5>Pricing</h5>
        </div>
        {/* Avatar or Login button for larger screens */}
        {auth.currentUser ? (
          <div className="avatar-section" onClick={handleAvatarClick}>
            <Avatar
              alt={auth.currentUser.email?.toUpperCase()}
              src="/broken-image.jpg"
              sx={{ cursor: "pointer", width: 50, height: 50, marginRight: 1, background: "var(--secondary-color)"}}
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
        <GiHamburgerMenu size={30} color="white" />
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
              <ListItem>
                {/* <Avatar
                  alt={auth.currentUser.email}
                  src="/broken-image.jpg"
                  sx={{ marginRight: "5px" }}
                /> */}
                <ListItemText primary={auth.currentUser.email} />
              </ListItem>
              {isPremiumUser && (
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
              )}
              <Divider />
              <ListItem button onClick={() => handleNavigation("/blog")}>
                <ListItemText primary="Blog" />
              </ListItem>
              <ListItem button onClick={() => handleNavigation("/upgrade")}>
                <ListItemText primary="Upgrade" />
              </ListItem>
              <ListItem button onClick={backdropHandler}>
                <ListItemText primary="Contact Us" />
              </ListItem>
              <Divider />
              {/* Sign out option at the bottom */}
              <ListItem button onClick={handleSignOut}>
                <ListItemText primary="Log Out" />
              </ListItem>
            </>
          ) : (
            <>
              {/* Login link for non-logged-in users */}
              <ListItem button onClick={() => handleNavigation("/login")}>
                <ListItemText primary="Login" />
              </ListItem>
              <Divider />
              <ListItem button onClick={() => handleNavigation("/blog")}>
                <ListItemText primary="Blog" />
              </ListItem>
              <ListItem button onClick={() => handleNavigation("/upgrade")}>
                <ListItemText primary="Upgrade" />
              </ListItem>
              <ListItem button onClick={backdropHandler}>
                <ListItemText primary="Contact Us" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>

      {/* Menu for Avatar click */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        disableScrollLock={true}
      >
        {isPremiumUser && (
          <MenuItem >
            <FaStar
              style={{
                width: 25,
                height: 25,
                marginRight: "10px",
                color: "gold",
              }}
            />
            <h5 style={{  marginRight: 10 }}>Premium User</h5>
            <button onClick={() => navigate("/subscription-detail")}>
              Details
            </button>
          </MenuItem>
        )}

        <MenuItem onClick={handleMenuClose}>
          <ListItemText primary={auth.currentUser?.email || "User"} />
        </MenuItem>

        <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
      </Menu>
    </StyledNavbar>
  );
}

const StyledNavbar = styled.section`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  background-color: var(--primary-color);
  width: 100%;
  padding: 0 2%;

  .logo {
    display: flex; 
    align-items: center; 
    gap: 1rem;
    cursor: pointer;

    img {
      width: 60px; 
      height: 60px; 
      border-radius: 10px;
    }

    h4 {
      font-size: 1rem; 
      color: white; 
      margin: 0;
    }
  }

  .nav-icon {
    display: block;
    cursor: pointer;
  }

  .nav-items {
    display: none;
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
        color: white;

        &:hover {
          color: var(--text-hover-color);
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
      color: white;

      &:hover {
        color: var(--text-hover-color);
      }
    }
  }

  @media (min-width: 640px) and (max-width: 1024px) {
    gap: 10rem;
    .nav-items {
      display: flex;
    }

    .nav-icon {
      display: none;
    }

    .logo {
      width: auto;
      img {
        width: 70px;
        height: 70px; 
      }
    }
  }

  @media (min-width: 1024px) and (max-width: 1650px) {
    gap: 30rem;
    .logo {
      width: auto;
    }
    .nav-icon {
      display: none;
    }

    .nav-items {
      display: flex;
      gap: 7%;
    }

    .nav-items .item {
      font-size: 1.5rem;
    }
  }
`;



// Styled component for the Drawer Header
const DrawerHeader = styled.div`
  display: flex;
  height: 10vh;
  align-items: center;
  justify-content: end;
  padding: 16px;
  background-color: var(--primary-color); 
`;
