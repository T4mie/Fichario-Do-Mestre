import GridLayout from "react-grid-layout";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import AtributoMod from "../components/modelCreate/AtributoMod";
import TextoMod from "../components/modelCreate/TextLine";
import TextAreaMod from "../components/modelCreate/TextArea";
import BonusMod from "../components/modelCreate/BonusMod";

import { useCriarModelo } from "../hooks/useCriarModelo";


export default function CriarModelo() {
  const {
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
    adicionarBonus,
    removerComponente,
    setModelName,
    setComponenteNomes,
    setComponentes,
    setIdentificadorId,
    GRID_COLS,
    GRID_HEIGHT,
    ROW_HEIGHT
  } = useCriarModelo();

  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center gap-4 p-4 bg-gray-900 text-white">
        <select
          value={selectedSystemId}
          onChange={handleSystemChange}
          className="border p-2 rounded text-black"
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
          className="border p-2 rounded text-black"
        />

        <button onClick={adicionarAtributo} >
          + Atributo
        </button>
        <button onClick={adicionarTexto}>
          + Texto
        </button>
        <button onClick={adicionarTextArea}>
          + Caixa de Texto
        </button>
        <button onClick={adicionarBonus}>
          + Bônus
        </button>
        <button
          onClick={handleSave}
          disabled={loading || !modelName || !selectedSystemId}
          className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
        <button onClick={() => navigate("/user")} className="ml-auto px-3 py-1 rounded">
          Voltar
        </button>
      </div>

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
              draggableCancel=".drag-cancel"
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
                <div key={comp.i} data-grid={comp} className="relative bg-gray-800 rounded group">
                  {/* Radio para identificador só para texto */}
                  {comp.type === "texto" && (
                    <input
                      type="radio"
                      name="identificador"
                      checked={identificadorId === comp.i}
                      onChange={() => setIdentificadorId(comp.i)}
                      className="absolute top-1 left-1"
                      title="Definir como identificador"
                    />
                  )}

                  {/* Botão de remover para todos os tipos */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        comp.type === "texto" &&
                        componentes.filter((c) => c.type === "texto").length === 1
                      ) {
                        // Não permite remover o único TextLine
                        return;
                      }
                      removerComponente(comp.i);
                    }}
                    className={`absolute top-1 right-1 text-red-400 hover:text-red-600 z-10 transition-opacity duration-200
                      ${
                        comp.type === "texto" && componentes.filter((c) => c.type === "texto").length === 1
                          ? "opacity-30 cursor-not-allowed"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    disabled={comp.type === "texto" && componentes.filter((c) => c.type === "texto").length === 1}
                  >
                    <X size={18} />
                  </button>

                  {/* Renderização do componente correto */}
                  {comp.type === "atributo" && (
                    <AtributoMod
                      formulaMod={selectedSystemData?.formulaModificador}
                      initialNome={componenteNomes[comp.i] || ""}
                      onChange={(nome) => {
                        setComponenteNomes((prev) => ({
                          ...prev,
                          [comp.i]: nome,
                        }));
                      }}
                    />
                  )}
                  {comp.type === "bonus" && (
                    <BonusMod
                      initialNome={componenteNomes[comp.i] || ""}
                      onChange={(nome) => {
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
                      onChange={(nome) => {
                        setComponenteNomes((prev) => ({
                          ...prev,
                          [comp.i]: nome,
                        }));
                      }}
                    />
                  )}
                  {comp.type === "textarea" && (
                    <TextAreaMod
                      initialNome={componenteNomes[comp.i] || ""}
                      onChange={(nome) => {
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
