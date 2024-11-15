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
   if (
     googleMapsLoaded &&
     inputRef.current &&
     window.google &&
     window.google.maps &&
     window.google.maps.places
   ) {
     const autocomplete = new window.google.maps.places.Autocomplete(
       inputRef.current
     );
     autocomplete.setFields([
       "address_components",
       "geometry",
       "formatted_address",
     ]);

     autocomplete.addListener("place_changed", () => {
       const place = autocomplete.getPlace();
       if (place.geometry) {
         const zipComponent = place.address_components.find((component) =>
           component.types.includes("postal_code")
         );
         if (zipComponent) {
           const formattedAddress = place.formatted_address;
           setSearchInput(formattedAddress); 
           localStorage.setItem("location", formattedAddress);
           setDisplaylocation(formattedAddress);
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
 
      const savedLocation = localStorage.getItem("location");
      setDisplaylocation(savedLocation || zip); 
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

      if (response.data.status === "OK") {
        const zipComponent = response.data.results[0].address_components.find(
          (component) => component.types.includes("postal_code")
        );

        if (zipComponent) {
          return zipComponent.long_name; 
        } else {
          console.log("No zip code found in geocode response.");
          return null;
        }
      } else {
        console.log("Geocode failed:", response.data.status);
        return null;
      }
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

      
      setNoMowersFound(users.length === 0);

    
      if (users.length > 0) {
        await fetchServiceAreas(users);
      } else {
        setServiceAreas([]);
      }

      setMapLoaded(true);
    } catch (error) {
      console.log(error.message);
      setNoMowersFound(true);
      setMapLoaded(true);
    } finally {
      setLoading(false);
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
  

  const initMap = async () => {
    setLoading(false);

    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    const defaultLatLng = { lat: 40.7128, lng: -74.006 };

   
    const savedLocation = localStorage.getItem("location");
    let centerLatLng = defaultLatLng;

   
    if (savedLocation) {
      const coordinates = await geocodeLocation(savedLocation);
      if (coordinates) {
        centerLatLng = coordinates;
      }
    } else {
      
      const storedLatLng = localStorage.getItem("latLng");
      if (storedLatLng) {
        centerLatLng = JSON.parse(storedLatLng);
      }
    }

    const map = new window.google.maps.Map(mapElement, {
      zoom: 14,
      center: centerLatLng,
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

    
    matchingUsers.forEach((user) => {
      const centroid = user.serviceArea?.path
        ? calculatePolygonCentroid(user.serviceArea.path)
        : centerLatLng;

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
      infoWindow.open(map, marker);

      marker.addListener("click", () => {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
        }
      });
    });


    if (noMowersFound && centerLatLng.lat && centerLatLng.lng) {
      const geocodeLocation = new window.google.maps.LatLng(
        centerLatLng.lat,
        centerLatLng.lng
      );

      const userMarker = new window.google.maps.Marker({
        position: geocodeLocation,
        map: map,
        title: `Entered Location: ${savedLocation}`,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div><strong>${savedLocation}</strong></div>`,
      });

      infoWindow.open(map, userMarker);
      map.setCenter(geocodeLocation);
    }
  };

  
  const geocodeLocation = async (location) => {
    try {
      let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

    
      if (/^\d{5}(-\d{4})?$/.test(location)) {
       
        geocodeUrl += `&address=${location}`;
      } else {
     
        geocodeUrl += `&address=${encodeURIComponent(location)}`;
      }

      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng }; 
      } else {
        console.error("Geocoding error:", data.status);
        return null;
      }
    } catch (error) {
      console.error("Geocoding API error:", error);
      return null;
    }
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


 const handleSearch = async () => {
   setLoading(true);
   let zip = "";

   if (isZipCode(searchInput)) {
     zip = searchInput;
     setLatLng(null); 
   } else {
     const locationZipCode = await geocodeLocationToZipCode(searchInput);
     if (locationZipCode) {
       zip = locationZipCode;
     } else {
       setLoading(false);
       return;
     }
   }

   setZipCode(zip);
   localStorage.setItem("location", searchInput);
   setDisplaylocation(searchInput);

   navigate(`?zipcode=${zip}`);
   await fetchMatchingUsers(zip);

   if (matchingUsers.length === 0) {
     setNoMowersFound(true);
   }

   setLoading(false);
 };


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
        <button onClick={requestModalfunc} className="green-btn">
          Request
        </button>
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

        {!loading && noMowersFound && (
          <div className="no-mowers-message">
            <p>No mowers found in this area.</p>
          </div>
        )}

        <div
          id="map"
          className="mower-map"
          style={{ display: loading ? "none" : "block" }}
        />
      </StyledMowers>

      <Footer />
    </>
  );
};

export default FindMowers;



const StyledMowers = styled.div`
  min-height: var(--section-height);
  margin: 2rem auto var(--section-margin) auto;
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
    width: 100%;
    height: 500px;
    border-radius: var(--l-radius);
  }

  .no-mowers-message {
    p {
      color: red;
      margin-bottom: 1rem;
    }
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
margin-top: 45px;
  
`
