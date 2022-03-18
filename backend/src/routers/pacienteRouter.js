const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/pacienteController");

router.get("/:id", pacienteController.getPaciente);

router.delete("/:id", pacienteController.deletePaciente);

router.get("/", pacienteController.getPacientes);

router.put("/:id", pacienteController.updatePaciente);

router.post("/", pacienteController.novoPaciente);

module.exports = router;
