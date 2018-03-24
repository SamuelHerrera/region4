var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


var Schema = new mongoose.Schema({
  campana: String,
  porcentaje: Number,
  nombre: String,
  descripcion: String,
  estado: Boolean,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

Schema.plugin(mongoosePaginate);
const Model = mongoose.model('Cupon', Schema);

module.exports = Model;
