import { Backdrop, Fade, Modal } from "@mui/material";
import styled from "styled-components";

function BackdropWrapper({ open, smallSize, element, backdropHandler }) {
  return (
    <Modal
      sx={{
        overflow: "hidden",
        scrollbarWidth: "none",
        position: "fixed",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      disableScrollLock
      open={open}
      onClose={backdropHandler}
      slots={{ backdrop: StyledBackdrop }}
      closeAfterTransition
    >
      <Fade in={open}>
        <StyledWrapper smallSize={smallSize}>{element}</StyledWrapper>
      </Fade>
    </Modal>
  );
}

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;
`;

const StyledWrapper = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
  min-width: ${(props) => (props.smallSize ? "35%" : "55%")};
  max-width: 60%;
  min-height: 25%;
  max-height: 95%;
  background-color: white;
  padding: 10px 20px 20px;
  border-radius: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  h4 {
    display: flex;
    align-items: center;
    cursor: pointer;
    span {
      font-size: 1.8rem;
      font-weight: inherit;
      color: var(--secondary-dark-color);
    }
  }
  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
  }
  overflow-y: scroll;
  @media (max-width: 850px) {
    min-width: 100%;
    max-height: 90%;
  }
  @media (min-width: 850px) and (max-width: 1150px) {
    min-width: 80%;
    max-height: 90%;
  }
`;

export default BackdropWrapper;
