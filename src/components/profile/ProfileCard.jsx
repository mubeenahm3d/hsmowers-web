import React from "react";
import styled from "styled-components";

export default function ProfileCard({ profileData }) {
  const { profileImg, name, grade, city, stateAbb, services } = profileData;
  return (
    <StyledProfileCard>
      <div className="info">
        <div className="pic">
          <img src={profileImg} alt="" />
        </div>
        <div className="info-text">
          <h4>{name.split(" ")[0] + " " + name.split(" ")[1][0]}.</h4>
          <h5>{grade}</h5>
          <p>
            {city},{" " + stateAbb}
          </p>
        </div>
      </div>
      <div className="services">
        {Object.entries(services).map(([service, rate]) => (
          <p>{service}</p>
        ))}
      </div>
    </StyledProfileCard>
  );
}

const StyledProfileCard = styled.section`
  width: 230px;
  min-height: 220px;
  border-radius: var(--l-radius);
  /* border: 2px solid var(--primary-color); */
  box-shadow: 0px 0px 4px 2px var(--shadow-light);
  transition: transform 0.15s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.04);
  }
  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 6px 10px;
    border-bottom: 2px solid var(--primary-color);
    .pic {
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .info-text {
      flex-grow: 1;
      h5 {
        line-height: 1;
        color: var(--text-light-color);
      }
    }
  }
  .services {
    padding: 6px 10px;
  }
`;
