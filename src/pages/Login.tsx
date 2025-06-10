// src/pages/Login.tsx (ou onde estiver seu componente)
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Undo2 } from "lucide-react";
import { loginWithEmail } from "../backend/auth";
import { NavigateFunction } from "react-router-dom";

export async function handleLogin(
  email: string,
  senha: string,
  navigate: NavigateFunction
): Promise<void> {
  try {
    await loginWithEmail(email, senha);
    alert("Login feito com sucesso!");
    navigate("/user");
  } catch (error) {
    alert("Erro no login: " + (error as Error).message);
  }
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const onLoginClick = () => {
    handleLogin(email, senha, navigate);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-fundo relative">
      {/* Botão de voltar */}
      <button
        className="absolute top-6 left-[95%] p-2 rounded-full hover:bg-gray-200 transition bg-transparent"
        onClick={() => navigate("/")}
        title="Voltar para a página inicial"
      >
        <Undo2 size={25} />
      </button>
      <div className="bg-caixa p-8 rounded-xl shadow-lg w-full max-w-md text-fundo text-center">
        <h2 className="text-3xl font-bold mb-6 font-montserrat">Login</h2>
        <input
          className="w-full mb-4 p-2 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full mb-4 p-2 rounded"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button
          className="w-1/2 bg-fundo text-caixa p-2 rounded hover:opacity-90"
          onClick={onLoginClick}
        >
          Entrar
        </button>
        <p className="mt-4 cursor-pointer hover:opacity-70">
          <NavLink to={"/cadastro"}>Cadastre-se</NavLink>
        </p>
      </div>
    </div>
  );
}
