import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PricingCard from "../components/PricingCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../authentication/firebase";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

export default function Upgrade() {
  const [isYearly, setIsYearly] = useState(false);
  // const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState({ month: {}, year: {} });
  const [loading, setLoading] = useState(true);

  const subscription = useSelector((state) => state.user.subscription);

  const getPlans = async () => {
    const productsQuery = query(
      collection(db, "products"),
      where("active", "==", true)
    );
    let fetchedProducts = [];
    try {
      const productsSnapshot = await getDocs(productsQuery);
      const promises = productsSnapshot.docs.map(async (product) => {
        const pricesRef = collection(db, "products", product.id, "prices");
        const pricesSnapshot = await getDocs(pricesRef);
        // console.log("fetched products", product.data());
        fetchedProducts.push({
          id: product.id,
          ...product.data(),
          prices: pricesSnapshot.docs.map((price) => ({
            id: price.id,
            ...price.data(),
          })),
        });
      });
      await Promise.all(promises);
      console.log("products", fetchedProducts);
      // setProducts(fetchedProducts);
      let fetchedPrices = {};
      fetchedProducts?.[0]?.prices?.forEach((price) => {
        fetchedPrices[price?.interval] = price;
      });
      console.log("prices", fetchedPrices);

      console.log("fetched prices", fetchedPrices)
      setPrices(fetchedPrices);
    } catch (e) {
      console.log("error while fetching prices", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  return (
    <>
      <Navbar />
      <StyledUpgrade>
        {/* {Object.keys(subscription).length > 0 && (
          <div className="current-plan">
            <h5>{`You're subscribed to `}</h5>
          </div>
        )} */}
        <h2 className="heading">Choose Your Plan</h2>
        <div className="toggle-container">
          <div className="toggle-button">
            <button
              className={`toggle-option ${!isYearly ? "active" : ""}`}
              onClick={() => setIsYearly(false)}
            >
              Monthly
            </button>
            <button
              className={`toggle-option ${isYearly ? "active" : ""}`}
              onClick={() => setIsYearly(true)}
            >
              Annually
            </button>
          </div>
        </div>
        <div className="pricing">
          {loading ? (
            <CircularProgress style={{ marginTop: 50 }} color="inherit" />
          ) : (
            <PricingCard
              priceInfo={prices[isYearly ? "year" : "month"]}
              subscription={subscription}
              loading={loading}
            />
          )}
        </div>
        <p className="description">
          ClearSlate.io is a service built with passion, but maintaining it
          isn't without costs. I’m committed to keeping the site ad-free, and
          your support helps make that possible. For just $4, you can enjoy
          unlimited use of our web interface. <br />
          <br /> For businesses and those requiring more advanced integration,
          we offer direct API access. Please reach out through our contact form
          for details. ClearSlate.io can also be deployed in your cloud or
          on-premises environment to meet your specific needs.
        </p>
      </StyledUpgrade>
      <Footer />
    </>
  );
}

const StyledUpgrade = styled.div`
  min-height: 75vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: var(--section-margin);
  .heading {
    font-weight: 600;
    margin-bottom: var(--section-margin);
    text-align: center;
  }
  .description {
    margin: 2rem 1rem;
    max-width: 70ch;
  }
  .toggle-button {
    display: flex;
    width: fit-content;
    border: 1px solid #ccc;
    border-radius: 30px;
    overflow: hidden;
    padding: 4px;
    background-color: #f1f1f1;
    margin-bottom: 1.4rem;

    .toggle-option {
      background: transparent;
      cursor: pointer;
      color: var(--primary-color);
      transition: background-color 0.3s;
      transition: color 0.3s;
      outline: none;
      font-weight: 600;
      border-radius: 30px;
    }

    .active {
      background-color: var(--primary-color);
      color: white;
    }
  }
  .pricing {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
