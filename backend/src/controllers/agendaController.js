const agendaRepository = require("../repositories/agendaRepository");

async function getAllAgenda(req, res, next) {
  const agenda = await agendaRepository.getAllAgenda();
  res.json(agenda);
}

async function criarAgenda(req, res, next) {
  const { paciente, dataAgendamento, horario, especialidade, status } =
    req.body;

  if (!paciente)
    return res.status(400).json("Paramentro PACIENTE ID não foi informado");
  if (!dataAgendamento)
    return res
      .status(400)
      .json("Paramentro DATA AGENDAMENTO não foi informado");
  if (!horario)
    return res.status(400).json("Paramentro HORARIO não foi informado");
  if (!especialidade)
    return res.status(400).json("Paramentro ESPECIALIDADE não foi informado");
  if (!status)
    return res.status(400).json("Paramentro STATUS não foi informado");

  const agenda = await agendaRepository.novaAgenda({
    paciente,
    dataAgendamento,
    horario,
    especialidade,
    status,
  });

  return res.status(200).json(agenda);
}

async function deleteAgenda(req, res, next) {
  const id = req.params.id;
  const agenda = await agendaRepository.deleteAgenda(id);
  res.json(agenda);
}

async function getAgenda(req, res, next) {
  const id = req.params.id;
  const agenda = await agendaRepository.getAgenda(id);
  res.json(agenda);
}

async function getAgendaPorPaciente(req, res, next) {
  const id = req.params.id;
  const agenda = await agendaRepository.getAgendaPorPaciente(id);
  res.json(agenda);
}

async function updateAgenda(req, res, next) {
  const { paciente, dataAgendamento, horario, especialidade, status } =
    req.body;
  const id = req.params.id;

  const agenda = await agendaRepository.updateAgenda(id, {
    paciente,
    dataAgendamento,
    horario,
    especialidade,
    status,
  });

  return res.status(200).json(agenda);
}

module.exports = {
  criarAgenda,
  deleteAgenda,
  getAllAgenda,
  getAgenda,
  getAgendaPorPaciente,
  updateAgenda,
};
