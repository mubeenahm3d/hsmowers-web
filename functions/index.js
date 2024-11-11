const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Resend } = require("resend");

admin.initializeApp();

const resendClient = new Resend("re_awpTm59S_41WKFGVtUMnbno5gXH4zpUEY");

exports.sendWelcomeEmailOnLogin = functions.https.onRequest(
  async (req, res) => {
    const email = req.body.email;
    console.log("Function triggered for email:", email);

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
      res.status(200).send({ success: true, response });
    } catch (error) {
      console.error("Error sending welcome email:", error);
      res.status(500).send({ success: false, error: error.message });
    }
  }
);

