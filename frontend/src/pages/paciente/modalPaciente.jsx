import React, { useState } from "react";
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

const ModalPaciente = ({ open, handleClose, user }) => {
  const [state, setState] = useState(
    user?.nome
      ? user
      : {
          bairro: "",
          cidade: "",
          dataNascimento: "",
          email: "",
          estado: "",
          nome: "",
          rua: "",
          sexo: "",
          telefone: "",
        }
  );

  const handleChange = (event, source) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async () => {
    let { _id } = state;
    if (_id) {
      await api.put(`/paciente/${_id}`, state);
    } else {
      await api.post(`/paciente/`, state);
    }
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box p={3}>
        <Typography variant="h4" gutterBottom component="div">
          {console.log(state)}
          {state?._id ? "Editar " : "Salvar "}paciente
        </Typography>
        <ValidatorForm onSubmit={handleFormSubmit}>
          <Grid sx={{ mb: "16px" }} container spacing={4}>
            <Grid item sm={6} xs={12}>
              <TextField
                label="Nome"
                type="text"
                name="nome"
                value={state?.nome}
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />
              <TextField
                label="Data nascimento"
                type="text"
                name="dataNascimento"
                value={state?.dataNascimento}
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />

              <TextField
                label="Rua"
                type="text"
                name="rua"
                value={state?.rua}
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />

              <TextField
                label="Bairro"
                onChange={handleChange}
                type="text"
                name="bairro"
                value={state?.bairro}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                label="Cidade"
                onChange={handleChange}
                type="text"
                name="cidade"
                value={state?.cidade}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />
              <TextField
                label="Estado"
                onChange={handleChange}
                type="text"
                name="estado"
                value={state?.estado}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />
              <TextField
                label="Telefone"
                onChange={handleChange}
                type="text"
                name="telefone"
                value={state?.telefone}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />
              <TextField
                label="E-mail"
                onChange={handleChange}
                type="text"
                name="email"
                value={state?.email}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />
              <TextField
                label="Sexo"
                onChange={handleChange}
                name="sexo"
                value={state?.sexo}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
                select
              >
                <MenuItem value={"Masculino"}>Masculino</MenuItem>
                <MenuItem value={"Feminino"}>Feminino</MenuItem>
                <MenuItem value={"Não responder"}>Não responder</MenuItem>
              </TextField>
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

export default ModalPaciente;
