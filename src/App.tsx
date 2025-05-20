// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CriarConta from "./pages/Cadastro";
import Home from "./pages/Home";
import User from "./pages/User";
import CriarPersonagem from "./pages/CriarPersonagem";
import EditarPersonagem from "./pages/Personagem";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro" element={<CriarConta />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/user" element={<User />}/>
      <Route path="/criar-personagem" element={<CriarPersonagem />}/>
      <Route path="/personagens/:id" element={<EditarPersonagem/>}/>
    </Routes>
  );
}