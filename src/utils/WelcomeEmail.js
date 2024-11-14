import firebaseApi from "./firebaseApi";

const WelcomeEmail = async (user) => {
  console.log("Sending welcome email to:", user.email);

  try {
    const response = await firebaseApi.post("/sendWelcomeEmailOnLogin", {
      email: user.email,
    });
    const data = response.data;
    console.log("Result:", data);

    if (data.success) {
      console.log("Welcome email sent successfully");
    } else {
      console.log("Failed to send email", data.error);
    }
  } catch (error) {
    console.error("Error triggering welcome email:", error);
  }
};

export default WelcomeEmail;
