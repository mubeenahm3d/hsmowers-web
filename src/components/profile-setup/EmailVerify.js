import React from "react";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import styled from "styled-components";
import LoadingButton from "../LoadingButton";
import { useNavigate } from "react-router";

export default function EmailVerify() {
  const navigate = useNavigate();

  return (
    <StyledEmailVerify>
      <div className="i">
        <MarkEmailReadOutlinedIcon htmlColor="var(--primary-color)" fontSize="large" />
      </div>
      <h3>Email Verification</h3>
      <p>
        A verification link has been sent to your provided email address. Please
        click the link to verify and login.
      </p>
      <LoadingButton onClick={() => navigate("/login")}>Login</LoadingButton>
    </StyledEmailVerify>
  )
}

const StyledEmailVerify = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  height: 370px;
  h3{
    font-weight: 500;
  }
  p{
    max-width: 45ch;
    text-align: center;
  }
  svg{
    width: 80px;
    height: 80px;
  }
`;
