import React, { useState, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Dialog, Button, Grid, Typography, MenuItem } from "@mui/material";
import { Box, styled } from "@mui/system";
import { api } from "../../service/api";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const FormHandlerBox = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const ModalAgenda = ({ open, handleClose, consulta }) => {
  let paciente = consulta?.paciente?._id;
  const [state, setState] = useState(
    consulta?._id
      ? { ...consulta, paciente }
      : {
          paciente: "",
          dataAgendamento: "",
          horario: "",
          especialidade: "",
          status: "",
        }
  );

  const [userList, setUserList] = useState();

  const handleChange = (event, source) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    async function handlePacientes() {
      const response = await api.get("/paciente");
      setUserList(response.data);
    }

    if (!userList) {
      handlePacientes();
    }
  }, [userList]);

  const handleFormSubmit = async () => {
    console.log(state);

    let { _id } = state;
    if (_id) {
      await api.put(`/agenda/${_id}`, state);
    } else {
      await api.post(`/agenda/`, state);
    }
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box p={3}>
        <Typography variant="h4" gutterBottom component="div">
          Salvar agenda
        </Typography>
        <ValidatorForm onSubmit={handleFormSubmit}>
          <Grid sx={{ mb: "16px" }} container spacing={4}>
            <Grid item sm={6} xs={12}>
              <TextField
                label="Paciente"
                onChange={handleChange}
                name="paciente"
                value={state?.paciente}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
                select
              >
                {userList?.map((paciente) => (
                  <MenuItem key={paciente._id} value={paciente._id}>
                    {paciente.nome}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Horário"
                type="text"
                name="horario"
                value={state?.horario}
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />
              <TextField
                label="Status"
                onChange={handleChange}
                type="text"
                name="status"
                value={state?.status}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                label="Data de agendamento"
                type="text"
                name="dataAgendamento"
                value={state?.dataAgendamento}
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />
              <TextField
                label="Especialidade"
                onChange={handleChange}
                type="text"
                name="especialidade"
                value={state?.especialidade}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />
            </Grid>
          </Grid>

          <FormHandlerBox>
            <Button variant="contained" color="primary" type="submit">
              Salvar
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleClose()}
            >
              Cancelar
            </Button>
          </FormHandlerBox>
        </ValidatorForm>
      </Box>
    </Dialog>
  );
};

export default ModalAgenda;
