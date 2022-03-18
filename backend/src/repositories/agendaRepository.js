const agendaModel = require("../models/agendaModel");
const mongoose = require("mongoose");

function novaAgenda(dados) {
  return agendaModel.create(dados);
}

function updateAgenda(id, dados) {
  let agenda = {};

  if (mongoose.Types.ObjectId.isValid(id)) {
    agenda = agendaModel.findByIdAndUpdate(id, dados, {
      new: true,
    });
  }

  return agenda;
}

function getAllAgenda() {
  return agendaModel.find().populate("paciente");
}

async function getAgenda(id) {
  const agenda = await agendaModel.findById(id).populate("paciente");
  return agenda;
}

async function getAgendaPorPaciente(id) {
  const agenda = await agendaModel.find({ paciente: id }).populate("paciente");
  return agenda;
}

function deleteAgenda(id) {
  return agendaModel.findByIdAndRemove(id);
}

module.exports = {
  novaAgenda,
  getAllAgenda,
  deleteAgenda,
  getAgenda,
  getAgendaPorPaciente,
  updateAgenda,
};
