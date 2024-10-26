import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress
import { auth, db } from "../authentication/firebase";
import BackdropWrapper from "../components/modals/BackdropWrapper";
import { collection, deleteDoc, onSnapshot } from "firebase/firestore";
import ActionModal from "../components/modals/ActionModal";
import { useNavigate } from "react-router";

function SubscriptionDetail({ priceInfo }) {
  const subscription = useSelector((state) => state.user.subscription);
  const [actionModal, setActionModal] = useState(false);
  const navigate = useNavigate();

  const isSubscribed = subscription?.status === "active";
  const subscriptionStartDate = subscription?.current_period_start
    ? new Date(
        subscription.current_period_start.seconds * 1000
      ).toLocaleDateString()
    : null;
  const subscriptionEndDate = subscription?.current_period_end
    ? new Date(
        subscription.current_period_end.seconds * 1000
      ).toLocaleDateString()
    : null;
  const planType = subscription?.items?.some(
    (item) => item.plan.interval === "year"
  )
    ? "Yearly"
    : "Monthly";

  const backdropHandler = () => {
    setActionModal((current) => !current);
  };

  const actionModalFunction = () => {
    backdropHandler();
    navigate("/login", { state: { from: "/upgrade" } });
  };

  return (
    <>
      <Navbar />
      <BackdropWrapper
        open={actionModal}
        smallSize={true}
        backdropHandler={backdropHandler}
        element={
          <ActionModal
            heading={"Login Required"}
            msg={"Please login or signup before upgrading"}
            backdropHandler={backdropHandler}
            buttonName={"Login"}
            action={actionModalFunction}
          />
        }
      />
      <StyledDiv>
        <h2>Subscription Details</h2>

        {isSubscribed ? (
          <SubscriptionInfo>
            <InfoItem>
              <Label>Plan Type:</Label> <span>{planType}</span>
            </InfoItem>
            <InfoItem>
              <Label>Start Date:</Label> <span>{subscriptionStartDate}</span>
            </InfoItem>
            <InfoItem>
              <Label>End Date:</Label> <span>{subscriptionEndDate}</span>
            </InfoItem>
            <StyledButton href="https://billing.stripe.com/p/login/7sI3czcTT64F1qg000">
              Cancel Subscription
            </StyledButton>
          </SubscriptionInfo>
        ) : (
          <NoSubscriptionMessage>
            No active subscription found.
          </NoSubscriptionMessage>
        )}
      </StyledDiv>
      <Footer />
    </>
  );
}

const StyledDiv = styled.section`
  min-height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px;
  background-color: #f9fafb;

  h2 {
    margin-bottom: var(--heading-margin);
  }
`;

const SubscriptionInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const InfoItem = styled.p`
  font-size: 1.2rem;
  margin: 10px 0;
  color: #34495e;

  span {
    font-weight: bold;
  }
`;

const Label = styled.span`
  color: #2ecc71;
  font-weight: bold;
`;

const StyledButton = styled.a`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 12px 25px;
  font-size: 1.1rem;
  margin-top: 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

const NoSubscriptionMessage = styled.p`
  font-size: 1.3rem;
  color: #e74c3c;
`;

export default SubscriptionDetail;
