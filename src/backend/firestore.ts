// src/backend/firestore.ts
import { addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import { database } from "./firebase";

export async function createCharacter(uid: string) {
  const characterCollectionRef = collection(database, "users", uid, "characters");
  const docRef = await addDoc(characterCollectionRef, { imageUrl: "" }); // apenas cria
  return docRef.id;
}

// Define uma função assíncrona para salvar dados de personagem
export async function saveCharacterData(
  uid: string,                      // ID do usuário (quem criou o personagem)
  characterId: string,              // ID do personagem
  data: Record<string, any>,       // Objeto com os dados a serem salvos (ex: { forca: 10, destreza: 12, ... })
  field: string  // Nome do campo (mapa) que está sendo salvo
) {
  try {
    // Cria uma referência ao documento do personagem no Firestore
    // Caminho: users/{uid}/characters/{characterId}
    const docRef = doc(database, `users/${uid}/characters/${characterId}`);
    
    // Cria um objeto com a chave dinâmica [field] (atributos, pericias ou personalidade)
    // Exemplo:
    // Se field = "atributos" e data = { forca: 10, destreza: 12 }
    // então updateData será: { atributos: { forca: 10, destreza: 12 } }
    const updateData = {
      [field]: data
    };

    // Atualiza o documento no Firestore com os dados informados
    // Atenção: substitui o conteúdo atual do campo (ex: todo o mapa "atributos")
    await updateDoc(docRef, updateData);

  } catch (error) {
    // Se ocorrer algum erro, lança uma exceção com a mensagem
    throw new Error("Erro ao salvar dados do personagem: " + (error as Error).message);
  }
}

export async function getCharacters(uid: string) {
  try {
    const charactersRef = collection(database, "users", uid, "characters");
    const querySnapshot = await getDocs(charactersRef);

    const characters = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        nome: data.personalidade?.nome || "Sem nome",
        imageUrl: data.imageUrl || null,
      };
    });

    return characters;
  } catch (error) {
    throw new Error('Error fetching characters: ' + (error as Error).message);
  }
}

// Pega um personagem específico pelo ID
export async function getCharacterById(uid: string, charId: string) {
  const charDocRef = doc(database, `users/${uid}/characters/${charId}`);
  const charDoc = await getDoc(charDocRef);

  if (!charDoc.exists()) return null;

  // Pega todos os dados de uma vez (incluindo imageUrl, atributos, pericias, personalidade)
  const data = charDoc.data();

  return {
    id: charId,
    imageUrl: data.imageUrl || null,
    atributos: data.atributos || {},
    pericias: data.pericias || {},
    personalidade: data.personalidade || {},
  };
}


// Atualiza apenas a URL da imagem
export async function updateCharacterImage(uid: string, characterId: string, imageUrl: string) {
  try {
    const characterDocRef = doc(database, "users", uid, "characters", characterId);
    await updateDoc(characterDocRef, { imageUrl });
  } catch (error) {
    throw new Error("Error updating character image: " + (error as Error).message);
  }
}

export async function getSystems(){
  try {
    const systemsRef = collection(database, "systems");
    const querySnapshot = await getDocs(systemsRef);

    const systems = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {data, id: doc.id};
    });

    return systems;
  } catch (error) {
    throw new Error('Error fetching systems: ' + (error as Error).message);
  }
}

export async function createSheetModel(uid: string) {
  const characterCollectionRef = collection(database, "users", uid, "models");
  const docRef = await addDoc(characterCollectionRef, { nome: "" }); // apenas cria
  return docRef.id;
}

export async function saveSheetModel(
  uid: string,
  modelId: string,
  systemId: string,
  modelName: string,
  components: {
    id: string;
    nome: string;
    x: number;
    y: number;
    w: number;
    h: number;
  }[]
) {
  try {
    // Cria a referência ao documento do modelo
    const modelDocRef = doc(database, "users", uid, "models", modelId);

    // Monta os dados do modelo a serem salvos
    const modelData = {
      nome: modelName,       // Nome do modelo (string)
      sistema: systemId,     // ID do sistema associado (string)
      componente: components, // Lista de atributos com id, nome e posição (array de objetos)
    };

    // Salva os dados no documento com o ID fornecido
    await setDoc(modelDocRef, modelData);
  } catch (error) {
    throw new Error("Erro ao salvar modelo de ficha: " + (error as Error).message);
  }
}

export async function getSheetModels(uid: string) {
  try {
    const modelsRef = collection(database, "users", uid, "models");
    const querySnapshot = await getDocs(modelsRef);

    const models = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {data, id: doc.id};
    });

    return models;
  } catch (error) {
    throw new Error('Error fetching models: ' + (error as Error).message);
  }
}