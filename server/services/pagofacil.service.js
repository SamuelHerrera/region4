var async = require('asyncawait/async');
var await = require('asyncawait/await');
var request = require('request');
var model = require('../models/pagofacil.model');
var Paypal = require('paypal-express-checkout');
var paypal = Paypal.init('ventas_api1.region4.mx', 'ZDEVUL82HZYAGSVE', 'ASv4fEpVJSdI6SLeoOrHgCir72YoAV8WH8t0Jq5IWSNZom3WTu6tg-E.',
  'http://www.example.com/execute', 'http://www.example.com/cancel', false);

exports._paypal = paypal;

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

  var response = await (new Promise(function (resolve, reject) {
    request.post(config, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  }));

  pagofacil_model.response = response.result;
  pagofacil_model.autorized = response.autorizado;
  try {
    var savedPagofacil = await (pagofacil_model.save());
    return savedPagofacil;
  } catch (e) {
    throw Error("Error: " + e);
  }
});

exports.createPagoPayPal = async (function (clientid, amount) {
  var pagofacil_model = new model();
  pagofacil_model.dateCreated = new Date();
  pagofacil_model.clientid = clientid;
  pagofacil_model.reportid = null;
  var response = await (new Promise(function (resolve, reject) {
    var today = new Date();
    var invoicen = today.getFullYear() + today.getMonth() + today.getDay() + Math.floor(Math.random() * 10000);
    paypal.pay(invoicen, amount, 'Reporte region4', 'MXN', false, [clientid], function (err, url) {
      if (err) {
        reject(err);
        return;
      } else {
        resolve(url);
      }
    });
  }));
  pagofacil_model.request = response.split("token=")[1];
  pagofacil_model.response = response;
  pagofacil_model.autorized = false;
  try {
    var savedPagofacil = await (pagofacil_model.save());
    return savedPagofacil;
  } catch (e) {
    throw Error("Error: " + e);
  }
});

exports.executePagoPayPal = async (function (query, token, payerid) {
  var oldPagofacil = null;
  if (token && payerid) {
    var response = await (new Promise(function (resolve, reject) {
      paypal.detail(token, payerid, function (err, data, invoiceNumber, price, custom_data_array) {
        if (err) {
          reject(err);
        }
        if (data.success) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    }));
    try {
      oldPagofacil = await (model.findOne({
        request: token
      }));
    } catch (e) {
      throw Error("Error occured while Finding the Todo" + e)
    }
    if (!oldPagofacil) {
      return false;
    }
    oldPagofacil.autorized = response;
    try {
      var savedPagofacil = await (oldPagofacil.save());
      return savedPagofacil;
    } catch (e) {
      throw Error("And Error occured while updating the Todo");
    }
  } else {
    try {
      oldPagofacil = await (model.findOne({
        request: query.token
      }));
    } catch (e) {
      throw Error("Error occured while Finding the Todo" + e)
    }
    if (!oldPagofacil) {
      return false;
    }
    oldPagofacil.response = query.PayerID;
    try {
      var savedPagofacil = await (oldPagofacil.save());
      return true;
    } catch (e) {
      throw Error("And Error occured while updating the Todo");
    }
  }


});

exports.cancelPagoPayPal = async (function (query) {
  //console.log(query);
  var oldPagofacil = null;
  try {
    oldPagofacil = await (model.findOne({
      request: query.token
    }));
  } catch (e) {
    throw Error("Error occured while Finding the Todo" + e)
  }
  if (!oldPagofacil) {
    return false;
  }
  oldPagofacil.response = "cancelled";
  try {
    var savedPagofacil = await (oldPagofacil.save());
    return true;
  } catch (e) {
    throw Error("And Error occured while updating the Todo");
  }
});

exports.recordReference = async (function (id, yalsid) {
  var oldPagofacil = null;
  try {
    oldPagofacil = await (model.findOne({
      _id: id
    }));
  } catch (e) {
    throw Error("Error occured while Finding the Todo")
  }

  if (!oldPagofacil) {
    return false;
  }
  oldPagofacil.reportid = yalsid;
  try {
    var savedPagofacil = await (oldPagofacil.save());
    return savedPagofacil;
  } catch (e) {
    throw Error("And Error occured while updating the Todo");
  }
});
