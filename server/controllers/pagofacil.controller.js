var async = require('asyncawait/async');
var await = require('asyncawait/await');

var Service = require('../services/pagofacil.service');

_this = this;

exports.getPago = async (function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;
  try {
    var data = await (Service.getPago({}, page, limit));
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully Pagofacil Recieved"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
});

exports.createPago = async (function (req, res, next) {
  try {
    var data = await (Service.createPago(req.body.clientid, req.body.pagofacil_request));
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully generated pagofacil"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "Error generando transaccion pagofacil: " + e
    });
  }
});

exports.createPagoPayPal = async (function (req, res, next) {
  Service._paypal.returnUrl = req.headers.host + "/execute";
  Service._paypal.returnUrl = req.headers.host + "/cancel";
  try {
    var data = await (Service.createPagoPayPal(req.body.clientid));
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully generated pagofacil"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "Error generando transaccion pagofacil: " + e
    });
  }
});

exports.executePagoPayPal = async (function (req, res, next) {
  try {
    var data = await (Service.executePagoPayPal(req.body));
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully generated pagofacil"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "Error generando transaccion pagofacil: " + e
    });
  }
});

exports.cancelPagoPayPal = async (function (req, res, next) {
  try {
    var data = await (Service.cancelPagoPayPal(req.body));
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully generated pagofacil"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "Error generando transaccion pagofacil: " + e
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
    var data = await (Service.recordReference(req.body.id, req.body.yalsid));
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
