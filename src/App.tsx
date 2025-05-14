// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CriarConta from "./pages/Cadastro";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="/cadastro"
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
