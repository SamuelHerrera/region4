var async = require('asyncawait/async');
var await = require('asyncawait/await');

var Service = require('../services/yals.service');

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
