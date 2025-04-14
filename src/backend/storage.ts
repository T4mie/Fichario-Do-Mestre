// src/backend/storage.ts
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

// Função para fazer o upload da imagem
export async function uploadImage(image: File, path: string) {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, image);
  const imageUrl = await getDownloadURL(storageRef);
  return imageUrl;
}

// função para obter a url da imagem
export async function getImageUrl(path: string) {
  const imageRef = ref(storage, path);
  return await getDownloadURL(imageRef);
}
//