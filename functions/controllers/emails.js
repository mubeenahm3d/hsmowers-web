const { Resend } = require("resend");
const admin = require("firebase-admin");

const resendClient = new Resend("re_awpTm59S_41WKFGVtUMnbno5gXH4zpUEY");

const sendWelcomeEmail = async (email) => {
  console.log("Sending welcome email to:", email);

  try {
    const response = await resendClient.emails.send({
      from: "noreply@highschoolmowers.com",
      to: email,
      subject: "Welcome Back to Our Platform!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <img src="https://i.ibb.co/qFVj5sk/High-School-Mowers.png" alt="" style="width: 180px; height: auto; display: block; margin: 0 auto;"/>
          <h2 style="color: #4CAF50; text-align: center;">Welcome Back!</h2>
          <p style="font-size: 16px; color: #333;">Hi,</p>
          <p style="font-size: 16px; color: #333;">Welcome to HighSchoolMowers! We're thrilled to have you on board. Our
          platform is designed to make lawn care easier and more efficient,
          helping you find the perfect solutions for your needs. Let's get
          started!</p>
          <p style="font-size: 16px; color: #333;">Best Regards,<br><strong>High School Mowers Team</strong></p>
          <hr style="border: 0; height: 1px; background-color: #e0e0e0;">
          <p style="font-size: 12px; color: #999; text-align: center;">You’re receiving this email because you’ve logged back into your account.</p>
        </div>
      `,
    });

    console.log("Welcome email sent to:", email);
    return { success: true, response };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { success: false, error: error.message };
  }
};


const serviceEmail = async (
  senderEmail,
  recipientEmail,
  message,
  number
) => {
  console.log("Sending email from", "to", recipientEmail);

  try {
    const response = await resendClient.emails.send({
      from: "noreply@highschoolmowers.com",
      to: recipientEmail,
      subject: "Request for Service ",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <img src="https://firebasestorage.googleapis.com/v0/b/hs-mowers-cb290.appspot.com/o/assets%2FemailLogo.webp?alt=media&token=597335b9-595b-41ed-a1fe-f2e8413b8d6b" alt="" style="width: 140px; height: auto; display: block; margin: 0 auto; border-radius: 8px;"/>
          <h2 style="color: #4CAF50; text-align: center;">Service Request</h2>
           <p style="font-size: 16px; color: #333;">The user has requested your service. Please check out their message and contact details.</p>
          <p style="font-size: 16px; color: #333; font-weight: bold;">Message</p>
          <p style="font-size: 16px; color: #333;">${message}</p>

           ${
             number
               ? `<p style="font-size: 16px; color: #333; font-weight: bold;">Phone Number</p>
                  <p style="font-size: 16px; color: #333;">${number}</p>
               `
               : ""
           }
          ${
            senderEmail
              ? `<p style="font-size: 16px; color: #333; font-weight: bold;">Email</p>
                  <p style="font-size: 16px; color: #333;">${senderEmail}</p>`
              : ""
          }
          <hr style="border: 0; height: 1px; background-color: #e0e0e0;">
          <p style="font-size: 12px; color: #999; text-align: center;">You’re receiving this email because customer requests you a service.</p>
        </div>
      `,
    });

    console.log("Email sent successfully:", response);
    return { success: true, response };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};


module.exports = { sendWelcomeEmail, serviceEmail };


