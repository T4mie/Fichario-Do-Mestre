// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Upload from "./Upload";
import Mostrar from "./Mostrar";
import CriarConta from "./Cadastro";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/upload"
        element={
            <Upload />
        }
      />
      <Route
        path="/mostrar"
        element={
            <Mostrar />
        }
      />
      <Route 
        path="/criar-conta"
        element={
          <CriarConta />
        }
      />
      <Route
        path="/login"
        element={
            <Login />
        }
      />
    </Routes>
  );
}
