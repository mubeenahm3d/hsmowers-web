import { Button, styled } from "@mui/material";
import React from "react";

export default function ButtonIcon({
  children,
  filled = false,
  outlined = false,
  ...props
}) {
  return (
    <StyledButton filled={filled} outlined={outlined} {...props}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled(Button)`
  padding: 0;
  min-width: 40px;
  width: 40px;
  height: 40px;
  max-height: 40px;
  border-radius: 50px;
  border: 1px solid white;
  border-width: ${(props) => (props.outlined ? "1px" : 0)};
  background-color: ${(props) =>
    props.filled ? "var(--primary-color)" : "rgba(255, 255,255, 0.4)"};
  &:hover {
    background-color: ${(props) =>
      props.filled ? "var(--primary-dark-color)" : "rgba(255, 255,255, 0.4)"};
  }
`;
