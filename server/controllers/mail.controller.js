var async = require('asyncawait/async');
var await = require('asyncawait/await');
var nodemailer = require('nodemailer');

var mailgun = require('mailgun.js');
var mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || 'key-02b06c51f11de490dbad81b5b63e6da8'
});

_this = this; //clientid, yals_request, cuponid

exports.sendMail = async (function (req, res, next) {
  try {
    let msg = {
      from: "Valor Inmuebles <" + (req.body.from || 'ventas@valorinmuebles.com') + ">",
      to: [req.body.to],
      subject: req.body.subject || '',
      text: req.body.text || '',
      html: req.body.html || ''
    }
    console.log('here')
    mg.messages.create('valorinmuebles.com.mx', msg)
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.log(err)); // logs any error

    return res.status(200).json({
      status: 200,
      data: true,
      message: "Succesfully generated mail"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "Error enviando mail: " + e
    });
  }
});
