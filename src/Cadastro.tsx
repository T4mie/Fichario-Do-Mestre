// src/Cadastro.tsx
import { useState } from "react";
import { registerWithEmail } from "./backend/auth";
import { useNavigate } from "react-router-dom";

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
      navigate("/upload"); // <- redireciona após criar
    } catch (error) {
      alert("Erro ao criar conta: " + (error as Error).message);
    }
  };

  // tela
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-fundo">
      <div className="bg-caixa p-8 rounded-xl shadow-lg w-full max-w-md text-fundo text-center">
        <h2 className="text-3xl font-bold mb-6 font-montserrat">Criar Conta</h2>
        <input
          className="w-full mb-4 p-2 rounded"
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full mb-4 p-2 rounded"
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <input
          className="w-full mb-4 p-2 rounded"
          type="password"
          placeholder="Confirmar senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />
        <button
          className="w-full bg-fundo text-caixa p-2 rounded hover:opacity-90"
          onClick={handleCadastro}
        >
          Cadastrar
        </button>
        <p onClick={() => navigate("/login")}
        className="mt-4 underline cursor-pointer hover:opacity-70">
          Já tem conta? Fazer login
        </p>
      </div>
    </div>
  );
}
