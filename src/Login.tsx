import { useState } from "react";
import { loginWithEmail } from "./backend/auth";
import { useNavigate } from "react-router"

export default function Login() {
  // declarando as constantes do email e da senha
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  // declarando o método de navegação
  const navigate = useNavigate();

  // método de login
  const handleLogin = async () => {
    try {
      await loginWithEmail(email, senha);// <- chama a função loginWithEmail do auth
      alert("Login feito com sucesso!");
      navigate("/upload"); // <- redireciona para a página de upload
    } catch (error) {
      alert("Erro no login: " + (error as Error).message);
    }
  };

  // tela
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-fundo">
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
          className="w-full bg-fundo text-caixa p-2 rounded hover:opacity-90"
          onClick={handleLogin}
        >
          Entrar
        </button>
        <p onClick={() => navigate("/criar-conta")}
        className="mt-4 underline cursor-pointer hover:opacity-70">
          Cadastrar-se
        </p>
        
      </div>
    </div>
  );  
}
