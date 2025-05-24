import { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
// imports backend
import { createSheetModel, getSystems, saveSheetModel } from "../backend/firestore";
import { getCurrentUser } from "../backend/auth";

import AtributoMod from "../components/bodys/AtributoMod";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";


export default function CriarModelo() {
  const [systems, setSystems] = useState<{ id: string; data: any }[]>([]);
  const [selectedSystemId, setSelectedSystemId] = useState("");
  const [selectedSystemData, setSelectedSystemData] = useState<any>(null);
  const [modelName, setModelName] = useState("");
  const [loading, setLoading] = useState(false);
  const [componentes, setComponentes] = useState<
    { i: string; x: number; y: number; w: number; h: number }[]
  >([]);
  const [componenteNomes, setComponenteNomes] = useState<Record<string, string>>({});

  const user = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSystems() {
      try {
        const systemsList = await getSystems();
        setSystems(systemsList);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSystems();
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
      const modelId = await createSheetModel(user.uid);

      const componentesParaSalvar = componentes.map((attr) => ({
        id: attr.i,
        nome: componenteNomes[attr.i] || "Sem nome",
        x: attr.x,
        y: attr.y,
        w: attr.w,
        h: attr.h,
      }));

      await saveSheetModel(user.uid, modelId, selectedSystemId, modelName, componentesParaSalvar);

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

  const GRID_COLS = 12;
  const ITEM_WIDTH = 1;
  const ITEM_HEIGHT = 1;

  const adicionarAtributo = () => {
    if (!selectedSystemData) return alert("Selecione um sistema primeiro!");

    const isOccupied = (x: number, y: number) => {
      return componentes.some((a) => {
        const aEndX = a.x + a.w;
        const aEndY = a.y + a.h;
        return (
          x < aEndX &&
          x + ITEM_WIDTH > a.x &&
          y < aEndY &&
          y + ITEM_HEIGHT > a.y
        );
      });
    };

    let found = false;
    let posX = 0;
    let posY = 0;

    for (let y = 0; !found && y < 100; y++) {
      for (let x = 0; x <= GRID_COLS - ITEM_WIDTH; x++) {
        if (!isOccupied(x, y)) {
          posX = x;
          posY = y;
          found = true;
          break;
        }
      }
    }

    setComponentes((prev) => [
      ...prev,
      {
        i: crypto.randomUUID(),
        x: posX,
        y: posY,
        w: ITEM_WIDTH,
        h: ITEM_HEIGHT,
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

      {/* Área de componentes */}
      <div className="flex-grow overflow-auto p-4">
        {selectedSystemData && (
          <GridLayout
            className="layout"
            cols={12}
            rowHeight={120}
            width={window.innerWidth - 32}
            isResizable={false}
            isDraggable={true}
            compactType={null}
            preventCollision={false}
            draggableHandle=".drag-handle"
            layout={componentes}
            onLayoutChange={(newLayout) => {
              setComponentes(
                newLayout.map((item) => ({
                  i: item.i,
                  x: item.x,
                  y: item.y,
                  w: item.w,
                  h: item.h,
                }))
              );
            }}
          >
            {componentes.map((attr) => (
              <div
                key={attr.i}
                data-grid={{
                  i: attr.i,
                  x: attr.x,
                  y: attr.y,
                  w: attr.w,
                  h: attr.h,
                }}
                className="relative bg-gray-800 rounded p-2"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removerAtributo(attr.i);
                  }}
                  className="absolute top-1 right-1 text-red-400 hover:text-red-600 z-10"
                >
                  <X size={18} />
                </button>
                <AtributoMod
                  formulaMod={selectedSystemData?.formulaModificador}
                  onChange={(nome, valor) => {
                    setComponenteNomes((prev) => ({
                      ...prev,
                      [attr.i]: nome,
                    }));
                  }}
                />
              </div>
            ))}
          </GridLayout>
        )}
      </div>
    </div>
  );
}
