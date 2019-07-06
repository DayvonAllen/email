const express = require("express");
const cors = require("cors");
const nodemailer = require('nodemailer');
const app = express();
require('dotenv').config();


app.use(cors());
app.use(express.json());

let user = process.env.EMAIL;
let email = "";
let mailOptions = {};
let mailOptions2 = {};

const PORT = process.env.PORT || 3000;


//allows for cors
app.use(cors())
app.use(express.json());


app.post('/postData', (req, res) => {
//grab data and inserts into the variable
  let data = req.body
  email = data.email;

  console.log(data)
  //transporter for node mailer
  let transporter = nodemailer.createTransport({
    host: 'dnadevelopers.live',
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: process.env.PASSWORD
    }
  });

  //customer mail options

  mailOptions = {
    from: user,
    to: email,
    subject: `We've received your Email`,
    text: `thank you for reaching out to us. We will add you to the mailing list.`
  }

//   company mail options
  mailOptions2 = {
    from: user,
    to: user,
    subject: `An inquiry has been made!`,
    text: `Email: ${email}`
  }

  //sends email to the customer
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err + ' \nAn error has occurred')

    } else {
      console.log('Successfully sent email!')
    }
  });

  //sends email to company
  transporter.sendMail(mailOptions2, (err, data) => {
    if (err) {
      console.log(err + '\nAn error has occurred')
    } else {
      console.log('Successfully sent email!')
    }
  });

  //ends the connection
  res.end()

});



app.listen(PORT, () => {
    console.log('connected')
})