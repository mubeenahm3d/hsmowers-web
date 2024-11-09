import React, { useEffect, useRef, useState } from "react";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoadingButton from "../components/LoadingButton";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../authentication/firebase";
import { useNavigate } from "react-router";

const Map = () => {
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [maploading, setMapLoading] = useState(true);
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const userInfo = useSelector((state) => state.user.userInfo);

  const handleSave = async () => {
    setLoading(true); 
    try {
      const updatedUserInfo = { ...userInfo, serviceArea: value };

      await setDoc(doc(db, "userInfo", userInfo.uid), {
        ...updatedUserInfo,
      });

      dispatch(userActions.setUserInfo(updatedUserInfo));

      console.log("Service area saved successfully.");
      navigate(`/profile-page/${userInfo.userName}`);

    } catch (error) {
      console.error("Error saving service area:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCoordinates = async (zipCode) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&country=US&format=json`
      );
      const data = await response.json();
      if (data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
    return { lat: 40.7128, lng: -74.006 };
  };

  useEffect(() => {
    const initMap = async () => {
      setMapLoading(true);
      const coordinates = await fetchCoordinates(userInfo.zipCode || "");

      const map = new window.google.maps.Map(mapRef.current, {
        center: coordinates,
        zoom: 10,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.BOTTOM_CENTER,
        },
        mapTypeControl: false,
        fullscreenControl: false,
      });

      const drawingManager = new window.google.maps.drawing.DrawingManager({
        drawingMode: window.google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,

        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [window.google.maps.drawing.OverlayType.POLYLINE],
        },
        polygonOptions: {
          fillColor: "#00ff00",
          fillOpacity: 0.5,
          strokeWeight: 5,
          clickable: false,
          editable: true,
          zIndex: 1,
        },
      });

      drawingManager.setMap(map);

      window.google.maps.event.addListener(
        drawingManager,
        "polylinecomplete",
        (polyline) => {
          const path = polyline
            .getPath()
            .getArray()
            .map((latLng) => latLng.toJSON());
          const polylineData = {
            type: "polyline",
            path: path,
          };
          setValue(polylineData);
        }
      );
      setMapLoading(false);
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=drawing`;
    script.async = true;
    script.onload = initMap;
    script.onerror = () => {
      console.error("Google Maps script failed to load.");
      setMapLoading(false);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [userInfo.zipCode]);

  return (
    <>
      <Navbar />
      <MapContainer>
        <h3>Draw your area</h3>

        {maploading ? (
          <div className="loader-container">
            <CircularProgress
              style={{ color: "var(--primary-color)" }}
              size={30}
            />
          </div>
        ) : null}

        <div ref={mapRef} className="map-container" />

        <div className="save-area-btn">
          <LoadingButton
            onClick={handleSave}
            loading={loading}
            type="submit"
            title={"Save Area"}
          />
        </div>
      </MapContainer>
      <Footer />
    </>
  );
};

export default Map;

const MapContainer = styled.div`
  min-height: var(--section-height);
  margin: var(--section-margin) auto;
  width: 90%;
  h3 {
    text-align: center;
    margin-bottom: var(--section-margin);
  }

  .loader-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .map-container {
    width: 100%;
    height: 500px;
    border-radius: var(--l-radius);
  }
  .save-area-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;

    .loader-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
`;
