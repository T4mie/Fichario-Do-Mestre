// src/components/sheetDisplay/AtributoMod.tsx
import { useEffect, useState } from "react";
import { calcularModificador } from "../../backend/caluladora";

interface AtributoDisplayProps {
  nome: string;
  valorInicial?: number;
  formulaMod: string;
  onChange?: (valor: number) => void;
}

export default function AtributoDisplay({
  nome,
  valorInicial = 0,
  formulaMod,
  onChange,
}: AtributoDisplayProps) {
  const [valor, setValor] = useState<number>(valorInicial);
  const [modificador, setModificador] = useState<number>(0);

  useEffect(() => {
    const mod = calcularModificador(valor, formulaMod);
    setModificador(mod);
    if (onChange) onChange(valor);
  }, [valor, formulaMod]);

  return (
    <div className=" drag-handle border rounded bg-gray-800 shadow w-[100%] h-[100%]">
      <div className="w-full border-b p-1 font-semibold drag-cancel text-sm text-center truncate">{nome}</div>

      <div className="flex flex-col items-center text-center gap-1 drag-handle justify-center">
        <input
          type="number"
          value={valor}
          onChange={(e) => setValor(parseInt(e.target.value))}
          className="w-12 h-12 text-2xl text-center border rounded mt-1 drag-cancel [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="0"
        />
        <div className="text-sm bg-gray-800 text-white px-1 mb-1 rounded border text-center drag-cancel">
          {modificador >= 0 ? "+" : ""}
          {modificador}
        </div>
      </div>
    </div>
  );
}
