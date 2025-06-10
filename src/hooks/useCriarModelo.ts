import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createSheetModel,
  getSheetModel,
  getSystems,
  saveSheetModel,
} from "../backend/firestore";
import { getCurrentUser } from "../backend/auth";
import { debounce } from "lodash";

type TipoComponente = "atributo" | "texto" | "textarea" | "bonus" | "pericia" | "numero" | "barra";

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
  const [modeloId, setModeloId] = useState<string | null>(null);
  const [periciaAtributos, setPericiaAtributos] = useState<Record<string, string>>({});
  const [componenteCores, setComponenteCores] = useState<Record<string, string>>({});

  const user = getCurrentUser();
  const navigate = useNavigate();
  const { modelId } = useParams<{ modelId: string }>();

  const GRID_COLS = 12;
  const NUM_ROWS = 15;
  const ROW_HEIGHT = 50;
  const GRID_HEIGHT = NUM_ROWS * ROW_HEIGHT;

  // Carregar sistemas e modelo (se houver)
  useEffect(() => {
    async function fetchData() {
      try {
        const systemsList = await getSystems();
        setSystems(systemsList);

        if (modelId && user) {
          const modelData = await getSheetModel(user.uid, modelId);
          if (!modelData) return;

          setModeloId(modelId);
          setModelName(modelData.nome || "");
          setSelectedSystemId(modelData.sistema || "");
          setSelectedSystemData(systemsList.find(s => s.id === modelData.sistema)?.data || null);
          setIdentificadorId(modelData.identificadorId || "");

          const comps = modelData.componente || [];

          setComponentes(
            comps.map((comp: any) => ({
              i: comp.id,
              type: comp.type,
              x: comp.x,
              y: comp.y,
              w: comp.w,
              h: comp.h,
            }))
          );

          setComponenteNomes(() => {
            const nomes: Record<string, string> = {};
            comps.forEach((comp: any) => {
              nomes[comp.id] = comp.nome || "Sem nome";
            });
            return nomes;
          });

          setComponenteCores(() => {
            const cores: Record<string, string> = {};
            comps.forEach((comp: any) => {
              if (comp.type === "barra") {
                cores[comp.id] = comp.cor || "#a16207";
              }
            });
            return cores;
          });

          setPericiaAtributos(() => {
            const map: Record<string, string> = {};
            comps.forEach((comp: any) => {
              if (comp.type === "pericia") {
                map[comp.id] = comp.atributoId || "";
              }
            });
            return map;
          });

        } else if (!modelId && user) {
          // Novo modelo: inicializa com um componente texto
          const id = crypto.randomUUID();
          setModeloId(null);
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
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    fetchData();
  }, [modelId, user]);

  // Atualiza selectedSystemData ao mudar selectedSystemId
  useEffect(() => {
    const system = systems.find((s) => s.id === selectedSystemId);
    setSelectedSystemData(system?.data || null);
  }, [selectedSystemId, systems]);

  // Função que faz o save real (manual ou auto)
  const salvarModelo = async () => {
    if (!user || !selectedSystemId || !modelName) return;

    setLoading(true);

    try {
      if (!modeloId) {
        // Cria um novo documento
        const newId = await createSheetModel(user.uid);
        setModeloId(newId);
        await saveSheetModel(
          user.uid,
          newId,
          selectedSystemId,
          modelName,
          componentes.map((c) => ({
            id: c.i,
            nome: componenteNomes[c.i] || "Sem nome",
            type: c.type,
            x: c.x,
            y: c.y,
            w: c.w,
            h: c.h,
            ...(c.type === "pericia" ? { atributoId: periciaAtributos[c.i] || "" } : {}),
            ...(c.type === "barra" ? { cor: componenteCores[c.i] || "#a16207" } : {}),
            
            
          })),
          identificadorId
        );
      } else {
        // Atualiza o documento existente
        await saveSheetModel(
          user.uid,
          modeloId,
          selectedSystemId,
          modelName,
          componentes.map((c) => ({
            id: c.i,
            nome: componenteNomes[c.i] || "Sem nome",
            type: c.type,
            x: c.x,
            y: c.y,
            w: c.w,
            h: c.h,
            ...(c.type === "pericia" ? { atributoId: periciaAtributos[c.i] || "" } : {}),
            ...(c.type === "barra" ? { cor: componenteCores[c.i] || "#a16207" } : {}),
          })),
          identificadorId
        );
      }
    } catch (error) {
      console.error("Erro ao salvar modelo:", error);
    } finally {
      setLoading(false);
    }
  };

  // debounce para auto-save com delay de 1 segundo
  const debouncedAutoSave = useCallback(
    debounce(() => {
      if (componentes.length === 0) return; // não salva se não tiver componentes

      salvarModelo();
    }, 1000),
    [componentes, componenteNomes, modelName, selectedSystemId, identificadorId, modeloId]
  );

  // Auto-save ao mudar dados do modelo
  useEffect(() => {
    debouncedAutoSave();

    // Cancelar debounce ao desmontar componente
    return () => {
      debouncedAutoSave.cancel();
    };
  }, [componentes, componenteNomes, modelName, selectedSystemId, identificadorId, modeloId, debouncedAutoSave]);

  // Funções para adicionar/remover componentes (mantendo lógica original)
  const encontrarPosicaoLivre = (largura: number, altura: number) => {
    for (let y = 0; y < 100; y++) {
      for (let x = 0; x <= GRID_COLS - largura; x++) {
        const ocupado = componentes.some((c) => {
          const cEndX = c.x + c.w;
          const cEndY = c.y + c.h;
          return x < cEndX && x + largura > c.x && y < cEndY && y + altura > c.y;
        });
        if (!ocupado) return { x, y };
      }
    }
    return { x: 0, y: 100 };
  };

  const adicionarAtributo = () => {
    if (!selectedSystemData) return alert("Selecione um sistema primeiro!");
    const { x, y } = encontrarPosicaoLivre(1, 1);
    const id = crypto.randomUUID();
    setComponentes((prev) => [
      ...prev,
      { i: id, type: "atributo", x, y, w: 1, h: 2 },
    ]);
    setComponenteNomes((prev) => ({ ...prev, [id]: "" }));
  };

  const adicionarTexto = () => {
    if (!selectedSystemData) return alert("Selecione um sistema primeiro!");
    const { x, y } = encontrarPosicaoLivre(4, 1);
    const id = crypto.randomUUID();
    setComponentes((prev) => [
      ...prev,
      { i: id, type: "texto", x, y, w: 4, h: 1 },
    ]);
    setComponenteNomes((prev) => ({ ...prev, [id]: "" }));
  };

  const adicionarTextArea = () => {
    if (!selectedSystemData) return alert("Selecione um sistema primeiro!");
    const { x, y } = encontrarPosicaoLivre(4, 4);
    const id = crypto.randomUUID();
    setComponentes((prev) => [
      ...prev,
      { i: id, type: "textarea", x, y, w: 4, h: 4 },
    ]);
    setComponenteNomes((prev) => ({ ...prev, [id]: "" }));
  };

  const adicionarBonus = () => {
    if (!selectedSystemData) return alert("Selecione um sistema primeiro!");
    const { x, y } = encontrarPosicaoLivre(1, 2);
    const id = crypto.randomUUID();
    setComponentes((prev) => [
      ...prev,
      { i: id, type: "bonus", x, y, w: 1, h: 2 },
    ]);
    setComponenteNomes((prev) => ({ ...prev, [id]: "" }));
  };

  const adicionarPericia = () => {
    if (!selectedSystemData) return alert("Selecione um sistema primeiro!");
    const { x, y } = encontrarPosicaoLivre(4, 1);
    const id = crypto.randomUUID();
    setComponentes((prev) => [
      ...prev,
      { i: id, type: "pericia", x, y, w: 4, h: 1 },
    ]);
    setComponenteNomes((prev) => ({ ...prev, [id]: "" }));
  };

  
  const adicionarNumero = () => {
    if (!selectedSystemData) return alert("Selecione um sistema primeiro!");
    const { x, y } = encontrarPosicaoLivre(2, 1);
    const id = crypto.randomUUID();
    setComponentes((prev) => [
      ...prev,
      { i: id, type: "numero", x, y, w: 2, h: 1 },
    ]);
    setComponenteNomes((prev) => ({ ...prev, [id]: "" }));
  };

  const adicionarBarra = () => {
    if (!selectedSystemData) return alert("Selecione um sistema primeiro!");
    const { x, y } = encontrarPosicaoLivre(2, 3);
    const id = crypto.randomUUID();
    setComponentes((prev) => [
      ...prev,
      { i: id, type: "barra", x, y, w: 2, h: 3},
    ]);
    setComponenteNomes((prev) => ({ ...prev, [id]: "" }));
  };


  const removerComponente = (i: string) => {
    setComponentes((prev) => prev.filter((a) => a.i !== i));
    setComponenteNomes((prev) => {
      const novo = { ...prev };
      delete novo[i];
      return novo;
    });
    if (identificadorId === i) setIdentificadorId("");
  };

  const handleSystemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSystemId(event.target.value);
  };

  const handleSave = async () => {
    await salvarModelo();
    alert("Modelo salvo com sucesso!");
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
    modeloId,
    periciaAtributos,
    componenteCores,
    handleSystemChange,
    handleSave,
    adicionarAtributo,
    adicionarTexto,
    adicionarTextArea,
    adicionarBonus,
    adicionarPericia,
    adicionarNumero,
    adicionarBarra,
    removerComponente,
    setModelName,
    setComponenteCores,
    setComponenteNomes,
    setComponentes,
    setIdentificadorId,
    setPericiaAtributos,
    GRID_COLS,
    GRID_HEIGHT,
    ROW_HEIGHT,
  };
}
