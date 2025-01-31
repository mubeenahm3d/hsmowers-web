import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PricingCard from "../components/PricingCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../authentication/firebase";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import Heading from "../components/Heading";

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

      console.log("fetched prices", fetchedPrices);
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
      <Heading title="Pricing" />
      <StyledUpgrade>
        {/* {Object.keys(subscription).length > 0 && (
          <div className="current-plan">
            <h5>{`You're subscribed to `}</h5>
          </div>
        )} */}
        <div className="text">
          <h3>Join Us and Showcase Your Talent Today!</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit lorem
            sagittis, proin ut lectus sed ut. Enim egestas enim id duis.
          </p>
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
      </StyledUpgrade>
      {/* <Footer /> */}
    </>
  );
}

const StyledUpgrade = styled.div`
  width: var(--section-width);
  margin: auto;
  margin-top: var(--section-margin);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  .text{
    h3{
      max-width: 19ch;
      margin-bottom: var(--heading-gap);
    }
  }
  .pricing {
    width: 100%;
  }
`;
