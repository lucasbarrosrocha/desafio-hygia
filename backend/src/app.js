const express = require("express");
require("express-async-errors");

const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const mongoose = require("mongoose");

const agendaRouter = require("./routers/agendaRouter");
const pacienteRouter = require("./routers/pacienteRouter");

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

mongoose.connect(process.env.DB_CONNECT);

app.use(morgan("dev"));

app.use("/agenda", agendaRouter);

app.use("/paciente", pacienteRouter);

module.exports = app;
