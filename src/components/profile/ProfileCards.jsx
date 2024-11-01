import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfileCard from "./ProfileCard";
import { collection, query, limit, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../authentication/firebase";
import CircularProgress from "@mui/material/CircularProgress";

export default function ProfileCards() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const collectionRef = collection(db, "userInfo");
    const q = query(collectionRef, orderBy("createdAt", "desc"), limit(4));

    try {
      const querySnapshot = await getDocs(q);
      const fetchedData = [];

      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} =>`, doc.data());
        fetchedData.push({ id: doc.id, ...doc.data() });
      });

      if (fetchedData.length > 0) {
        setUserData(fetchedData);
      } 
    } catch (error) {
      console.error("Error fetching documents: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <StyledProfileCards>
      {loading ? (
        <div className="loader-container">
          <CircularProgress style={{ color: "blue" }} />
        </div>
      ) : (
        userData.map((profile) => (
          <ProfileCard key={profile.id} profileData={profile} />
        ))
      )}
    </StyledProfileCards>
  );
}

const StyledProfileCards = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.4rem;
  flex-wrap: wrap;
  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%; 
  }

  @media (max-width: 690px) {
    justify-content: center;
  }
`;
