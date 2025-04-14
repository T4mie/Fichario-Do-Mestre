<<<<<<< Updated upstream
// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Upload from "./Upload";
import Mostrar from "./Mostrar";
import CriarConta from "./Cadastro";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
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
=======

import Home from "./pages/Home";
import User from "./pages/User";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'

//Permite a criação de rotas em lista, colocando a rota Home como a rota /

 function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/User" element={<User />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

//Cria o documento principal

export default App;
>>>>>>> Stashed changes
