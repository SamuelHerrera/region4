var async = require('asyncawait/async');
var await = require('asyncawait/await');
var fs = require('fs');
var pdf = require('html-pdf');
var base64 = require('node-base64-image');
var path = require('path');

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

exports.recordReference = async (function (req, res, next) {
  if (!req.body) {
    return res.status(400).json({
      status: 400,
      message: "Yals ID deberia existir"
    });
  }
  try {
    var data = await (Service.recordReference(req.body.yalsid, req.body.pagofacilid, req.body.cupon));
    if (data) {
      return res.status(200).json({
        status: 200,
        data: data,
        message: "Succesfully added yals reference"
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Error procesando referencia de Yals"
      });
    }
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
  try {
    var pdfname = `Reporte-${new Date().getTime()}.pdf`;

    var temp_dir = path.join(process.cwd(), 'temp/');
    if (!fs.existsSync(temp_dir)) {
      console.log("searching:" + temp_dir)
      fs.mkdirSync(temp_dir);
      console.log("created");
    }

    var filepath = path.join(process.cwd(), 'temp/', pdfname);
    console.log("FILEPATH:" + filepath);

    fs.writeFile(filepath, req.body.file, {
      encoding: 'base64'
    }, function (err) {
      if (err) return console.log(err);
      //console.log("im here!:" + filepath);
      var file = fs.readFileSync(filepath);
      // console.log("file passed!!!");
      var attch = new mailgun.Attachment({
        data: file,
        filename: "Reporte.pdf"
      });
      // console.log("ATTACH CREATED");

      var data = {
        from: "Valor Inmuebles <" + ('ventas@valorinmuebles.com') + ">",
        to: req.body.to,
        subject: 'Reporte',
        text: req.body.text || 'Envio de reporte',
        html: req.body.html || '',
        attachment: attch
      };
      console.log("DATA CREATED");

      mailgun.messages().send(data, function (error, body) {
        console.log("error:" + error);
        console.log("body" + body);
        try {
          fs.unlinkSync(filepath);
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
