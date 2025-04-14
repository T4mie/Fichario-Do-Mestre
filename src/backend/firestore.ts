// src/backend/firestore.ts
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { database } from "./firebase";

// função de salvar a descrição, url e timestamp da imagem
export async function saveImageMetadata(uid: string, imageName: string, data: {
  description: string;
  imageUrl: string;
  timestamp: Date;
}) {
  // esse doc() cria um caminho na database
  // users/uid do usuario/uploads/nome da imagem
  const docRef = doc(database, "users", uid, "uploads", imageName);
  // grava os dados (data) passados no caminho (docRef)
  await setDoc(docRef, data);
}

// função de busca que retorna um snapshot da data do upload
export async function getUserUploads(uid: string) {
  // collection(...) -> aponta para uma subcoleção dentro do Firestore
  //vai até users/uid do usuario/uploads/ acessando a coleção inteira
  const uploadsCollection = collection(database, "users", uid, "uploads");
  // retorna o snapshot das informações
  // getDocs(...) -> busca todos os documentos daquela coleção
  const snapshot = await getDocs(uploadsCollection);
//  snapshot.docs -> é um array de documentos encontrados.
// .map(...) -> transforma cada documento em um novo objeto.
// doc.id ->  pega o ID de cada documento (ex: minhaImagem.png).
// doc.data() -> pega os dados do documento (ex: descrição, URL, timestamp).
// { id: doc.id, ...doc.data() } -> junta tudo em um objeto só com id, description, imageUrl, etc.
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
//