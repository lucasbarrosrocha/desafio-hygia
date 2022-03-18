import React, { useState, useEffect } from "react";
import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Button,
  Card,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";
import ModalAgenda from "./modalAgenda";
import { api } from "../../service/api";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 750,
  whiteSpace: "pre",
  "& thead": {
    "& th:first-child": {
      paddingLeft: 16,
    },
  },
  "& td": {
    borderBottom: "none",
  },
  "& td:first-child": {
    paddingLeft: "16px !important",
  },
}));

export function Agenda() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [consulta, setConsulta] = useState({});
  const [agenda, setAgenda] = useState();
  const [openModal, setOpenModal] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    updatePageData();
    setConsulta({});
  };

  const handleDeleteconsulta = async (consulta) => {
    const response = await api.delete(`/agenda/${consulta._id}`);
    if (response.status === 200) {
      setAgenda(agenda.filter((u) => u._id !== consulta._id));
    }
    setConsulta(consulta);
  };

  const updatePageData = async () => {
    const response = await api.get("/agenda");
    setAgenda(response.data);
  };

  useEffect(() => {
    updatePageData();
  }, []);

  useEffect(() => {
    async function handleAgenda() {
      const response = await api.get("/agenda");
      setAgenda(response.data);
    }

    if (!agenda) {
      handleAgenda();
    }
  }, [agenda]);

  return (
    <Container>
      <Button
        sx={{ mb: 2 }}
        variant="contained"
        color="primary"
        onClick={() => setOpenModal(true)}
      >
        nova consulta
      </Button>
      <Card sx={{ width: "100%", overflow: "auto" }} elevation={6}>
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell>Paciente</TableCell>
              <TableCell>Data do agendamento</TableCell>
              <TableCell>Horario</TableCell>
              <TableCell>Especialidade</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agenda
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((consulta, index) => (
                <TableRow hover key={consulta.id}>
                  <TableCell sx={{ px: 0 }} align="left">
                    {consulta.paciente.nome}
                  </TableCell>
                  <TableCell sx={{ px: 2 }} align="left">
                    {consulta.dataAgendamento}
                  </TableCell>
                  <TableCell sx={{ px: 2 }} align="left">
                    {consulta.horario}
                  </TableCell>
                  <TableCell sx={{ px: 2 }}>{consulta.especialidade}</TableCell>
                  <TableCell sx={{ px: 2 }}>{consulta.status}</TableCell>

                  <TableCell sx={{ px: 0 }}>
                    <IconButton
                      onClick={() => {
                        setConsulta(consulta);
                        setOpenModal(true);
                      }}
                    >
                      <EditIcon fontSize="small" color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteconsulta(consulta)}>
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </ProductTable>

        <TablePagination
          sx={{ px: 2 }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={agenda?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={({ target: { value } }) => setRowsPerPage(value)}
        />

        {openModal && (
          <ModalAgenda
            handleClose={handleCloseModal}
            open={openModal}
            consulta={consulta}
          />
        )}
      </Card>
    </Container>
  );
}
