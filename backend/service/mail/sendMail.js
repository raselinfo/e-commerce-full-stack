const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const {
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  REDIRECT_URL,
} = require("../../config/index");

// Todo: Configure Google Api
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

/**
 * // Todo: Send Mail Function
 * @param {{to,subject,text,html}} Object 
 * @returns Object Result
 */
const sendMail = async ({
  to,
  subject = "Email Verification",
  text = "Email Verification",
  html,
}) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAUTH2",
        user: "raselhossainy52@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOption = {
      from: "RaselFashion.👒 <raselhossainy52@gmail.com>",
      to: to,
      subject: subject,
      text: text,
      html: html,
    };

    return await transport.sendMail(mailOption);
  } catch (err) {
    return err;
  }
};

module.exports = sendMail;
