const mongoose = require("mongoose");

const AgendaModel = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },

  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    require: true,
    foreignField: "_id",
  },

  dataAgendamento: {
    type: String,
    require: true,
  },
  horario: {
    type: String,
    require: true,
  },
  especialidade: {
    type: String,
    require: true,
  },
  status: {
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

module.exports = mongoose.model("Agenda", AgendaModel);
