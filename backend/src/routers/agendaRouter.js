const express = require("express");
const router = express.Router();
const agendaController = require("../controllers/agendaController");

router.get("/:id", agendaController.getAgenda);

router.put("/:id", agendaController.updateAgenda);

router.get("/", agendaController.getAllAgenda);

router.get("/paciente/:id", agendaController.getAgendaPorPaciente);

router.post("/", agendaController.criarAgenda);

router.delete("/:id", agendaController.deleteAgenda);

module.exports = router;
