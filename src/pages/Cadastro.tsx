// src/Cadastro.tsx
import { useState } from "react";
import { registerWithEmail } from "../backend/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { div } from "motion/react-client";

export default function CriarConta() {
  // declarando as constantes do email e da senha
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // declarando o método de navegação
  const navigate = useNavigate();
  // método de cadastro
  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      await registerWithEmail(email, senha); // <- chama a função registerWithEmail do auth
      alert("Conta criada com sucesso!");
      navigate("/user"); // <- redireciona após criar
    } catch (error) {
      alert("Erro ao criar conta: " + (error as Error).message);
    }
  };

  // tela
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className=" p-8 rounded-xl shadow-lg w-full max-w-md text-center border-1 min-h-[400px] content-center">
        <p className="text-2xl font-bold mb-8">Criar Conta</p>
        <input
          className="w-full mb-4 p-2 rounded border-1 hover:bg-[#12447e]"
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full mb-4 p-2 rounded border-1 hover:bg-[#12447e]"
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <input
          className="w-full mb-4 p-2 rounded border-1 hover:bg-[#12447e]"
          type="password"
          placeholder="Confirmar senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />
        <button
          className="w-full bg-fundo text-caixa p-2 rounded hover:opacity-90 border-1 hover:bg-[#12447e]"
          onClick={handleCadastro}
        >
          Cadastrar
        </button>
        <p className={"mt-4 cursor-pointer hover:opacity-70  text-inherit"} >
          <NavLink to={"/login"} >Login</NavLink>
        </p>
      </div>
    </div>
  );
}
