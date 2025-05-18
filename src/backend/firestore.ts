// src/backend/firestore.ts
import { doc, setDoc, collection, getDocs} from "firebase/firestore";
import { database } from "./firebase";

// função de salvar os dados do personagem
export async function saveCharacterData (uid: string, characterName: string,  characterData: any) {
  try {
    // esse doc() cria um caminho na database
    // users/uid do usuario/characters/nome do personagem
    // o nome do personagem é o ID do documento
    const characterDocRef = doc(database,"users",uid,"characters",characterName);
    // grava os dados (characterData) passados no caminho (characterDocRef)
    await setDoc(characterDocRef, characterData);
  } catch (error) {
    throw new Error("Error saving character: " + (error as Error).message);
  }
}

export async function getCharacters (uid: string) {
  try {
     // collection(...) -> aponta para uma subcoleção dentro do Firestore
    //vai até users/uid do usuario/characters/ acessando a coleção inteira
    const charactersRef = collection(database, "users", uid, "characters");
    // retorna o snapshot das informações
    // getDocs(...) -> busca todos os documentos daquela coleção
    const querySnapshot = await getDocs(charactersRef);
    //  querySnapshot.docs -> é um array de documentos encontrados.
    // .map(...) -> transforma cada documento em um novo objeto.
    // doc.id ->  pega o ID de cada documento (ex: personagem1).
    // doc.data() -> pega os dados do documento (nome, atributos, etc).
    // { id: doc.id, ...doc.data() } -> junta tudo em um objeto só com id, description, imageUrl, etc.
    const characters = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return characters;
  } catch (error) {
    throw new Error('Error fetching characters: ' + (error as Error).message);
  }
}
//