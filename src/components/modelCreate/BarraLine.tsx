import { useEffect, useState } from "react";

interface BarraProps {
  onChange?: (nome: string, vidaAtual: number | "", vidaTotal: number | "", cor: string) => void;
  initialNome?: string;
  initialVidaAtual?: number | "";
  initialVidaTotal?: number | "";
  initialCor?: string;
}

export default function BarraLine({
  onChange,
  initialNome,
  initialVidaAtual = "",
  initialVidaTotal = "",
  initialCor = "#a16207", // cor padrão semelhante ao amber-800
}: BarraProps) {
  const [nome, setNome] = useState(initialNome || "");
  const [vidaAtual, setVidaAtual] = useState<number | "">(initialVidaAtual);
  const [vidaTotal, setVidaTotal] = useState<number | "">(initialVidaTotal);
  const [cor, setCor] = useState<string>(initialCor);

  useEffect(() => {
    if (onChange) onChange(nome, vidaAtual, vidaTotal, cor);
  }, [nome, vidaAtual, vidaTotal, cor]);

    typeof vidaAtual === "number" &&
    typeof vidaTotal === "number" &&
    vidaTotal > 0
      ? Math.round((vidaAtual / vidaTotal) * 100)
      : 0;

  return (
    <div className="drag-handle flex flex-col w-full h-full gap-1  rounded bg-gray-800 shadow p-2 justify-center">
      {/* Nome do campo no topo */}
      <input
        type="text"
        placeholder="Nome do campo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-full mb-2 p-1 flex-1/4 font-semibold bg-gray-700 text-white  rounded drag-cancel text-center"
      />
      {/* Campos numéricos ocupando a linha inteira */}
      <div className="flex flex-1/2 w-full gap-2 mb-2">
        <input
          type="number"
          min={0}
          value={vidaAtual}
          onChange={(e) => {
            const v = e.target.value;
            setVidaAtual(v === "" ? "" : Number(v));
          }}
          className="w-1/2 p-2 text-3xl text-center font-semibold bg-gray-700 text-white rounded drag-cancel [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="Atual"
        />
        <input
          type="number"
          min={1}
          value={vidaTotal}
          onChange={(e) => {
            const v = e.target.value;
            setVidaTotal(v === "" ? "" : Math.max(1, Number(v)));
          }}
          className="w-1/2 p-2 text-3xl text-center font-semibold bg-gray-700 text-white rounded drag-cancel [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="Total"
        />
      </div>
      {/* Barra de progresso com input de cor */}
      <div className="w-full h-5 bg-gray-600 rounded relative flex items-center">
        <div
          className="h-5 rounded transition-all duration-300"
          style={{
            width:
              typeof vidaAtual === "number" &&
              typeof vidaTotal === "number" &&
              vidaTotal > 0
                ? `${Math.min((vidaAtual / vidaTotal) * 100, 100)}%`
                : "0%",
            backgroundColor: cor,
          }}
        />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-white font-bold select-none drag-cancel">
          {(vidaAtual === "" ? "-" : vidaAtual)} / {(vidaTotal === "" ? "-" : vidaTotal)}
        </span>
        {/* Elipse de cor e input de cor fora da barra */}
        <div className="flex items-left drag-cancel" style={{ position: "absolute", right: "-0.5rem" }}>
          <input
            type="color"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            className="w-2 h-6  border-none bg-transparent cursor-pointer"
            title="Escolher cor da barra"
            style={{ background: "none" }}
          />
        </div>
      </div>
    </div>
  );
}