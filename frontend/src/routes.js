import React from "react";
import { BrowserRouter, Route, Routes as DomRoutes } from "react-router-dom";
import { Header } from "./components/header";

import { Agenda } from "./pages/agenda";
import { Paciente } from "./pages/paciente/";

export default function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <DomRoutes>
        <Route path="/" element={<Paciente />} exact />
        <Route path="/agenda" element={<Agenda />} />
      </DomRoutes>
    </BrowserRouter>
  );
}
