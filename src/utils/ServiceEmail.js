import firebaseApi from "./firebaseApi";
import { alertActions } from "../store/alertSlice";

export const ServiceEmail = async (
  senderEmail,
  recipientEmail,
  message,
  number,
  setLoading,
  dispatch,
  backdropHandler
) => {
  setLoading(true);
  try {
    const response = await firebaseApi.post("/sendEmailOnRequest", {
      senderEmail: senderEmail,
      recipientEmail: recipientEmail,
      message: message,
      number: number,
    });

    if (response.data.success) {
      dispatch(
        alertActions.setAlert({
          messageType: "success",
          title: "Email sent successfully!",
        })
      );
      backdropHandler(false);
      return { success: true };
    } else {
      dispatch(
        alertActions.setAlert({
          messageType: "error",
          title: "Failed to send email!",
        })
      );
      return { success: false };
    }
  } catch (error) {
    console.error("Error sending email:", error);
    dispatch(
      alertActions.setAlert({
        messageType: "error",
        title: "Error occurred while sending email.",
      })
    );
    return { success: false };
  } finally {
    setLoading(false);
  }
};

