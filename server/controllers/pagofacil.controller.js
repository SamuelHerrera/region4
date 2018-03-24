var async = require('asyncawait/async');
var await = require('asyncawait/await');

var Service = require('../services/pagofacil.service');

_this = this;

exports.getPago = async (function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;
  var query = req.query ? req.query : {};
  try {
    var data = await (Service.getPago(query, page, limit));
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
  Service._paypal.returnUrl = "http://" + req.headers.host + "/api/execute";
  Service._paypal.cancelUrl = "http://" + req.headers.host + "/api/cancel";

  req.body.token ? req.body.token : null;
  req.body.payerid ? req.body.payerid : null;

  if (req.body.token && req.body.payerid) {
    try {
      var data = await (Service.executePagoPayPal(null, req.body.token, req.body.payerid));
      return res.status(200).json({
        status: 200,
        data: data,
        message: "Succesfully executed pagofacil"
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: "Error generando transaccion pagofacil: " + e
      });
    }
  } else {
    try {
      var data = await (Service.createPagoPayPal(req.body.clientid, req.body.amount));
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
  }

});

exports.executePagoPayPal = async (function (req, res, next) {
  try {
    var data = await (Service.executePagoPayPal(req.query, null, null));
    var html = "<!DOCTYPE html><html><head></head><body><script>window.close();</script></body></html>";
    res.send(html);
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "Error generando transaccion pagofacil: " + e
    });
  }
});

exports.cancelPagoPayPal = async (function (req, res, next) {
  try {
    var data = await (Service.cancelPagoPayPal(req));
    var html = "<!DOCTYPE html><html><head></head><body><script>window.close();</script></body></html>";
    res.send(html);
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
