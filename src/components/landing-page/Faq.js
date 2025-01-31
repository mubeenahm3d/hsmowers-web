import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faq = [
    {
      question: "How does the platform work?",
      answer: "Our platform connects local high school students with homeowners needing lawn care. Simply browse through a list of available students, filter by your preferences, and contact your chosen helper directly to schedule a time.",
    },
    {
      question: "Is there a cost to use the platform?",
      answer: "No, our platform is free for customers but students pay a little fee to promote their profile.",
    },
    {
      question: "What are the benefits of hiring a local student?",
      answer: "Hiring a local student supports your community, provides flexible options, and can often be more affordable.",
    },
    {
      question: "How do I find the right student for my lawn care needs?",
      answer: "Use our platform to filter students by availability, skills, and previous reviews to find the perfect match for your needs.",
    },
    {
      question: "Are the students vetted for reliability?",
      answer: "Yes, students are vetted through an application process to ensure reliability and trustworthiness.",
    },
  ];

export default function Faq() {
  return (
    <StyledFaq>
      <div className="wrapper">
        <div className="top">
          <h3>Frequently Asked Questions</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit lorem
            sagittis, proin ut lectus sed ut. Enim egestas enim id duis.
          </p>
        </div>
        <div className="faq">
          {faq.map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    style={{ color: "#002140", width: "20px", height: "20px" }}
                  />
                }
              >
                <h4>{index+1}. {item.question}</h4>
              </AccordionSummary>
              <AccordionDetails>
                <p>{item.answer}</p>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </StyledFaq>
  );
}

const StyledFaq = styled.section`
  background-color: var(--section-bg-color);
  padding: var(--section-margin) 0;
  .wrapper {
    width: var(--section-width);
    margin: auto;
    .top {
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: var(--heading-gap);
      margin-bottom: 50px;
      p {
        max-width: 55ch;
      }
    }

    .css-l8h5l-MuiPaper-root-MuiAccordion-root{
        background-color: transparent;
        color: var(--text);
        box-shadow: none;
        margin-bottom: 1.4rem;
        position: static;
    }

    @media screen and (max-width: 900px) {
      padding: var(--section-margin) 0;
    }
  }
`;
