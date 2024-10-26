import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";

let paymentSuccessful;

export default function PaymentResponse() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (pathname === "/payment-successful") {
    paymentSuccessful = true;
  } else {
    paymentSuccessful = false;
  }

  return (
    <>
      <Navbar />
      <StyledPaymentSuccessful>
        <h2 className="heading">
          {paymentSuccessful
            ? "Subscription Successful 🎉"
            : "Subscription Unsuccessful 😢"}
        </h2>
        {paymentSuccessful && <h5>You now have unlimited use</h5>}
        <button onClick={(e) => navigate("/")}>Continue</button>
      </StyledPaymentSuccessful>
      <Footer />
    </>
  );
}

const StyledPaymentSuccessful = styled.section`
  min-height: var(--section-height);
  margin-top: var(--section-margin);
  display: flex;
  flex-direction: column;
  align-items: center;

  .heading {
    font-weight: 600;
    text-align: center;
    margin-bottom: var(--heading-margin);
  }
  h5{
    margin-bottom: var(--section-margin);
  }
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #2ecc71; // You can customize the color as needed
  margin-bottom: var(--section-margin);
  text-align: center;
`;
