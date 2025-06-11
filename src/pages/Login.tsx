// src/pages/Login.tsx (ou onde estiver seu componente)
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Undo2 } from "lucide-react";
import { loginWithEmail } from "../backend/auth";
import { NavigateFunction } from "react-router-dom";
import { Toaster, toast } from 'sonner'

export async function handleLogin(
  email: string,
  senha: string,
  navigate: NavigateFunction
): Promise<void> {
  try {
    await loginWithEmail(email, senha);
    toast.success("Login feito com sucesso!");
    navigate("/user");
  }
  // tratamento de erros
  catch (error: any) {
    let errorMessage = "Erro desconhecido ao fazer login.";

    if (error.code) {
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Email inválido.";
          break;
        case "auth/user-not-found":
          errorMessage = "Usuário ou senha incorreto.";
          break;
        case "auth/invalid-credential":
          errorMessage = "Usuário ou senha incorreto.";
          break;
        case "auth/wrong-password":
          errorMessage = "Usuário ou senha incorreto.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Muitas tentativas. Tente novamente mais tarde.";
          break;
        default:
          errorMessage = "Erro ao fazer login: " + error.message;
      }
    } else if (error.message) {
      // fallback genérico
      errorMessage = error.message;
    }
    toast.error(errorMessage)
    //alert(errorMessage);
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
      <Toaster richColors position="top-right"></Toaster>
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
function sleep(arg0: number) {
  throw new Error("Function not implemented.");
}

