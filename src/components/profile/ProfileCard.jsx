import React from "react";
import styled from "styled-components";
import ProfileImg from "../../assets/profilesvg.svg";
import { useNavigate } from "react-router-dom";
import profileBgImg from "../../assets/profile-grass.png";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

export default function ProfileCard({ profileData }) {
  const {
    photoURL,
    displayName,
    grade,
    city,
    stateAbb,
    services,
    userName,
    schoolName,
  } = profileData;
  const navigate = useNavigate();

  const fullName = displayName || "";
  const [firstName, lastName] = fullName ? fullName.split(" ") : ["", ""];

  const carduserName = lastName
    ? `${firstName} ${lastName.charAt(0)}.`
    : firstName || "Guest";

  const handleCardClick = () => {
    navigate(`/p/${userName}`);
  };

  return (
    <StyledProfileCard onClick={handleCardClick}>
      <div className="info">
        <div className="pic">
          <img className="bg-img" src={profileBgImg} alt={displayName} />
          <img
            className="profile-img"
            src={photoURL || ProfileImg}
            alt="Profile"
          />
        </div>
        <div className="info-text">
          <h4>{carduserName}</h4>
          <div className="edu">
            <span>
              <MenuBookOutlinedIcon />
              {Number(grade) === 9
                ? "Fresherman"
                : Number(grade) === 10
                ? "Sophomore"
                : Number(grade) === 11
                ? "Junior"
                : Number(grade) === 12
                ? "Senior"
                : null}
            </span>
            <div className="dot" />
            <span>{schoolName}</span>
          </div>
        </div>
      </div>
      <div className="services">
        {Array.isArray(services) && services.length > 0 ? (
          services.map((service, index) => (
            <p key={index}>
              <CheckCircleOutlinedIcon htmlColor="var(--primary-color)" />
              {service.split("-")[0].charAt(0).toUpperCase() +
                service.split("-")[0].slice(1)}{" "}
              {service.split("-")[1]
                ? service.split("-")[1].charAt(0)?.toUpperCase() +
                  service.split("-")[1].slice(1)
                : ""}
            </p>
          ))
        ) : (
          <p>Services Not Available</p>
        )}
      </div>
    </StyledProfileCard>
  );
}

const StyledProfileCard = styled.section`
  width: 300px;
  min-height: 300px;
  border-radius: var(--l-radius);
  box-shadow: 0px 0px 4px 2px var(--shadow-light);
  transition: transform 0.15s ease-in-out;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    transform: scale(1.02);
  }
  .info-text,
  .services {
    padding: 0 20px;
  }
  .info {
    /* display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between; */
    .pic {
      width: 100%;
      height: 30%;
      position: relative;
      .profile-img {
        width: 60px;
        height: 60px;
        overflow: hidden;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
      }
      .bg-img {
        width: 100%;
        opacity: 30%;
      }
    }
    .info-text {
      .edu {
        display: flex;
        align-items: center;
        gap: 6px;
        margin: 10px 0;
        span {
          line-height: 1;
          color: var(--text-gray-color);
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 300;
          font-size: 14px;
        }
        .dot {
          width: 7px;
          height: 7px;
          background: var(--text-gray-color);
          border-radius: 50px;
        }
      }
    }
  }
  .services {
    p {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--text-color);
      margin: 6px 0;
      svg {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;
