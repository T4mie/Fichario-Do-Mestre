// src/backend/auth.ts
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

// Função de login com email
export async function loginWithEmail(email: string, senha: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, senha);
  return userCredential;
}

//Função de cadastro
export async function registerWithEmail(email: string, senha: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
  return userCredential;
}

// Função para pegar o usuário autenticado
export function getCurrentUser() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Usuário não autenticado.");
  }
  return user;
}