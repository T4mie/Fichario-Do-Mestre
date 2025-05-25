// src/pages/CriarModelo.tsx
import { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import { useNavigate, useParams } from "react-router-dom";
import { X } from "lucide-react";
// imports backend
import { createSheetModel, getSheetModel, getSystems, saveSheetModel } from "../backend/firestore";
import { getCurrentUser } from "../backend/auth";

import AtributoMod from "../components/modelCreate/AtributoMod";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import TextoMod from "../components/modelCreate/TextLine";


export default function CriarModelo() {
  // Estados sobre o sistema
  const [systems, setSystems] = useState<{ id: string; data: any }[]>([]);
  const [selectedSystemId, setSelectedSystemId] = useState("");
  const [selectedSystemData, setSelectedSystemData] = useState<any>(null);

  // modelo
  const [modelName, setModelName] = useState("");

  // e componentes
  const [componenteNomes, setComponenteNomes] = useState<Record<string, string>>({});
  const { modelId } = useParams<{ modelId: string }>();
  const [componentes, setComponentes] = useState<
    { i: string; type: TipoComponente; x: number; y: number; w: number; h: number }[]
  >([]);
  type TipoComponente = "atributo" | "texto";
  
  // estado de loading
  const [loading, setLoading] = useState(false);
  
  const user = getCurrentUser();
  const navigate = useNavigate();

  const GRID_COLS = 12;
  const NUM_ROWS = 20;
  const ROW_HEIGHT = 55;
  const GRID_HEIGHT = NUM_ROWS * ROW_HEIGHT;

  useEffect(() => {
  async function fetchData() {
    try {
      const systemsList = await getSystems();
      setSystems(systemsList);

      if (modelId && user) {
        const modelData = await getSheetModel(user.uid, modelId);
        setModelName(modelData.nome || "");
        setSelectedSystemId(modelData.sistema || "");
        setSelectedSystemData(systemsList.find(s => s.id === modelData.sistema)?.data || null);

        const comps = modelData.componente || [];

        setComponentes(comps.map((comp: any) => ({
          i: comp.id,
          type: comp.type,
          x: comp.x,
          y: comp.y,
          w: comp.w,
          h: comp.h,
        })));

        setComponenteNomes(() => {
          const nomes: Record<string, string> = {};
          comps.forEach((comp: any) => {
            nomes[comp.id] = comp.nome || "Sem nome";
          });
          return nomes;
        });
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }

  fetchData();
}, []);


  const handleSystemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = event.target.value;
    setSelectedSystemId(id);
    const system = systems.find((s) => s.id === id);
    setSelectedSystemData(system?.data || null);
  };

  const handleSave = async () => {
    if (!user || !selectedSystemId || !modelName) return;
    setLoading(true);
    try {
      const finalModelId = modelId || await createSheetModel(user.uid);

      const componentesParaSalvar = componentes.map((c) => ({
        id: c.i,
        nome: componenteNomes[c.i] || "Sem nome",
        type: c.type,
        x: c.x,
        y: c.y,
        w: c.w,
        h: c.h,
      }));

      await saveSheetModel(user.uid, finalModelId, selectedSystemId, modelName, componentesParaSalvar);


      alert("Modelo salvo com sucesso!");
      setModelName("");
      setComponentes([]);
      setComponenteNomes({});

      // Redireciona após o sucesso
      navigate("/user");
    } catch (error) {
      alert("Erro ao salvar modelo.");
    } finally {
      setLoading(false);
    }
  };

  const encontrarPosicaoLivre = (largura: number, altura: number) => {
  for (let y = 0; y < 100; y++) {
    for (let x = 0; x <= GRID_COLS - largura; x++) {
      const ocupado = componentes.some((c) => {
        const cEndX = c.x + c.w;
        const cEndY = c.y + c.h;
        return (
          x < cEndX &&
          x + largura > c.x &&
          y < cEndY &&
          y + altura > c.y
        );
      });
      if (!ocupado) return { x, y };
    }
  }
  return { x: 0, y: 100 }; // fallback
};

const adicionarAtributo = () => {
  if (!selectedSystemData) return alert("Selecione um sistema primeiro!");
  const { x, y } = encontrarPosicaoLivre(1, 1);
  setComponentes((prev) => [
    ...prev,
    {
      i: crypto.randomUUID(),
      type: "atributo",
      x,
      y,
      w: 1,
      h: 2,
    },
  ]);
};

const adicionarTexto = () => {
  if (!selectedSystemData) return alert("Selecione um sistema primeiro!");
  const { x, y } = encontrarPosicaoLivre(4, 1);
  setComponentes((prev) => [
    ...prev,
    {
      i: crypto.randomUUID(),
      type: "texto",
      x,
      y,
      w: 4,
      h: 1,
    },
  ]);
};


  const removerAtributo = (i: string) => {
    setComponentes((prev) => prev.filter((a) => a.i !== i));
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Barra de controle */}
      <div className="flex items-center gap-4 p-4 bg-gray-900 text-white">
        <select
          value={selectedSystemId}
          onChange={handleSystemChange}
          className="border p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione o Sistema...</option>
          {systems.map((system) => (
            <option key={system.id} value={system.id}>
              {system.data.nome || system.id}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          placeholder="Nome do Modelo"
          className="border p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={adicionarAtributo}
          className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
        >
          + Atributo
        </button>

        <button
          onClick={adicionarTexto}
          className="bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-700"
        >
          + Texto
        </button>

        <button
          onClick={handleSave}
          disabled={loading || !modelName || !selectedSystemId}
          className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>

        <button
          onClick={() => navigate("/user")}
          className="ml-auto bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
        >
          Voltar
        </button>
      </div>

       {/* Área de componentes com altura fixa do grid */}
      <div className="flex-grow overflow-auto p-4">
        {selectedSystemData && (
          <div style={{ minHeight: GRID_HEIGHT }} className="relative">
            <GridLayout
              className="layout"
              cols={GRID_COLS}
              rowHeight={ROW_HEIGHT}
              width={window.innerWidth - 32}
              isResizable={false}
              isDraggable={true}
              compactType={null}
              preventCollision={false}
              draggableHandle=".drag-handle"
              layout={componentes}
              onLayoutChange={(newLayout) => {
                setComponentes((prev) =>
                  newLayout.map((item) => {
                    const old = prev.find((p) => p.i === item.i);
                    return {
                      i: item.i,
                      x: item.x,
                      y: item.y,
                      w: item.w,
                      h: item.h,
                      type: old?.type || "atributo",
                    };
                  })
                );
              }}
            >
              {componentes.map((comp) => (
                <div
                  key={comp.i}
                  data-grid={{
                    i: comp.i,
                    x: comp.x,
                    y: comp.y,
                    w: comp.w,
                    h: comp.h,
                  }}
                  className="relative bg-gray-800 rounded p-2"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removerAtributo(comp.i);
                    }}
                    className="absolute top-1 right-1 text-red-400 hover:text-red-600 z-10"
                  >
                    <X size={18} />
                  </button>

                  {comp.type === "atributo" && (
                    <AtributoMod
                      formulaMod={selectedSystemData?.formulaModificador}
                      initialNome={componenteNomes[comp.i] || ""}
                      onChange={(nome, valor) => {
                        setComponenteNomes((prev) => ({
                          ...prev,
                          [comp.i]: nome,
                        }));
                      }}
                    />
                  )}

                  {comp.type === "texto" && (
                    <TextoMod
                      initialNome={componenteNomes[comp.i] || ""}
                      onChange={(nome, valor) => {
                        setComponenteNomes((prev) => ({
                          ...prev,
                          [comp.i]: nome,
                        }));
                      }}
                    />
                  )}

                </div>
              ))}
            </GridLayout>
          </div>
        )}
      </div>
    </div>
  );
}