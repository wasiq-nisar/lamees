const nodeMailer = require('nodemailer')
const EmailModel = require('../models/EmailModel')
require("dotenv").config()
const { google } = require('googleapis');

const SenderEmail = process.env.SENDER_EMAIL;

// oAuth2Client
// const oAuth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URI
// );

// // Set the refresh token
// oAuth2Client.setCredentials({
//   refresh_token: process.env.REFRESH_TOKEN,
// })

const _sendEmail = async(emailDetails) => {
  try {
    // const accessTokenResponse = await oAuth2Client.getAccessToken();
    // const accessToken = accessTokenResponse?.token
    // console.log("accessToken: ", accessToken)

    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAUTH2',
        user: SenderEmail,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN, 
        accessToken: process.env.ACCESS_TOKEN,
      }
    })
  
    const newEmail = new EmailModel({
      senderEmail: SenderEmail,
      receiverEmail: 'wasiq.nisar12@gmail.com',
      subjectEmail: emailDetails.subject,
      bodyEmail: emailDetails.text
    })
    console.log('Email saved to the database')

    const info = await transporter.sendMail({
      from: SenderEmail,  // Corrected the 'from' field
      to: 'wasiq.nisar12@gmail.com',
      subject: emailDetails.subject,
      text: emailDetails.text,
    })

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

const sendEmail = async(req, res) => {
  try {
    await _sendEmail(req.body)
    res.status(200).send('Email sent successfully')
  } catch(error) {
    console.error("Error sending email:", error)
    res.status(500).send('Error sending email')
  }
}

module.exports = {sendEmail}
