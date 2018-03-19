var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


var Schema = new mongoose.Schema({
  clientid: mongoose.Schema.Types.ObjectId,
  cuponid: mongoose.Schema.Types.ObjectId,
  request: mongoose.Schema.Types.Mixed,
  response: mongoose.Schema.Types.Mixed,
  estado: String,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

Schema.plugin(mongoosePaginate);
const Model = mongoose.model('Reportes', Schema);

module.exports = Model;
