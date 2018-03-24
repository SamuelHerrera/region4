var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Client = require('../models/client.model');

_this = this;
limit = 100;
exports.getClients = async (function (query, page, limit) {
  var options = {
    page,
    limit
  }

  try {
    var clients = await (Client.paginate(query, options));
    return clients;

  } catch (e) {
    throw Error('Error while Paginating Todos' + e);
  }
})

exports.createClient = async (function (client) {
  client.dateCreated = new Date();
  var newClient = new Client(client);
  try {
    var savedClient = await (newClient.save());
    return savedClient;
  } catch (e) {
    console.log(e)
    if (e.code === 11000) {
      throw Error("Usuario ya existe");
    } else {
      throw Error("Error: " + e);
    }

  }
});

exports.activateClient = async (function (activationCode) {
  try {
    var oldClient = await (Client.findOne({
      activationCode: activationCode
    }));
  } catch (e) {
    throw Error("Error occured while Finding the Todo")
  }

  if (!oldClient) {
    return false;
  }
  oldClient.status = "active";
  try {
    var savedClient = await (oldClient.save());
    return savedClient;
  } catch (e) {
    throw Error("And Error occured while updating the Todo");
  }
});

exports.loginClient = async (function (mail, pass) {
  try {
    var oldClient = await (Client.findOne({
      mail: mail,
      password: pass
    }));
  } catch (e) {
    throw Error("Error occured while Finding the Todo")
  }

  if (!oldClient) {
    return false;
  } else {
    return oldClient;
  }

});

exports.updateClient = async (function (client) {
  var id = client.id;
  try {
    var oldClient = await (Client.findById(id))
  } catch (e) {
    throw Error("Error occured while Finding the Todo")
  }
  if (!oldClient) {
    return false;
  }
  oldClient.name = client.name;
  oldClient.mail = client.mail;
  oldClient.phone = client.phone;
  oldClient.password = client.password;
  oldClient.facturacion = client.facturacion;
  oldClient.activationCode = client.activationCode;
  oldClient.status = client.status;
  try {
    var savedClient = await (oldClient.save());
    return savedClient;
  } catch (e) {
    throw Error("And Error occured while updating the Todo");
  }
});

exports.deleteClient = async (function (id) {
  try {
    var deleted = await (Client.remove({
      _id: id
    }));
    if (deleted.result.n === 0) {
      throw Error("Todo Could not be deleted")
    }
    return deleted;
  } catch (e) {
    throw Error("Error Occured while Deleting the Todo")
  }
});
