// src/backend/firestore.ts
import { addDoc, collection, doc, getDoc, getDocs, setDoc, deleteDoc} from "firebase/firestore";
import { database } from "./firebase";

export async function createCharacter(uid: string) {
  const characterCollectionRef = collection(database, "users", uid, "characters");
  const docRef = await addDoc(characterCollectionRef, { }); // apenas cria
  return docRef.id;
}

export async function saveCharacterData(
  uid: string,
  characterId: string,
  modelId: string,
  systemId: string,
  characterName: string,
  values: Record<string, string | number> // { compId: valor }
) {
  try {
    const docRef = doc(database, `users/${uid}/characters/${characterId}`);

    const characterData = {
      nome: characterName,
      modelo: modelId,
      sistema: systemId,
      valores: values,
    };

    await setDoc(docRef, characterData);
  } catch (error) {
    throw new Error("Erro ao salvar personagem: " + (error as Error).message);
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
        nome: data.nome || "Sem nome",
      };
    });

    return characters;
  } catch (error) {
    throw new Error('Error fetching characters: ' + (error as Error).message);
  }
}

export async function getCharacterById(uid: string, charId: string) {
  const charDocRef = doc(database, `users/${uid}/characters/${charId}`);
  const charDoc = await getDoc(charDocRef);

  if (!charDoc.exists()) return null;

  const data = charDoc.data();

  return {
    id: charId,
    nome: data.nome || "Sem nome",
    modelo: data.modelo,            // <- ID do modelo
    sistema: data.sistema,          // <- ID do sistema
    valores: data.valores || {},    // <- dados preenchidos
  };
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

export async function getSystemById(systemId: string) {
  try {
    const ref = doc(database, "systems", systemId);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error("Sistema não encontrado.");
    return snap.data();
  } catch (error) {
    throw new Error("Erro ao buscar sistema: " + (error as Error).message);
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
    type: string;
    nome: string;
    x: number;
    y: number;
    w: number;
    h: number;
  }[],
  identificadorId: string
) {
  try {
    // Cria a referência ao documento do modelo
    const modelDocRef = doc(database, "users", uid, "models", modelId);

    // Monta os dados do modelo a serem salvos
    const modelData = {
      nome: modelName,       // Nome do modelo (string)
      sistema: systemId,     // ID do sistema associado (string)
      componente: components, // Lista de atributos com id, nome e posição (array de objetos)
      identificadorId, // salva o identificador
    };

    // Salva os dados no documento com o ID fornecido
    await setDoc(modelDocRef, modelData);
  } catch (error) {
    throw new Error("Erro ao salvar modelo de ficha: " + (error as Error).message);
  }
}

export async function getAllSheetModels(uid: string) {
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

export async function getSheetModel(uid: string, modelId: string) {
  try {
    const modelRef = doc(database, "users", uid, "models", modelId);
  const snapshot = await getDoc(modelRef);
  if (!snapshot.exists()) throw new Error("Modelo não encontrado.");
  return snapshot.data(); // Deve conter: nome, sistema, componente[]
  } catch (error) {
    throw new Error('Error fetching model: ' + (error as Error).message);
  }
  
}

export async function deleteSheetModel(uid: string, modelId: string) {
  try {
    const modelRef = doc(database, "users", uid, "models", modelId);
    await deleteDoc(modelRef);
  } catch (error) {
    throw new Error("Erro ao deletar modelo: " + (error as Error).message);
  }
}

export async function deleteCharacter(uid: string, charId: string) {
  try {
    const charRef = doc(database, "users", uid, "characters", charId);
    await deleteDoc(charRef);
  } catch (error) {
    throw new Error("Erro ao deletar personagem: " + (error as Error).message);
  }
}