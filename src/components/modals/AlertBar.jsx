import React from "react";
import { Snackbar, Alert, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { alertActions } from "../../store/alertSlice";
import styled from "@emotion/styled";

function AlertBar({ alertStates }) {
  const { alertState, message } = alertStates;
  const dispatch = useDispatch();
  // const mediaQuery = useMediaQuery("(max-width: 600px)")
  const handleClose = () => {
    dispatch(alertActions.closeAlert());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={alertState}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <StyledAlert>
        <Alert
          // style={{
          //   backgroundColor: "#424242",
          //   color: "white",
          //   boxShadow: "1px 1px 4px gray",
          // }}
          onClose={handleClose}
          severity={message.messageType || "info"}
          sx={{ width: "100%" }}
        >
          {message.title}
        </Alert>
      </StyledAlert>
    </Snackbar>
  );
}

const StyledAlert = styled.div`
  button {
    min-width: 60px;
    svg {
      width: 16px;
      height: 16px;
    }
  }
  .MuiAlert-action{
    padding: 4px 0 0;
  }
`;

export default AlertBar;
