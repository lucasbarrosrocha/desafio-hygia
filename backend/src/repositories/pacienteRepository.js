const pacienteModel = require("../models/pacienteModel");
const mongoose = require("mongoose");

async function updatePaciente(id, newPaciente) {
  let paciente = {};

  if (mongoose.Types.ObjectId.isValid(id)) {
    paciente = pacienteModel.findByIdAndUpdate(id, newPaciente, {
      new: true,
    });
  }

  return paciente;
}

function getPaciente(id) {
  return pacienteModel.findById(id);
}

function getPacientes() {
  return pacienteModel.find();
}

function novoPaciente(newPaciente) {
  return pacienteModel.create(newPaciente);
}

function deletePaciente(id) {
  return pacienteModel.findByIdAndDelete(id);
}

module.exports = {
  getPacientes,
  novoPaciente,
  deletePaciente,
  getPaciente,
  updatePaciente,
};
