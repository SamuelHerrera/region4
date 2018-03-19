var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


var Schema = new mongoose.Schema({
  clientid: mongoose.Schema.Types.ObjectId,
  reportid: mongoose.Schema.Types.ObjectId,
  request: mongoose.Schema.Types.Mixed,
  response: mongoose.Schema.Types.Mixed,
  autorized: Boolean,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

Schema.plugin(mongoosePaginate);
const Model = mongoose.model('Pagofacil', Schema);

module.exports = Model;
