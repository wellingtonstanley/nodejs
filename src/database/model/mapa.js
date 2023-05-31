const mongoose = require('mongoose');

var MapaSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },
    cidade: {
      type: String,
      required: true
    },
    local: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  },{ collection: 'mapas' }
);

module.exports = mongoose.model("Mapa", MapaSchema);