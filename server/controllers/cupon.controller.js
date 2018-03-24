var async = require('asyncawait/async');
var await = require('asyncawait/await');

var Service = require('../services/cupon.service');

_this = this;

exports.getCupon = async (function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;
  var query = req.query ? req.query : {};
  try {
    var data = await (Service.getCupon(query, page, limit));
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully cupon Recieved"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
});

exports.createCupon = async (function (req, res, next) {
  try {
    var data = await (Service.createCupon(req.body.campana, req.body.porcentaje, req.body.nombre, req.body.descripcion, req.body.estado));
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully generated cupon"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "Error generando cupon: " + e
    });
  }
});

exports.updateStatus = async (function (req, res, next) {
  if (!req.body) {
    return res.status(400).json({
      status: 400,
      message: "Clave must be present"
    });
  }
  try {
    var updatedCupon = await (Service.updateStatus(req.body.id, req.body.estado));
    if (updatedCupon) {
      return res.status(200).json({
        status: 200,
        data: updatedCupon,
        message: "Succesfully updated cupon"
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Error cambiando estado del cupon"
      });
    }
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
});
