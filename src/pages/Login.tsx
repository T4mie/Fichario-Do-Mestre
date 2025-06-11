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
    <div className="w-screen h-screen flex items-center justify-center ">
      <button
        className="fixed top-4 right-4 z-50 bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition"
        onClick={() => navigate("/")}
        title="Voltar"
      >
        <Undo2 size={28} className="text-white" />
      </button>
      <div className="p-8 rounded-xl shadow-lg w-full max-w-md text-fundo text-center border-1 min-h-[400px] content-center">
        <p className='text-2xl font-bold mb-12'>Login</p>
        <input
          className="w-full mb-4 p-2 rounded border-1 hover:bg-[#12447e]"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full mb-4 p-2 rounded border-1 hover:bg-[#12447e]"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button
          className="w-full bg-fundo text-caixa p-2 mt-4 rounded hover:opacity-90"
          onClick={onLoginClick}
        >
          Entrar
        </button>

        <p className="mt-6 cursor-pointer hover:opacity-70 ">
          <NavLink to={"/cadastro"}>Cadastre-se</NavLink>
        </p>
      </div>
    </div>
  );
}
