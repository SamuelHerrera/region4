var async = require('asyncawait/async');
var await = require('asyncawait/await');
var nodemailer = require('nodemailer');
var fs = require('fs');
var path = require('path');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'region4mid@gmail.com',
    pass: 'D3v3l0p.'
  }
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

_this = this; //clientid, yals_request, cuponid

exports.sendMail = async (function (req, res, next) {
  try {
    var mailOptions = {};
    var filepath = "";
    if (req.files) {
      var file = req.files;
      console.log(file[0].originalname)
      fs.writeFile(uploaddir + file[0].originalname, file[0].buffer, function (err) {});
      filepath = path.join(uploaddir, file[0].originalname);
      console.log(filepath);
      mailOptions = {
        from: 'activation@itexsolutions.com.mx',
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
        html: req.body.html,
        attachments: [{
          filename: file[0].originalname,
          streamSource: fs.createReadStream(filepath)
        }]
      };
    } else {
      mailOptions = {
        from: 'activation@itexsolutions.com.mx',
        to: req.body.to,
        subject: req.body.subject,
        html: req.body.html,
        text: req.body.text,
      };
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        if (req.files) {
          fs.unlinkSync(filePath);
        }
      }
    });

    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully generated report"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "Error generando reporte: " + e
    });
  }
});
