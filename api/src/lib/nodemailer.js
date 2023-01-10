const nodeMailer = require("nodemailer");
const connection = require("../database");
const jwt = require("jsonwebtoken");
const emailFormat = require("./emailFormat");

const Email = {};

Email.Send = async (req, res) => {
  let transporter = nodeMailer.createTransport({
    service: "outlook",
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASS,
    },
  });

  //creating the user token
  const { email } = req.body;

  const user = await connection.query("select * from user where email = ?", [
    email,
  ]);
  const payload = {
    email: user[0].email,
    id: user[0].iduser,
  };
  const token = jwt.sign(payload, process.env.EMAIL_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const link = `${process.env.RECOVER_LINK_DOMAIN}/reset/${token}`;

  let emailOptions = {
    from: process.env.MAILER_EMAIL,
    to: req.body.email,
    subject: "Account Recover",
    html: emailFormat(link),
  };
  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      return res.status(400).json({
        status: false,
        statusText: "Something wen't wrong.",
        err,
      });
    } else {
      res.json({
        status: true,
        statusText: "An email with instructions has been sent",
      });
    }
  });
};

module.exports = Email;
