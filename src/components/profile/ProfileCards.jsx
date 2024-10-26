import React from "react";
import styled from "styled-components";
import ProfileCard from "./ProfileCard";

export default function ProfileCards() {
  const profilesData = [
    {
      profileImg: "https://picsum.photos/200",
      name: "Brandon Peter",
      grade: "Freshman",
      city: "Chicago",
      stateAbb: "IL",
      services: {
        mowing: "$25 per hours",
        edging: "$25/hr",
      },
    },
    {
      profileImg: "https://picsum.photos/200",
      name: "Brandon Peter",
      grade: "Freshman",
      city: "Chicago",
      stateAbb: "IL",
      services: {
        mowing: "$25 per hours",
        edging: "$25/hr",
      },
    },
    {
      profileImg: "https://picsum.photos/200",
      name: "Brandon Peter",
      grade: "Freshman",
      city: "Chicago",
      stateAbb: "IL",
      services: {
        mowing: "$25 per hours",
        edging: "$25/hr",
      },
    },
  ];
  return (
    <StyledProfileCards>
      {profilesData.map((profile) => (
        <ProfileCard profileData={profile} />
      ))}
    </StyledProfileCards>
  );
}

const StyledProfileCards = styled.section`
display: flex;
align-items: center;
justify-content: space-between;
gap: 1.4rem;
flex-wrap: wrap;
@media (max-width: 690px) {
    justify-content: center;
}
`;
