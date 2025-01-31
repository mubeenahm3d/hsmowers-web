import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import LanguageIcon from "@mui/icons-material/Language";
import PeopleIcon from "@mui/icons-material/People";
import styled from "styled-components";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LoadingButton from "../LoadingButton";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <PhoneIcon />,
      title: "Quick and Easy Connections",
      description:
        "Find trusted mowers nearby. Submit a request, and they’ll reach out!",
    },
    {
      icon: <AccessTimeIcon />,
      title: "Direct Communication",
      description: "Talk directly to mowers via phone, email, or SMS.",
    },
    {
      icon: <SchoolIcon />,
      title: "Save Time Searching",
      description:
        "Avoid hours of research—our platform connects you with local mowers quickly.",
    },
    {
      icon: <MoneyOffIcon />,
      title: "Support Local Talent",
      description:
        "Hire hardworking local students to get the job done and give back to your community.",
    },
    {
      icon: <LanguageIcon />,
      title: "Free and Simple to Use",
      description:
        "No sign-ups, no hidden fees—request services with zero hassle.",
    },
    {
      icon: <PeopleIcon />,
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
        <LoadingButton>
          Find a Mower Now <ArrowForwardIcon fontSize="small" />
        </LoadingButton>
      </div>
      <div className="benefits-grid">
        {benefits.map((benefit, index) => (
          <div className={`benefit-card benefit-card-${index}`} key={index}>
            <h2>{benefit.icon}</h2>
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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .benefit-card {
    padding: 20px;
    border: 1px solid #ededed;
    border-radius: 20px;
    text-align: left;
    box-shadow: #0000000f 0 32px 64px -12px;
  }

  .benefit-card h3 {
    display: flex;
    align-items: center;
  }

  .benefit-card h3 svg {
    margin-right: 10px;
  }

  /* Add any additional styles for specific cards */
  .benefit-card-0 {
    /* styles for first card */
  }
  .benefit-card-1 {
    /* styles for second card */
  }
  .benefit-card-2 {
    /* styles for third card */
  }
  .benefit-card-3 {
    /* styles for fourth card */
  }
  .benefit-card-4 {
    /* styles for fifth card */
  }
  .benefit-card-5 {
    /* styles for sixth card */
  }
`;
