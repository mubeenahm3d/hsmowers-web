import { CircularProgress, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

export default function LoadingButton({
  children,
  loading = false,
  ...params
}) {
  const mediaQuery600 = useMediaQuery("(max-width: 600px)");
  return (
    <StyledButton
      whileTap={{ scale: 0.8 }}
      transition={{
        type: "spring",
        duration: 0.2,
        stiffness: 400,
        damping: 17,
      }}
      disabled={loading}
      {...params}
    >
      {loading ? (
        <CircularProgress
          style={{
            color: "inherit",
            width: mediaQuery600 ? 18 : 20,
            height: mediaQuery600 ? 18 : 20,
          }}
        />
      ) : (
        children
      )}
    </StyledButton>
  );
}

const StyledButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 38px;
  padding: 8px 20px;
  border-radius: 50px;
  color: var(--text-base-color);
  background-color: var(--primary-color);
  &:hover {
    background-color: var(--primary-dark-color);
  }
  &.white {
    background-color: white;
    color: var(--primary-color);
    &:hover {
      background-color: white;
    }
  }
`;
