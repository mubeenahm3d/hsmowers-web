import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { db } from "../authentication/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import ProfileImg from "../assets/profilesvg.svg";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { createRoot } from "react-dom/client";
import CircularProgress from "@mui/material/CircularProgress";

const UserInfoWindow = ({ user, onNavigate }) => (
  <div style={{ margin: "5px" }}>
    <img
      src={user.photoURL || ProfileImg}
      alt={user.userName}
      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
    />
    <p
      style={{
        textDecoration: "underline",
        cursor: "pointer",
        fontWeight: "bold",
      }}
      onClick={onNavigate}
    >
      {user.userName || null}
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
  const [noMowersFound, setNoMowersFound] = useState(false);
  const [loading, setLoading] = useState(true);
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
        setNoMowersFound(true);
        setMapLoaded(true);
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
    setLoading(false);
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 11,
      center: latLng,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
      },
      mapTypeControl: false,
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

  const userName = localStorage.getItem("location");
  const displayLocation = userName || zipCode;

  return (
    <>
      <Navbar />
      <Heading>
        <h3>Mowers in Area</h3>
        <h4>{displayLocation}</h4>
      </Heading>

      <StyledMowers>
       
          {loading && (
            <div className="loader-container">
              <CircularProgress
                style={{ color: "var(--primary-color)" }}
                size={30}
              />
            </div>
          )}

          {!loading && noMowersFound ? (
            <p>No mowers found in this area.</p>
          ) : (
            <div
              id="map"
              className="mower-map"
              style={{ display: loading ? "none" : "block" }}
            />
          )}
      
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .loader-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  p {
    text-align: center;
  }

  .mower-map {
    margin-top: 3rem;
    width: 100%;
    height: 500px;
  }
`;

const Heading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
`;
