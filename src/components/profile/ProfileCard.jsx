import React from "react";
import styled from "styled-components";
import ProfileImg from '../../assets/profilesvg.svg'
import { useNavigate } from "react-router-dom";


export default function ProfileCard({ profileData }) {
  const { photoURL, displayName, grade, city, stateAbb, services, userName } = profileData; ;
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
          <img src={photoURL || ProfileImg} alt="Profile" />
        </div>
        <div className="info-text">
          <h4>{carduserName}</h4>
          <h5>
            {Number(grade) === 9
              ? "Fresherman"
              : Number(grade) === 10
              ? "Sophomore"
              : Number(grade) === 11
              ? "Junior"
              : Number(grade) === 12
              ? "Senior"
              : null}
          </h5>
        </div>
      </div>
      <div className="services">
        {Array.isArray(services) && services.length > 0 ? (
          services.map((service, index) => <p key={index}>{service}</p>)
        ) : (
          <p>Services Not Available</p>
        )}
      </div>
    </StyledProfileCard>
  );
}

const StyledProfileCard = styled.section`
  min-width: 250px;
  min-height: 220px;
  border-radius: var(--l-radius);
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
        width: 60px; 
        height: 60px;
        overflow: hidden; 
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
