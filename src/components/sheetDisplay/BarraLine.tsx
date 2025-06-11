import { useEffect, useState } from "react";

interface BarraDisplayProps {
  nome: string;
  valorAtual?: number | "";
  valorTotal?: number | "";
  cor?: string;
  onChange?: (valorAtual: number | "", valorTotal: number | "") => void;
}

export default function BarraDisplay({
  nome,
  valorAtual = "",
  valorTotal = "",
  cor = "#a16207",
  onChange,
}: BarraDisplayProps) {
  const [atual, setAtual] = useState<number | "">(valorAtual);
  const [total, setTotal] = useState<number | "">(valorTotal);

  useEffect(() => {
    if (onChange) onChange(atual, total);
  }, [atual, total]);

  const percent =
    typeof atual === "number" &&
    typeof total === "number" &&
    total > 0
      ? Math.min((atual / total) * 100, 100)
      : 0;

  return (
    <div className="flex flex-col w-full h-full gap-1 rounded bg-gray-800 shadow p-2 items-center">
      {/* Nome do campo no topo */}
      <div className="w-full h-1/6 mb-2 p-2 font-semibold bg-gray-700 text-white rounded select-none flex items-center justify-center">
        {nome}
      </div>
      {/* Campos numéricos ocupando a linha inteira */}
      <div className="flex h-4/6 w-full gap-2 mb-2">
        <input
          type="number"
          min={0}
          value={atual}
          onChange={(e) => {
            const v = e.target.value;
            setAtual(v === "" ? "" : Number(v));
          }}
          className="w-1/2 p-2 text-3xl text-center font-semibold bg-gray-700 text-white rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="Atual"
        />
        <input
          type="number"
          min={1}
          value={total}
          onChange={(e) => {
            const v = e.target.value;
            setTotal(v === "" ? "" : Math.max(1, Number(v)));
          }}
          className="w-1/2 p-2 text-3xl text-center font-semibold bg-gray-700 text-white rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="Total"
        />
      </div>
      {/* Barra de progresso */}
      <div className="w-full h-1/6 bg-gray-600 rounded relative flex items-center">
        <div
          className="h-5 rounded transition-all duration-300"
          style={{
            width: `${percent}%`,
            backgroundColor: cor,
          }}
        />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-white font-bold select-none">
          {(atual === "" ? "-" : atual)} / {(total === "" ? "-" : total)}
        </span>
      </div>
    </div>
  );
}