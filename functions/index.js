const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { sendWelcomeEmail } = require("./controllers/emails.js"); 
const { serviceEmail } = require("./controllers/emails.js"); 

admin.initializeApp();

exports.sendWelcomeEmailOnLogin = functions.https.onRequest(
  async (req, res) => {
    const email = req.body.email;
    console.log("Function triggered for email:", email);

    const result = await sendWelcomeEmail(email);

    if (result.success) {
      res.status(200).send({ success: true, response: result.response });
    } else {
      res.status(500).send({ success: false, error: result.error });
    }
  }
);



exports.sendEmailOnRequest = functions.https.onRequest(async (req, res) => {
  const { senderEmail, recipientEmail, message, number } =
    req.body;

  console.log(
    "Function triggered for sender:",
    senderEmail,
    "recipient:",
    recipientEmail
  );

  console.log("Request body received:", req.body);
  console.log("PhoneNumber received:", number);


  const result = await serviceEmail(
    senderEmail,
    recipientEmail,
    message,
    number
  );

  if (result.success) {
    res.status(200).send({ success: true, response: result.response });
  } else {
    res.status(500).send({ success: false, error: result.error });
  }
});