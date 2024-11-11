import { useState } from "react";
import styled from "styled-components";
import BackdropWrapper from "./modals/BackdropWrapper";
import ActionModal from "./modals/ActionModal";
import { useNavigate } from "react-router";
import { auth, db } from "../authentication/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import LoadingButton from "./LoadingButton";
import Info from "./modals/Info";
import { useSelector } from "react-redux";

const PricingCard = ({ priceInfo, subscription }) => {
  const [actionModal, setActionModal] = useState(false);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState({
    active: false,
    error: "",
  });

  const navigate = useNavigate();
  
  const upgradeHandler = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      backdropHandler();
      return;
    }
    setSubscriptionLoading(true);
    try {
      const collectionRef = collection(
        db,
        "customers",
        uid,
        "checkout_sessions"
      );

      const docRef = await addDoc(collectionRef, {
        price: priceInfo.id,
        success_url: `${window.location.origin}/payment-successful`,
        cancel_url: `${window.location.origin}/payment-cancelled`,
      });

      onSnapshot(docRef, (snap) => {
        const { error, url } = snap?.data();
        if (error) {
          setSubscriptionError({ active: true, error: error.message });
          setSubscriptionLoading(false);
        } else if (url) {
          window.location.assign(url);
        }
      });
    } catch (e) {
      setSubscriptionLoading(false);
      console.log("error while subscription redirecting", e);
    }
  };

  const backdropHandler = () => {
    setActionModal((current) => !current);
  };

  const actionModalFunction = () => {
    backdropHandler();
    navigate("/login", { state: { from: "/upgrade" } });
  };

  const subscriptionBackdropHandler = () => {
    setSubscriptionError((current) => ({
      ...current,
      active: !current.active,
    }));
  };

  // Extracting useful fields from the subscription object
  const isSubscribed = subscription?.status === "active";
  const subscriptionEndDate = subscription?.current_period_end
    ? new Date(
        subscription.current_period_end.seconds * 1000
      ).toLocaleDateString()
    : null;

  // Determine if user has a subscription matching the current plan
  const isCurrentPlan = subscription.items?.some(
    (item) => item.plan.id === priceInfo.id && subscription.status === "active"
  );

  // Check if the user is on a yearly plan
  const isYearlyPlan = subscription.items?.some(
    (item) => item.plan.interval === "year" && subscription.status === "active"
  );

  return (
    <>
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
      <BackdropWrapper
        open={subscriptionError.active}
        smallSize={true}
        backdropHandler={subscriptionBackdropHandler}
        element={
          <Info
            heading={"Subscription Error"}
            msg={"Please contact us to solve this issue"}
            backdropHandler={subscriptionBackdropHandler}
          />
        }
      />
      <StyledPricingCard>
        <div className="discount-banner">
          Discount applied: <strong>NEWUSER</strong>
        </div>

        <div className="pricing-info">
          <h2 className="duration">1 {priceInfo?.interval}</h2>

          <div className="new-price-container">
            <h1 className="new-price">
              <span>$</span>
              {priceInfo?.unit_amount / 100}
            </h1>
            <p className="per-month">per {priceInfo?.interval}</p>
          </div>

          {isYearlyPlan && priceInfo.interval === "month" ? (
            <StyledGradientText>
              You are subscribed to a yearly package.
            </StyledGradientText>
          ) : isSubscribed ? (
            isCurrentPlan ? (
              <div>
                <h5 style={{ fontStyle: "italic", marginBottom: 10 }}>
                  Already Subscribed
                </h5>
                <button onClick={() => navigate("/subscription-detail")}>
                  Details
                </button>
              </div>
            ) : (
              <LoadingButton
                title={"Subscribe"}
                onClick={upgradeHandler}
                loading={subscriptionLoading}
              />
            )
          ) : (
            // If the user is not subscribed, show the subscribe button
            <LoadingButton
              title={"Subscribe"}
              onClick={upgradeHandler}
              loading={subscriptionLoading}
            />
          )}
        </div>
      </StyledPricingCard>
    </>
  );
};

const StyledPricingCard = styled.div`
  width: 340px;
  border-radius: 12px;
  box-shadow: 0px 0px 8px 4px lightgray;
  padding: 24px;
  text-align: center;
  font-family: Arial, sans-serif;

  .discount-banner {
    background-color: #d0ebd5;
    color: #2d6a4f;
    padding: 5px 0;
    font-size: 0.85rem;
    border-radius: 8px;
    margin-bottom: 2rem;
  }

  .pricing-info {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .duration {
    font-size: 1.2rem;
    color: #000;
  }

  .new-price-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 24px 0;
  }

  .new-price {
    font-weight: bold;
    color: #2d6a4f;
    line-height: 1;
    span {
      font-size: 2rem;
      color: inherit;
    }
  }

  .per-month {
    font-size: 1rem;
    color: #757575;
    margin-left: 5px;
  }
`;

const StyledGradientText = styled.span`
  font-style: italic;
  font-weight: 700;
  font-size: 1.1rem; /* Adjust font size as needed */
  background: linear-gradient(
    45deg,
    #0072ff,
    #00c6ff,
    #ff6f61,
    #6a82fb
  ); /* Gradient colors */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default PricingCard;
