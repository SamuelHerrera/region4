var async = require('asyncawait/async');
var await = require('asyncawait/await');
var request = require('request');
var model = require('../models/yals.model');

_this = this;

var config = {
  url: 'https://yals.mx/api/v1/reporte/json',//'https://yals.mx/api/v1/reporte/json/test', //,
  encoding: null,
  headers: {
    'Content-Type': 'application/json'
  },
  json: {}
};

var yals_email = "ventas@region4.mx";
var yals_apikey = "x_brAgJfLNK5ANWGGMcRAkJR";

exports.getSettings = async (function () {
  return {
    url: config.url,
    mail: yals_email,
    key: yals_apikey
  };
});

exports.setSettings = async (function (url, mail, key) {
  config.url = url;
  yals_apikey = key;
  yals_email = mail;
  return {
    url: config.url,
    mail: yals_email,
    key: yals_apikey
  };
});

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
});

exports.createReport = async (function (clientid, yals_request, cuponid) {
  var report_model = new model();
  report_model.dateCreated = new Date();
  report_model.request = yals_request;
  report_model.clientid = clientid;
  report_model.cuponid = cuponid;
  report_model.estado = yals_request.estado;

  yals_request.email = yals_email;
  yals_request.api_key = yals_apikey;

  config.json = yals_request;
  var response = await (new Promise(function (resolve, reject) {
    request.post(config, function (error, response, body) {
      if (!error && response.statusCode == 200) {
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
