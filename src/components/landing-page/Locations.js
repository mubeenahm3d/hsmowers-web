import React from "react";
import styled from "styled-components";
import locationImg from "../../assets/landing-page/booking-guide.png";
import LoadingButton from "../LoadingButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const Locations = () => {
  const locations = [
    { city: "Manhattan, NY", img: locationImg },
    { city: "Los Angeles, CA", img: locationImg },
    { city: "Chicago, IL", img: locationImg },
    { city: "Boston, MA", img: locationImg },
    { city: "Philadelphia, PA", img: locationImg },
    { city: "Detroit, MI", img: locationImg },
  ];

  return (
    <StyledLocations>
      <div className="top">
        <h3>Lawn Care Services Near You</h3>
        <p>
          We're here to provide top-notch lawn care services in neighborhoods
          near you. Check out our service areas below!
        </p>
        <LoadingButton>
          Find a Mower Now <ArrowForwardIcon fontSize="small" />
        </LoadingButton>
      </div>
      <div className="locations-grid">
        {locations.map((location, index) => (
          <div className="location-card" key={index}>
            <img src={location.img} alt={location.city} />

            <h5 className="tag">
              <LocationOnOutlinedIcon fontSize="small" htmlColor="var(--primary-color)" />
              {location.city}
            </h5>
          </div>
        ))}
      </div>
    </StyledLocations>
  );
};

const StyledLocations = styled.div`
  width: var(--section-width);
  margin: var(--section-margin) auto;
  .top {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: var(--heading-gap);
    margin-bottom: 50px;
    p {
      max-width: 55ch;
    }
  }

  .locations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
    justify-items: center;
  }

  .location-card {
    overflow: hidden;
    position: relative;
    max-width: 100%;
  }

  img {
    width: 100%;
    aspect-ratio: 4/3.2;
    object-fit: cover;
    border-radius: 12px;
  }

  .tag {
    position: absolute;
    bottom: 10px;
    left: 10px;
    background-color: white;
    color: var(--text);
    padding: 8px 12px;
    border-radius: 5px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default Locations;
