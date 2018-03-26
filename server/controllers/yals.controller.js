var async = require('asyncawait/async');
var await = require('asyncawait/await');
var fs = require('fs');
var pdf = require('html-pdf');
var base64 = require('node-base64-image');

var Service = require('../services/yals.service');

var mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY || 'key-02b06c51f11de490dbad81b5b63e6da8',
  domain: 'valorinmuebles.com.mx'
});

var options = {
  format: 'Letter'
};

_this = this; //clientid, yals_request, cuponid

exports.getSettings = async (function (req, res, next) {
  try {
    var data = await (Service.getSettings());
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully settings Recieved"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
});

exports.setSettings = async (function (req, res, next) {
  try {
    var data = await (Service.setSettings(req.body.url, req.body.mail, req.body.key));
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully saved settings"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "Error guardando config.: " + e
    });
  }
});

exports.getReport = async (function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;
  var query = req.query ? req.query : {};
  try {
    var data = await (Service.getReport(query, page, limit));
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully Client Recieved"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
});

exports.getImageFromUrlAsBase64 = async (function (req, res, next) {
  var query = req.query ? req.query : {};
  try {
    var response = await (new Promise(function (resolve, reject) {
      base64.encode(req.body.url, {
        string: true
      }, function (error, response) {
        if (!error) {
          resolve(response);
        } else {
          reject(error);
        }
      });
    }));
    return res.status(200).json({
      status: 200,
      data: response,
      message: "Succesfully image converted"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e
    });
  }
});


exports.sendReport = async (function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;
  var query = req.query ? req.query : {};
  var mail = query.email;
  delete query.email;
  try {
    var data = await (Service.getReport(query, page, limit));
    var pdfname = `Reporte-${new Date().getTime()}.pdf`;
    pdf.create(`<html>${data.docs[0]}</html>`, options).toFile('./temp/' + pdfname, function (err, res) {
      if (err) return console.log(err);
      //console.log(res);
      var file = fs.readFileSync('./temp/' + pdfname);
      var attch = new mailgun.Attachment({
        data: file,
        filename: "Reporte.pdf"
      });
      var data = {
        from: "Valor Inmuebles <" + ('ventas@valorinmuebles.com') + ">",
        to: mail,
        subject: 'Reporte',
        text: 'Envio de reporte',
        attachment: attch
      };

      mailgun.messages().send(data, function (error, body) {
        //console.log(body);
        try {
          fs.unlinkSync('./temp/' + pdfname);
        } catch (e) {}

      });

    });

    return res.status(200).json({
      status: 200,
      data: true,
      message: "Succesfully Sent mail"
    });

  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
});

exports.createReport = async (function (req, res, next) {
  try {
    var data = await (Service.createReport(req.body.clientid, req.body.yals_request, req.body.cuponid));
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
