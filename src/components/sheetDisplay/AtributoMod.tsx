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
    <div className="drag-handle border rounded space-y-2 bg-gray-800 shadow p-2 text-white">
      <div className="font-semibold border-b pb-1">{nome}</div>

      <div className="flex items-end gap-2">
        <input
          type="number"
          value={valor}
          onChange={(e) => setValor(parseInt(e.target.value))}
          className="max-w-[100px] text-2xl text-center border p-2 rounded bg-gray-700"
          placeholder="Valor"
        />
        <div className="text-sm bg-gray-800 text-white px-2 py-1 rounded border text-center">
          Mod: {modificador >= 0 ? "+" : ""}
          {modificador}
        </div>
      </div>
    </div>
  );
}
