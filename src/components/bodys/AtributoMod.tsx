// src/components/AtributoMod.tsx
import { useEffect, useState } from "react";
import { calcularModificador } from "../../backend/caluladora";

interface AtributoModProps {
  formulaMod: string;
  onChange?: (nome: string, valor: number) => void;
}

export default function AtributoMod({ formulaMod, onChange }: AtributoModProps) {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState<number>(0);
  const [modificador, setModificador] = useState<number>(0);

  useEffect(() => {
    setModificador(calcularModificador(valor, formulaMod));
    if (onChange) onChange(nome, valor);
  }, [valor, nome, formulaMod]);

  return (
    <div className="drag-handle border rounded space-y-2 bg-gray-800 shadow">
      
      <input
        type="text"
        placeholder="Nome do Atributo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-full border-b p-1 font-semibold"
      />

      <div className="flex items-end gap-2">
        <input
            type="number"
            value={valor}
            onChange={(e) => setValor(parseInt(e.target.value))}
            className="max-w-[100px] text-2xl text-center border p-2 rounded"
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
