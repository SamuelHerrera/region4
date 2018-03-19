var async = require('asyncawait/async');
var await = require('asyncawait/await');
var request = require('request');
var model = require('../models/yals.model');

_this = this;

var config = {
  url: 'https://yals.mx/api/v1/reporte/json/test',
  encoding: null,
  headers: {
    'Content-Type': 'application/json'
  },
  json: {}
};

exports.getReport = async (function (query, page, limit) {
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
})

exports.createReport = async (function (clientid, yals_request, cuponid) {
  var report_model = new model();
  report_model.dateCreated = new Date();
  report_model.request = yals_request;
  report_model.clientid = clientid;
  report_model.cuponid = cuponid;
  report_model.estado = yals_request.estado;

  yals_request.email = "ventas@region4.mx";
  yals_request.api_key = "x_brAgJfLNK5ANWGGMcRAkJR";

  config.json = yals_request;
  var response = await (new Promise(function (resolve, reject) {
    request.post(config, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        resolve(body);
      } else {
        reject(error);
      }
    });
  }));

  report_model.response = response;

  try {
    var savedYals = await (report_model.save());
    return savedYals;
  } catch (e) {
    throw Error("Error: " + e);
  }
});
