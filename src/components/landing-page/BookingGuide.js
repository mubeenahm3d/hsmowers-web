import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import MessageIcon from "@mui/icons-material/Message";
import img from "../../assets/landing-page/booking-guide.png";
import NoEncryptionGmailerrorredOutlinedIcon from "@mui/icons-material/NoEncryptionGmailerrorredOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import { MessageOutlined } from "@mui/icons-material";

export default function BookingGuide() {
  const steps = [
    {
      icon: <SearchIcon />,
      title: "Search for Mowers Near You",
      description:
        "Enter your ZIP code or city to discover mowers available in your neighborhood.",
    },
    {
      icon: <GroupOutlinedIcon />,
      title: "Browse Available Mowers",
      description:
        "Review a list of local mowers and their contact details to find the best match.",
    },
    {
      icon: <PhoneOutlinedIcon />,
      title: "Mowers Will Contact You",
      description:
        "Choose your mower, and they will reach out to you directly to discuss your needs.",
    },
    {
      icon: <MessageOutlined />,
      title: "Deal Directly with Mowers",
      description:
        "Call or message mowers to discuss your needs. Negotiate pricing and confirm service details verbally.",
    },
  ];

  return (
    <StyledBookService>
      <div className="wrapper">
        <div className="content">
          <h3>Step By Step Guide To Book Your Service</h3>
          <p className="desc">Connecting You with Local Mowers Made Simple!</p>
          <div className="steps-list">
            {steps.map((step, index) => (
              <div className={`step step-${index}`} key={index}>
                <div className="icon">{step.icon}</div>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="image-section">
          <div className="img">
            <img src={img} alt="Lawnmower" />
            <div className="badge">
              <div className="icon">
                <NoEncryptionGmailerrorredOutlinedIcon />
              </div>
              <span>No Signup</span>
            </div>
            <div className="badge">
              <div className="icon">
                <EmojiEventsOutlinedIcon />
              </div>
              <span>Award Winning</span>
            </div>
          </div>
        </div>
      </div>
    </StyledBookService>
  );
}
const StyledBookService = styled.section`
  background-color: var(--section-bg-color);
  padding: 100px 0;
  .wrapper {
    background-color: #e6f7f2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    text-align: left;
    width: var(--section-width);
    margin: auto;
    gap: 2rem;
    .content {
      flex: 1 1 50%;
      h3{
        max-width: 17ch;
      }
      .desc {
        margin: var(--heading-gap) 0 40px 0;
      }
    }

    .steps-list {
      margin-top: 20px;
    }

    .step {
      display: flex;
      align-items: center;
      margin: 30px 0; 
      p {
        margin: 5px 0 0;
        max-width: 50ch;
      }
    }

    .icon {
      flex-basis: 50px;
      background-color: #b9ecc7;
      color: #333;
      width: 45px;
      height: 45px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
    }

    .image-section {
      position: relative;
      flex: 1 1 45%;
      display: flex;
      align-items: center;
      justify-content: center;
      .badge {
        position: absolute;
        background-color: white;
        border-radius: 8px;
        padding: 10px 10px;
        display: flex;
        align-items: center;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
        span {
          white-space: nowrap;
          margin-left: 8px;
          font-weight: 300;
        }
        .icon {
          padding: 0;
          margin: 0;
          svg {
            width: 30px;
            height: 30px;
          }
        }
      }

      .badge:first-of-type {
        top: 50px;
        left: -40px;
      }

      .badge:last-of-type {
        bottom: 50px;
        right: -40px;
      }

      .img {
        width: min(90%, 450px);
        object-fit: cover;
        position: relative;
        img {
          border-radius: 20px;
          width: 100%;
        }
      }
    }
  }
  @media (max-width: 768px) {
    .wrapper .content{
      flex: 1 1 100%;
      h3,.desc{
        justify-self: center;
        text-align: center;
      }
    }
  }
`;
