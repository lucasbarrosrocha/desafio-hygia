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
import ModalPaciente from "./modalPaciente";
import { api } from "../../service/api";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: {
    margin: "16px",
  },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "16px",
    },
  },
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

export function Paciente() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [user, setUser] = useState({
    nome: "",
    dataNascimento: "",
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
    telefone: "",
    email: "",
    sexo: "",
  });
  const [userList, setUserList] = useState();
  const [openModal, setOpenModal] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    updatePageData();
    setUser({});
  };

  const handleDeleteUser = async (user) => {
    const response = await api.delete(`/paciente/${user._id}`);
    if (response.status === 200) {
      setUserList(userList.filter((u) => u._id !== user._id));
    }

    setUser(user);
  };

  const handleEditUser = async (user) => {
    setOpenModal(true);
    setUser(user);
  };

  const updatePageData = async () => {
    const response = await api.get("/paciente");
    setUserList(response.data);
  };

  useEffect(() => {
    updatePageData();
  }, []);

  useEffect(() => {
    async function handlePacientes() {
      const response = await api.get("/paciente");
      setUserList(response.data);
    }

    if (!userList) {
      handlePacientes();
    }
  }, [userList]);

  return (
    <Container>
      <Button
        sx={{ mb: 2 }}
        variant="contained"
        color="primary"
        onClick={() => setOpenModal(true)}
      >
        novo paciente
      </Button>
      <Card sx={{ width: "100%", overflow: "auto" }} elevation={6}>
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Data de nascimento</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Sexo</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow hover key={user.id}>
                  <TableCell sx={{ px: 0 }} align="left">
                    {user.nome}
                  </TableCell>
                  <TableCell sx={{ px: 0 }} align="left">
                    {user.dataNascimento}
                  </TableCell>
                  <TableCell sx={{ px: 0 }} align="left">
                    {user.rua}, {user.bairro}. {user.cidade} - {user.estado}
                  </TableCell>
                  <TableCell sx={{ px: 0 }}>{user.telefone}</TableCell>
                  <TableCell sx={{ px: 0 }} align="left">
                    {user.email}
                  </TableCell>
                  <TableCell sx={{ px: 0 }}>{user.sexo}</TableCell>
                  <TableCell sx={{ px: 0 }}>
                    <IconButton
                      onClick={() => {
                        handleEditUser(user);
                      }}
                    >
                      <EditIcon fontSize="small" color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(user)}>
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
          count={userList?.length}
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
          <ModalPaciente
            handleClose={handleCloseModal}
            open={openModal}
            user={user}
          />
        )}
      </Card>
    </Container>
  );
}
