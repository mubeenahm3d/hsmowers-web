import { useState } from "react";
import styled from "styled-components";
import BackdropWrapper from "./modals/BackdropWrapper";
import ActionModal from "./modals/ActionModal";
import { useNavigate } from "react-router";
import { auth, db } from "../authentication/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import LoadingButton from "./LoadingButton";
import Info from "./modals/Info";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const PricingCard = ({ priceInfo, subscription }) => {
  const [actionModal, setActionModal] = useState(false);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState({
    active: false,
    error: "",
  });
  const [isYearly, setIsYearly] = useState(true);
  const toggleSwitch = () => setIsYearly((current) => !current);

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
        {/* <div className="discount-banner">
          Discount applied: <strong>NEWUSER</strong>
        </div> */}
        <h2>
          ${priceInfo?.unit_amount / 100} <span>Per {priceInfo?.interval}</span>
        </h2>
        <div className="toggle">
          <ToggleSwitch onClick={toggleSwitch} isActive={isYearly} />
          <p>Yearly</p>
          <span>You save 30%</span>
        </div>
        <ul>
          <li>
            <CheckCircleOutlineIcon htmlColor="var(--primary-light-color)" />
            <span>Transactions with no fees (available for annual plans)</span>
          </li>
          <li>
            <CheckCircleOutlineIcon htmlColor="var(--primary-light-color)" />
            <span>Affordable Unlimited Access Plan</span>
          </li>
          <li>
            <CheckCircleOutlineIcon htmlColor="var(--primary-light-color)" />
            <span>Personalized Web Page</span>
          </li>
          <li>
            <CheckCircleOutlineIcon htmlColor="var(--primary-light-color)" />
            <span>Unlimited Services</span>
          </li>
        </ul>
        <LoadingButton>Subscribe</LoadingButton>
        {/* <div className="pricing-info">
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
        </div> */}
      </StyledPricingCard>
    </>
  );
};

const ToggleSwitch = styled.div`
  width: 40px;
  height: 20px;
  background-color: ${(props) =>
    props.isActive ? "var(--primary-color)" : "#ccc"};
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;

  &:before {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    background-color: white;
    border-radius: 50%;
    top: 1px;
    left: ${(props) => (props.isActive ? "20px" : "1px")};
    transition: left 0.3s;
  }
`;

const StyledPricingCard = styled.div`
  width: 100%;
  border-radius: 12px;
  padding: 30px 24px;
  border: 2px solid var(--primary-light-color);
  background-color: var(--section-bg-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 20px;
  .toggle {
    display: flex;
    align-items: center;
    gap: 10px;
    p {
      color: var(--text-color);
      font-weight: 600;
    }
    span {
      margin-left: 20px;
      color: #bf1d69;
    }
  }
  ul li {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 10px;
  }
`;


export default PricingCard;
