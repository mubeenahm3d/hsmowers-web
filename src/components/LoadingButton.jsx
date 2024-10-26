import { CircularProgress, useMediaQuery } from "@mui/material";
// import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

export default function LoadingButton({ loading, title, ...params }) {
    const mediaQuery600 = useMediaQuery("(max-width: 600px)");
  return (
    <StyledButton
      // whileTap={{ scale: 0.8 }}
      // transition={{
      //   type: "spring",
      //   duration: 0.2,
      //   stiffness: 400,
      //   damping: 17,
      // }}
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
        title
      )}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;
