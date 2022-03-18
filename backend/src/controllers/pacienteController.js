const pacienteRepository = require("../repositories/pacienteRepository");

async function getPaciente(req, res, next) {
  const id = req.params.id;
  const paciente = await pacienteRepository.getPaciente(id);
  res.json(paciente);
}

async function getPacientes(req, res, next) {
  const result = await pacienteRepository.getPacientes();
  res.json(result);
}

async function novoPaciente(req, res, next) {
  const {
    nome,
    dataNascimento,
    rua,
    bairro,
    cidade,
    estado,
    sexo,
    telefone,
    email,
  } = req.body;

  if (!nome) return res.status(400).json("Paramentro NOME não foi informado");
  if (!dataNascimento)
    return res.status(400).json("Paramentro DATA NASCIMENTO não foi informado");
  if (!sexo) return res.status(400).json("Paramentro SEXO não foi informado");

  const paciente = await pacienteRepository.novoPaciente({
    nome,
    dataNascimento,
    rua,
    bairro,
    cidade,
    estado,
    sexo,
    telefone,
    email,
  });

  return res.status(200).json(paciente);
}

async function updatePaciente(req, res, next) {
  const {
    nome,
    dataNascimento,
    rua,
    bairro,
    cidade,
    estado,
    sexo,
    telefone,
    email,
  } = req.body;

  const id = req.params.id;

  if (!nome) return res.status(400).json("Paramentro NOME não foi informado");
  if (!dataNascimento)
    return res.status(400).json("Paramentro DATA NASCIMENTO não foi informado");
  if (!sexo) return res.status(400).json("Paramentro SEXO não foi informado");

  const paciente = await pacienteRepository.updatePaciente(id, {
    nome,
    dataNascimento,
    rua,
    bairro,
    cidade,
    estado,
    sexo,
    telefone,
    email,
  });

  return res.status(200).json(paciente);
}

async function deletePaciente(req, res, next) {
  const id = req.params.id;
  const paciente = await pacienteRepository.deletePaciente(id);
  res.json(paciente);
}

module.exports = {
  getPaciente,
  getPacientes,
  novoPaciente,
  updatePaciente,
  deletePaciente,
};
