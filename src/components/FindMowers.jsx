import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { db } from "../authentication/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import ProfileImg from "../assets/profilesvg.svg";
import axios from "axios"; 
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { createRoot } from "react-dom/client";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchSubscription } from "../utils/fetchSubscription";
import ServiceRequestModal from "./modals/ServiceRequestModal";
import BackdropWrapper from "./modals/BackdropWrapper";


const calculatePolygonCentroid = (path) => {
  if (!path || path.length === 0) return null;

  let x = 0;
  let y = 0;
  const numPoints = path.length;

  path.forEach((point) => {
    x += point.lat;
    y += point.lng;
  });

  return {
    lat: x / numPoints,
    lng: y / numPoints,
  };
};

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
  const [searchInput, setSearchInput] = useState(""); 
  const [requestModal, setRequestModal] = useState(false);
  
  const [displaylocation, setDisplaylocation] = useState(
     localStorage.getItem("location") || zipCode
   );
  const navigate = useNavigate(); 
  const inputRef = useRef(null); 


   useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setGoogleMapsLoaded(true);
      document.body.appendChild(script);
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      setGoogleMapsLoaded(true);
    }
  }, []);


  useEffect(() => {
    if (googleMapsLoaded && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current
      );
      autocomplete.setFields(["address_components", "geometry"]);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          const zipComponent = place.address_components.find((component) =>
            component.types.includes("postal_code")
          );
          if (zipComponent) {
            setZipCode(zipComponent.long_name);
            fetchMatchingUsers(zipComponent.long_name);
          }
        }
      });
    }
  }, [googleMapsLoaded]);



  useEffect(() => {
    const zip = searchParams.get("zip");
    if (zip) {
      setZipCode(zip);
      fetchMatchingUsers(zip);
    }
  }, [searchParams]);


  const isZipCode = (input) => /^[0-9]{5}$/.test(input);


  const geocodeLocationToZipCode = async (location) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: location,
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          },
        }
      );
      const zipComponent = response.data.results[0].address_components.find(
        (component) => component.types.includes("postal_code")
      );
      return zipComponent ? zipComponent.long_name : null;
    } catch (error) {
      console.log("Error geocoding location:", error);
      return null;
    }
  };


  const fetchMatchingUsers = async (zip) => {
    try {
      const usersRef = collection(db, "userInfo");
      const q = query(usersRef, where("zipCode", "==", zip));
      const querySnapshot = await getDocs(q);
      const users = [];

      for (const doc of querySnapshot.docs) {
        const userData = doc.data();
        const userSubscription = await fetchSubscription(doc.id);

        if (userSubscription) {
          users.push({ id: doc.id, ...userData });
        }
      }

      setMatchingUsers(users);
      console.log(users);

      if (users.length > 0) {
        await fetchServiceAreas(users);
        setNoMowersFound(false); 
      } else {
        console.log("No subscribed users found with the provided zip code.");
        setNoMowersFound(true);
        setMapLoaded(true);
      }
    } catch (error) {
      setNoMowersFound(true);
      console.log(error.message);
    }
  };



  const fetchServiceAreas = async (users) => {
    try {
      const areas = [];


      for (const user of users) {
        if (user.serviceArea) {
          areas.push({ id: user.id, ...user.serviceArea });
        }
      }

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

   
    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    const map = new window.google.maps.Map(mapElement, {
      zoom: 14,
      center: latLng,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.BOTTOM_CENTER,
      },
      mapTypeControl: false,
      fullscreenControl: false,
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

    let firstInfoWindowOpened = false;

    matchingUsers.forEach((user, index) => {
      const centroid = user.serviceArea?.path
        ? calculatePolygonCentroid(user.serviceArea.path)
        : latLng;

      const marker = new window.google.maps.Marker({
        position: centroid,
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
            navigate(`/p/${user.userName}`);
          }}
        />
      );

      infoWindow.setContent(userInfoDiv);

      if (!firstInfoWindowOpened && index === 0) {
        infoWindow.open(map, marker);
        firstInfoWindowOpened = true;
      }

      marker.addListener("click", () => {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
        }
      });
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

  // const userName = localStorage.getItem("location");
  // const displayLocation = userName || zipCode;


  const handleSearch = async () => {
    setLoading(true);
    let zip = "";
    if (isZipCode(searchInput)) {
      zip = searchInput;
    } else {
      const locationZipCode = await geocodeLocationToZipCode(searchInput);
      if (locationZipCode) {
        zip = locationZipCode;
      } else {
        console.log("Invalid location.");
        setLoading(false);
        return;
      }
    }
    setZipCode(zip);
    navigate(`?zipcode=${zip}`);
    setDisplaylocation(zip);
    await fetchMatchingUsers(zip);
    setLoading(false);
  };


  useEffect(() => {
    setDisplaylocation(zipCode);
  }, [zipCode]);


  const requestModalfunc = () => {
    backdropHandlerRequest();
  };

  const backdropHandlerRequest = () => {
    setRequestModal((current) => !current);
  };


  return (
    <>
      <Navbar />

      <BackdropWrapper
        open={requestModal}
        smallSize={true}
        backdropHandler={backdropHandlerRequest}
        element={
          <ServiceRequestModal
            heading={"Request Service"}
            backdropHandler={backdropHandlerRequest}
          />
        }
      />
      <Heading>
        <h3>Mowers in Area</h3>
        <h4>{displaylocation}</h4>
      </Heading>

      <Search>
        <input
          type="text"
          placeholder="Enter Zip Code or Address"
          ref={inputRef}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </Search>

      <CoverageModal>
        <p>Don't see coverage in your neibhourhood?</p>
        <button onClick={requestModalfunc}>Request</button>
      </CoverageModal>

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
    top: 70%;
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
    border-radius: var(--l-radius);
  }
`;

const Heading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
`;

const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  input {
    border-top-right-radius: 0rem;
    border-bottom-right-radius: 0rem;
  }
  button {
    border-top-left-radius: 0rem;
    border-bottom-left-radius: 0rem;
  }
`;

const CoverageModal = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 1rem;
flex-wrap: wrap;
margin-top: 32px;
  
`
