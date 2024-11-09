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
        html: `<p>Hi,</p><p>Welcome back to our platform! We're happy to have you with us again.</p><p>Best Regards,<br>hsmowers</p>`,
      });

      console.log("Welcome email sent to:", email);
      res.status(200).send({ success: true, response });
    } catch (error) {
      console.error("Error sending welcome email:", error);
      res.status(500).send({ success: false, error: error.message });
    }
  }
);
