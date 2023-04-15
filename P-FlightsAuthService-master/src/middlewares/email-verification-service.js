const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { EMAIL_USERNAME, PASSWORD } = require("../config/serverConfig");

const emailVerificationSender = (req, res, next) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USERNAME,
        pass: PASSWORD,
      },
    });

    const token = jwt.sign(
      {
        key: "Verified",
        email: req.body.email,
      },
      "ourSecretKey",
      { expiresIn: "10m" }
    );

    const mailConfigurations = {
      // It should be a string of sender/server email
      from: "netguapor@gmail.com",

      to: req.body.email,

      // Subject of Email
      subject: "Email Verification",

      // This would be the text of email body
      text: `Thank you for signing up for our service! We just wanted to confirm your email address to ensure that we have the correct information on file.

      To complete the verification process, please click on the following link:
      
      https://pflightsauthservice.onrender.com/authservice/api/v1/verify/${token} 

      
      If you did not sign up for our service, please disregard this email.
      
      Thank you for your cooperation, and please do not hesitate to reach out to us if you have any questions or concerns.
      Best regards,
      Team 212
      `,
    };

    transporter.sendMail(mailConfigurations, function (error, info) {
      if (error) throw Error(error);
      console.log("Email Sent Successfully");
    });
    next();
  } catch (error) {
    console.log("Something went wrong in Email Sender Service");
    throw error;
  }
};

module.exports = {
  emailVerificationSender,
};
