import React from "react";
import styled from "styled-components";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LoadingButton from "../LoadingButton";
import { useNavigate } from "react-router";
import QuickreplyOutlinedIcon from "@mui/icons-material/QuickreplyOutlined";
import PhoneForwardedOutlinedIcon from "@mui/icons-material/PhoneForwardedOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import CreditCardOffOutlinedIcon from "@mui/icons-material/CreditCardOffOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const BenefitsSection = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <QuickreplyOutlinedIcon fontSize="large" />,
      title: "Quick and Easy Connections",
      description:
        "Find trusted mowers nearby. Submit a request, and they’ll reach out!",
    },
    {
      icon: <PhoneForwardedOutlinedIcon fontSize="large" />,
      title: "Direct Communication",
      description: "Talk directly to mowers via phone, email, or SMS.",
    },
    {
      icon: <TimerOutlinedIcon fontSize="large" />,
      title: "Save Time Searching",
      description:
        "Avoid hours of research—our platform connects you with local mowers quickly.",
    },
    {
      icon: <MenuBookOutlinedIcon fontSize="large" />,
      title: "Support Local Talent",
      description:
        "Hire hardworking local students to get the job done and give back to your community.",
    },
    {
      icon: <CreditCardOffOutlinedIcon fontSize="large" />,
      title: "Free and Simple to Use",
      description:
        "No sign-ups, no hidden fees—request services with zero hassle.",
    },
    {
      icon: <MapOutlinedIcon fontSize="large" />,
      title: "Wide Availability",
      description:
        "Access a growing network of mowers ready to help with your lawn care needs.",
    },
  ];

  return (
    <StyledBenifits className="benefits-section">
      <div className="benefits-top">
        <h3>The Benefits You Will Get</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit lorem
          sagittis, proin ut lectus sed ut. Enim egestas enim id duis.
        </p>
        <LoadingButton onClick={() => navigate("/find-mowers")}>
          Find a Mower Now <ArrowForwardIcon fontSize="small" />
        </LoadingButton>
      </div>
      <div className="benefits-grid">
        {benefits.map((benefit, index) => (
          <div className={`benefit-card benefit-card-${index}`} key={index}>
            <div className="svg">{benefit.icon}</div>
            <h4>{benefit.title}</h4>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>
    </StyledBenifits>
  );
};

export default BenefitsSection;

const StyledBenifits = styled.section`
  width: var(--section-width);
  margin: var(--section-margin) auto;
  .benefits-top {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: var(--heading-gap);
    margin-bottom: 50px;
    p {
      max-width: 55ch;
    }
  }

  .benefits-grid {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
    .benefit-card {
      width: min(400px, 95%);
      padding: 20px;
      border: 1px solid #ededed;
      border-radius: 20px;
      text-align: left;
      box-shadow: #0000000f 0 32px 64px -12px;
      h4 {
        margin: 12px 0 8px 0;
      }
      .svg {
        color: var(--text-light-color);
      }
    }
  }
  @media (max-width: 768px) {
    .benefits-top{
      align-items: center;
      text-align: center;
    }
  }
`;
