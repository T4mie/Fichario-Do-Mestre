// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CriarConta from "./pages/Cadastro";
import Home from "./pages/Home";
import User from "./pages/User";
import CriarPersonagem from "./pages/CriarPersonagem";
import CriarModelo from "./pages/CriarModelo";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro" element={<CriarConta />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/user" element={<User />}/>
      <Route path="/personagem" element={<CriarPersonagem />} />
      <Route path="/personagem/:charId?" element={<CriarPersonagem />} />
      <Route path="/criar-modelo" element={<CriarModelo />}/>
      <Route path="/criar-modelo/:modelId?" element={<CriarModelo />} />
    </Routes>
  );
}