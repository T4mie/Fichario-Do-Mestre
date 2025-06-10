// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CriarConta from "./pages/Cadastro";
import Home from "./pages/Home";
import User from "./pages/User";
import CriarPersonagem from "./pages/CriarPersonagem";
import CriarModelo from "./pages/CriarModelo";

import ProtectedRoute from "../src/components/headers/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro" element={<CriarConta />}/>
      <Route path="/login" element={<Login />}/>
      {/* Rotas protegidas */}
      <Route path="/user" element={
        <ProtectedRoute>
          <User />
        </ProtectedRoute>
      }/>
      <Route path="/personagem" element={
        <ProtectedRoute>
          <CriarPersonagem />
        </ProtectedRoute>
      }/>
      <Route path="/personagem/:charId?" element={
        <ProtectedRoute>
          <CriarPersonagem />
        </ProtectedRoute>
      }/>
      <Route path="/criar-modelo" element={
        <ProtectedRoute>
          <CriarModelo />
        </ProtectedRoute>
      }/>
      <Route path="/criar-modelo/:modelId?" element={
        <ProtectedRoute>
          <CriarModelo />
        </ProtectedRoute>
      }/>
    </Routes>
  );
}