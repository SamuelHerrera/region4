var async = require('asyncawait/async');
var await = require('asyncawait/await');
var request = require('request');
var model = require('../models/pagofacil.model');
var Paypal = require('paypal-express-checkout');
var paypal = Paypal.init('ventas_api1.region4.mx', 'ZDEVUL82HZYAGSVE', 'ASv4fEpVJSdI6SLeoOrHgCir72YoAV8WH8t0Jq5IWSNZom3WTu6tg-E.',
  'http://www.example.com/return', 'http://www.example.com/cancel', false);

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

  pagofacil_request.idSucursal = "340db135703c61aee380b35041bd3335993c69c8";
  pagofacil_request.idUsuario = "57f3ecbbecdb05f4d1c1ca2af9a2f12dc061da4e";
  pagofacil_request.idServicio = "3";
  pagofacil_request.celular = pagofacil_request.telefono;

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

  pagofacil_model.response = response.result;
  pagofacil_model.autorized = response.autorizado;
  console.log(pagofacil_model);
  try {
    var savedPagofacil = await (pagofacil_model.save());
    return savedPagofacil;
  } catch (e) {
    throw Error("Error: " + e);
  }
});

exports.createPagoPayPal = async (function (clientid) {
  var pagofacil_model = new model();
  pagofacil_model.dateCreated = new Date();
  pagofacil_model.clientid = clientid;
  pagofacil_model.reportid = null;
  pagofacil_model.request = {};

  var response = await (new Promise(function (resolve, reject) {
    // request.post(config, function (error, response, body) {
    //   if (!error && response.statusCode == 200) {
    //     console.log("error", body);
    //     resolve(body);
    //   } else {
    //     console.log("error1", error, response.statusCode, body);
    //     reject(error);
    //   }
    // });

    paypal.pay('20130001', 123.23, 'iPad', 'EUR', true, ['custom', 'data'], function (err, url) {
      if (err) {
        console.log(err);
        reject(err);
        return;
      } else {
        console.log(url);
        response.redirect(url);
        resolve(url);
      }
    });
  }));

  pagofacil_model.response = response.result;
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
