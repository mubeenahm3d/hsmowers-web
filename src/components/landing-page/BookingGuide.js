import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import MessageIcon from "@mui/icons-material/Message";
import img from "../../assets/landing-page/booking-guide.png";

export default function BookingGuide() {
  const steps = [
    {
      icon: <SearchIcon />,
      title: "Search for Mowers Near You",
      description:
        "Enter your ZIP code or city to discover mowers available in your neighborhood.",
    },
    {
      icon: <ListAltIcon />,
      title: "Browse Available Mowers",
      description:
        "Review a list of local mowers and their contact details to find the best match.",
    },
    {
      icon: <PhoneInTalkIcon />,
      title: "Mowers Will Contact You",
      description:
        "Choose your mower, and they will reach out to you directly to discuss your needs.",
    },
    {
      icon: <MessageIcon />,
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
          <p>Connecting You with Local Mowers Made Simple!</p>
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
          <img src={img} alt="Lawnmower" />
          <div className="badge">No SignUp</div>
          <div className="badge">Award Winning</div>
        </div>
      </div>
    </StyledBookService>
  );
}
const StyledBookService = styled.div`
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
      max-width: 600px;
      flex: 1 1 45%;
    }

    .steps-list {
      margin-top: 20px;
    }

    .step {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }

    .icon {
      background-color: #b9ecc7;
      color: #333;
      padding: 10px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
    }

    .step p {
      margin: 5px 0 0;
    }

    .image-section {
      position: relative;
      flex-basis: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .badge {
      position: absolute;
      background-color: white;
      border-radius: 8px;
      padding: 5px 10px;
      display: flex;
      align-items: center;
      box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
    }

    .badge:first-of-type {
      top: 20px;
      left: 20px;
    }

    .badge:last-of-type {
      bottom: 20px;
      right: 20px;
    }

    img {
      width: 320px;
      border-radius: 20px;
      object-fit: cover;
    }
  }
`;
