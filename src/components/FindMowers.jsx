import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { db } from "../authentication/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { createRoot } from "react-dom/client";

const UserInfoWindow = ({ user, onNavigate }) => (
  <div style={{ margin: "5px" }}>
    <img
      src={user.photoURL}
      alt={user.userName}
      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
    />
    <p
      style={{ textDecoration: "underline", cursor: "pointer" }}
      onClick={onNavigate}
    >
      {user.userName}
    </p>
    <p>
      {Number(user.grade) === 9
        ? "Fresh"
        : Number(user.grade) === 10
        ? "Sophomore"
        : Number(user.grade) === 11
        ? "Junior"
        : Number(user.grade) === 12
        ? "Senior"
        : "No Grade"}
    </p>
  </div>
);

const FindMowers = () => {
  const [zipCode, setZipCode] = useState("");
  const [latLng, setLatLng] = useState({ lat: null, lng: null });
  const [serviceAreas, setServiceAreas] = useState([]);
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const zip = searchParams.get("zip");
    if (zip) {
      setZipCode(zip);
      fetchMatchingUsers(zip);
    }
  }, [searchParams]);

  const fetchMatchingUsers = async (zip) => {
    try {
      const usersRef = collection(db, "userInfo");
      const q = query(usersRef, where("zipCode", "==", zip));
      const querySnapshot = await getDocs(q);
      const users = [];

      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });

      setMatchingUsers(users);
      console.log(users);

      if (users.length > 0) {
        fetchServiceAreas(zip);
      } else {
        console.log("No users found with the provided zip code.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchServiceAreas = async (zip) => {
    try {
      const serviceAreasRef = collection(db, "userInfo");
      const q = query(serviceAreasRef, where("zipCode", "==", zip));
      const querySnapshot = await getDocs(q);
      const areas = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.serviceArea) {
          areas.push({ id: doc.id, ...data.serviceArea });
        }
      });

      if (areas.length > 0) {
        setLatLng({ lat: areas[0].path[0].lat, lng: areas[0].path[0].lng });
        setServiceAreas(areas);
        console.log(areas);
        setMapLoaded(true);
      } else {
        console.log("No matching service areas found.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };



const initMap = () => {
  const map = new window.google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: latLng,
  });

  serviceAreas.forEach((area) => {
    const polygon = new window.google.maps.Polygon({
      paths: area.path,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });
    polygon.setMap(map);
  });

  matchingUsers.forEach((user) => {
    const userCoordinates = user.serviceArea?.path[0];
    const position = userCoordinates
      ? { lat: userCoordinates.lat, lng: userCoordinates.lng }
      : latLng;

    const marker = new window.google.maps.Marker({
      position: position,
      map: map,
      title: user.userName,
    });

   
    const infoWindow = new window.google.maps.InfoWindow();

  
    const userInfoDiv = document.createElement("div");
    const root = createRoot(userInfoDiv);
    root.render(
      <UserInfoWindow
        user={{
          userName: user.userName,
          grade: user.grade,
          photoURL: user.photoURL,
        }}
        onNavigate={() => {
          navigate(`/profile-page/${user.userName}`);
        }}
      />
    );

    infoWindow.setContent(userInfoDiv);
    infoWindow.open(map, marker);
  });
};


  useEffect(() => {
    if (mapLoaded && googleMapsLoaded) {
      initMap();
    }
  }, [mapLoaded, googleMapsLoaded, latLng, serviceAreas, matchingUsers]);

  const loadGoogleMaps = () => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.onload = () => setGoogleMapsLoaded(true);
    document.body.appendChild(script);
  };



  useEffect(() => {
    loadGoogleMaps();
  }, []);



  return (
    <>
      <Navbar />
      <StyledMowers>
        <h3>Mowers in Area: {zipCode}</h3>
        <div id="map" className="mower-map" />
      </StyledMowers>
      <Footer />
    </>
  );
};



export default FindMowers;

const StyledMowers = styled.div`
  min-height: var(--section-height);
  margin: var(--section-margin) auto;
  width: 90%;
  h3 {
    text-align: center;
  }

  .mower-map {
    margin-top: 3rem;
    width: 100%;
    height: 500px;
  }
`;
