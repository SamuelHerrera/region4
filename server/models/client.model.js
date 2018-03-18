var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


var ClientSchema = new mongoose.Schema({
  name: String,
  mail: {
    type: String,
    unique: true
  },
  phone: String,
  password: String,
  ramo: String,
  facturacion: mongoose.Schema.Types.Mixed,
  activationCode: String,
  status: String,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

ClientSchema.plugin(mongoosePaginate);
const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;
