import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";

// Função de login com email
export async function loginWithEmail(email: string, senha: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, senha);
  return userCredential;
}

// Função de cadastro
export async function registerWithEmail(email: string, senha: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
  return userCredential;
}

// Função para pegar o usuário autenticado
export function getCurrentUser() {
  return auth.currentUser;
}

// Função para logout
export async function logout() {
  await signOut(auth);
}

// Função para escutar mudanças de autenticação
export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}