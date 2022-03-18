const mongoose = require("mongoose");

const PacienteModel = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },

  dataNascimento: {
    type: String,
    require: true,
  },
  rua: {
    type: String,
    require: true,
  },
  bairro: {
    type: String,
    require: true,
  },
  cidade: {
    type: String,
    require: true,
  },
  estado: {
    type: String,
    require: true,
  },
  sexo: {
    type: String,
    require: true,
  },
  telefone: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Paciente", PacienteModel);
