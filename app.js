let express = require("express");
let bodyParser = require("body-parser");
let request = require("request");
var cors = require("cors");
let AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
let app = express();

function sendMail(msg) {
  // Create the promise and SES service object
  return new AWS.SES({ apiVersion: "2010-12-01" })
    .sendTemplatedEmail(params)
    .promise()
    .then(() => console.log("Mail sent successfully"))
    .catch(error => console.error(error.toString()));
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.options("/submit", cors());
app.post("/submit", cors(), function(req, res) {
  // g-recaptcha-response is the key that browser will generate upon form submit.
  // if its blank or null means user has not selected the captcha, so return the error.
  if (
    req.body["g-recaptcha-response"] === undefined ||
    req.body["g-recaptcha-response"] === "" ||
    req.body["g-recaptcha-response"] === null
  ) {
    return res.json({ responseCode: 1, responseDesc: "Please select captcha" });
  }

  // req.connection.remoteAddress will provide IP address of connected user.
  var verificationUrl =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    process.env.CAPTCHA_SECRET_KEY +
    "&response=" +
    req.body["g-recaptcha-response"] +
    "&remoteip=" +
    req.connection.remoteAddress;

  // Hitting GET request to the URL, Google will respond with success or error scenario.
  request(verificationUrl, async function(error, response, body) {
    body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
    if (body.success !== undefined && !body.success) {
      return res.json({
        responseCode: 1,
        responseDesc: "Failed captcha verification"
      });
    }
    delete req.body["g-recaptcha-response"];
    var msg = {
      Source: process.env.MAIL_ACCOUNT,
      Template: process.env.TEMPLATE_ID,
      ConfigurationSetName: "ConfigSet",
      Destination: {
        ToAddresses: [process.env.MAIL_ACCOUNT]
      },
      TemplateData: req.body
    };
    await sendMail(msg);
    res.json({ responseCode: 0, responseDesc: "Sucess" });
  });
});

// This will handle 404 requests.
app.use("*", function(req, res) {
  res.status(404).send("404");
});

// lifting the app on port 3000.
app.listen(3000);
