import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GridLayout from "react-grid-layout";
import AtributoDisplay from "../components/sheetDisplay/AtributoMod";
import TextoDisplay from "../components/sheetDisplay/TextLine";
import { getAllSheetModels, getSheetModel, getSystemById, saveCharacterData, getCharacterById, createCharacter } from "../backend/firestore";
import { getCurrentUser } from "../backend/auth";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

export default function CriarPersonagem() {
  const user = getCurrentUser();

  const [models, setModels] = useState<{ id: string; data: any }[]>([]);
  const [selectedModelId, setSelectedModelId] = useState("");
  const [modelData, setModelData] = useState<any>(null);
  const [systemData, setSystemData] = useState<any>(null);
  const { charId } = useParams(); // /criar-personagem/:charId? (opcional)
  const [valores, setValores] = useState<Record<string, string | number>>({});
  const [characterName, setCharacterName] = useState("");

  const GRID_COLS = 12;
  const NUM_ROWS = 20; // número fixo de linhas
  const ROW_HEIGHT = 55;
  const GRID_HEIGHT = NUM_ROWS * ROW_HEIGHT;

  useEffect(() => {
  async function fetchAll() {
    if (!user) return;

    if (charId) {
      // Modo edição
      const personagem = await getCharacterById(user.uid, charId);
      if (!personagem) return;

      setCharacterName(personagem.nome);
      setValores(personagem.valores || {});
      setSelectedModelId(personagem.modelo);

      const model = await getSheetModel(user.uid, personagem.modelo);
      setModelData(model);

      const sistema = await getSystemById(personagem.sistema);
      setSystemData(sistema);
    } else {
      // Modo criação
      const lista = await getAllSheetModels(user.uid);
      setModels(lista);
    }
  }

  fetchAll();
}, [charId]);


  useEffect(() => {
    async function fetchModelData() {
      if (!user || !selectedModelId) return;
      const model = await getSheetModel(user.uid, selectedModelId);
      setModelData(model);

      if (model?.sistema) {
        const sistemaInfo = await getSystemById(model.sistema);
        setSystemData(sistemaInfo);
      }
    }

    fetchModelData();
  }, [selectedModelId]);

  const handleSalvar = async () => {
  if (!user || !characterName || !modelData) return;

  const characterId = charId || await createCharacter(user.uid); // ← USAR o ID atual, se estiver editando

  await saveCharacterData(
    user.uid,
    characterId,
    selectedModelId,
    modelData.sistema,
    characterName,
    valores
  );

  alert("Personagem salvo!");
};


  const layout = modelData?.componente?.map((comp: any) => ({
    i: comp.id,
    x: comp.x,
    y: comp.y,
    w: comp.w,
    h: comp.h,
  }));

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-white">Criar Personagem</h2>

      {/* Seleção de modelo */}
      <select
        value={selectedModelId}
        onChange={(e) => setSelectedModelId(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="">Selecione um modelo de ficha</option>
        {models.map((m) => (
          <option key={m.id} value={m.id}>
            {m.data.nome || m.id}
          </option>
        ))}
      </select>

      {/* Nome do personagem */}
      <input
        placeholder="Nome do Personagem"
        className="p-2 border rounded w-full"
        value={characterName}
        onChange={(e) => setCharacterName(e.target.value)}
      />

      {/* Renderização do layout com os componentes */}
      {modelData && (
      <div style={{ minHeight: GRID_HEIGHT }} className="relative">
        <GridLayout
          className="layout"
          cols={GRID_COLS}
          rowHeight={ROW_HEIGHT}
          width={window.innerWidth - 32}
          layout={layout} // <- CONTROLADO!
          isResizable={false}
          isDraggable={false}
          compactType={null} // <- sem compactação
          preventCollision={true}
          useCSSTransforms={true}
        >

          {modelData.componente.map((comp: any) => (
            <div key={comp.id} className="bg-gray-800 p-2 rounded">

              {comp.type === "atributo" && (
                <AtributoDisplay
                  nome={comp.nome}
                  valorInicial={valores[comp.id] as number}
                  formulaMod={systemData?.formulaModificador}
                  onChange={(valor) =>
                    setValores((prev) => ({ ...prev, [comp.id]: valor }))
                  }
                />
              )}

              {comp.type === "texto" && (
                <TextoDisplay
                  nome={comp.nome}
                  textoInicial={valores[comp.id] as string}
                  onChange={(texto) =>
                    setValores((prev) => ({ ...prev, [comp.id]: texto }))
                  }
                />
              )}
            </div>
          ))}
        </GridLayout>
      </div>
    )}

      {/* Botão de salvar */}
      {modelData && (
        <button
          onClick={handleSalvar}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Salvar Personagem
        </button>
      )}
    </div>
  );
}
