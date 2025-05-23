// src/utils/handleLogin.ts
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
