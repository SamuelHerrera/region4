var async = require('asyncawait/async');
var await = require('asyncawait/await');
var request = require('request');
var model = require('../models/pagofacil.model');

_this = this;

var config = {
  url: 'https://www.pagofacil.net/ws/public/Wsjtransaccion/',
  encoding: null,
  headers: {
    'Content-Type': 'application/json'
  },
  json: {
    jsonrpc: "2.0",
    method: "transaccion",
    params: {
      data: {}
    },
    id: "test"
  }
};

exports.getPago = async (function (query, page, limit) {
  var options = {
    page,
    limit
  }
  try {
    var response = await (model.paginate(query, options));
    return response;

  } catch (e) {
    throw Error('Error while Paginating PagoFacil' + e);
  }
})

exports.createPago = async (function (clientid, pagofacil_request) {
  var pagofacil_model = new model();
  pagofacil_model.dateCreated = new Date();
  pagofacil_model.clientid = clientid;
  pagofacil_model.reportid = null;
  pagofacil_model.request = pagofacil_request;

  pagofacil_request.idSucursal = "60f961360ca187d533d5adba7d969d6334771370";
  pagofacil_request.idUsuario = "62ad6f592ecf2faa87ef2437ed85a4d175e73c58";
  pagofacil_request.idServicio = "3";

  config.json.params.data = pagofacil_request;

  console.log(config);
  var response = await (new Promise(function (resolve, reject) {
    request.post(config, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log("error", body);
        resolve(body);
      } else {
        console.log("error1", error, response.statusCode, body);
        reject(error);
      }
    });
  }));

  pagofacil_model.response = response;
  pagofacil_model.autorized = response.autorizado;
  console.log(pagofacil_model);
  try {
    var savedPagofacil = await (pagofacil_model.save());
    return savedPagofacil;
  } catch (e) {
    throw Error("Error: " + e);
  }
});

exports.recordReference = async (function (id, yalsid) {
  try {
    var oldPagofacil = await (Client.findOne({
      _id: id
    }));
  } catch (e) {
    throw Error("Error occured while Finding the Todo")
  }

  if (!oldPagofacil) {
    return false;
  }
  console.log(oldPagofacil)
  oldPagofacil.reportid = yalsid;
  console.log(oldPagofacil)

  try {
    var savedPagofacil = await (oldPagofacil.save());
    return savedPagofacil;
  } catch (e) {
    throw Error("And Error occured while updating the Todo");
  }
});
