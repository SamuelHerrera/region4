var async = require('asyncawait/async');
var await = require('asyncawait/await');
var request = require('request');
var model = require('../models/cupon.model');

_this = this;

exports.getCupon = async (function (query, page, limit) {
  var options = {
    page,
    limit
  }
  try {
    var response = await (model.paginate(query, options));
    return response;

  } catch (e) {
    throw Error('Error while Paginating Todos' + e);
  }
});

exports.createCupon = async (function (campana, porcentaje, nombre, descripcion, estado) {
  var report_model = new model();
  report_model.campana = campana;
  report_model.porcentaje = porcentaje;
  report_model.nombre = nombre;
  report_model.descripcion = descripcion;
  report_model.estado = estado;

  try {
    var savedCupon = await (report_model.save());
    return savedCupon;
  } catch (e) {
    throw Error("Error: " + e);
  }
});

exports.updateStatus = async (function (id, estado) {
  try {
    var oldCupon = await (model.findById(id));
  } catch (e) {
    throw Error("Error occured while Finding the Todo")
  }
  console.log(oldCupon)
  if (!oldCupon) {
    return false;
  }
  oldCupon.estado = estado;
  try {
    var savedClient = await (oldCupon.save());
    return savedClient;
  } catch (e) {
    throw Error("And Error occured while updating the Todo");
  }
});
