import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSheetModel, getSheetModel, getSystems, saveSheetModel } from "../backend/firestore";
import { getCurrentUser } from "../backend/auth";

type TipoComponente = "atributo" | "texto" | "textarea";

export function useCriarModelo() {
  const [systems, setSystems] = useState<{ id: string; data: any }[]>([]);
  const [selectedSystemId, setSelectedSystemId] = useState("");
  const [selectedSystemData, setSelectedSystemData] = useState<any>(null);
  const [modelName, setModelName] = useState("");
  const [componentes, setComponentes] = useState<
    { i: string; type: TipoComponente; x: number; y: number; w: number; h: number }[]
  >([]);
  const [componenteNomes, setComponenteNomes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [identificadorId, setIdentificadorId] = useState<string>("");

  const user = getCurrentUser();
  const navigate = useNavigate();
  const { modelId } = useParams<{ modelId: string }>();

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
          setIdentificadorId(modelData.identificadorId || "");

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

  useEffect(() => {
  if (!modelId) {
    const id = crypto.randomUUID();
    setComponentes([
      {
        i: id,
        type: "texto",
        x: 0,
        y: 0,
        w: 4,
        h: 1,
      },
    ]);
    setComponenteNomes({ [id]: "" });
    setIdentificadorId(id);
  }
}, [modelId]);

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

      await saveSheetModel(user.uid, finalModelId, selectedSystemId, modelName, componentesParaSalvar, identificadorId);

      alert("Modelo salvo com sucesso!");
      setModelName("");
      setComponentes([]);
      setComponenteNomes({});
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
    return { x: 0, y: 100 };
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

  const adicionarTextArea = () => {
    if (!selectedSystemData) return alert("Selecione um sistema primeiro!");
    const { x, y } = encontrarPosicaoLivre(4, 4);
    setComponentes((prev) => [
      ...prev,
      {
        i: crypto.randomUUID(),
        type: "textarea",
        x,
        y,
        w: 4,
        h: 4,
      },
    ]);
  };

  const removerComponente = (i: string) => {
    setComponentes((prev) => prev.filter((a) => a.i !== i));
  };

  return {
    systems,
    selectedSystemId,
    selectedSystemData,
    modelName,
    componentes,
    componenteNomes,
    loading,
    identificadorId,
    handleSystemChange,
    handleSave,
    adicionarAtributo,
    adicionarTexto,
    adicionarTextArea,
    removerComponente,
    setModelName,
    setComponenteNomes,
    setComponentes,
    setIdentificadorId,
    GRID_COLS,
    GRID_HEIGHT,
    ROW_HEIGHT
  };
}
