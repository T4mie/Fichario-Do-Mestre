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
    <div className="flex flex-col drag-handle rounded bg-gray-800 shadow w-[100%] h-[100%] p-2 gap-1">
      <div className="w-full h-1/4  rounded p-1 font-semibold drag-cancel text-sm text-center truncate bg-gray-700">{nome}</div>
      <input
          type="number"
          value={valor}
          onChange={(e) => setValor(parseInt(e.target.value))}
          className="w-full h-2/4 text-2xl text-center bg-gray-700 drag-cancel rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="Valor"
      />
      <div className=" text-white w-full h-1/4 rounded text-center drag-hadle content-center bg-gray-700" style={{fontSize:"larger"}}>
          {modificador >= 0 ? "+" : ""}
          {modificador}
      </div>
      
    </div>
  );
}
