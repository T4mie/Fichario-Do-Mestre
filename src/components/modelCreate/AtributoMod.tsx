// src/components/sheet/AtributoMod.tsx
import { useEffect, useState } from "react";
import { calcularModificador } from "../../backend/caluladora";

interface AtributoModProps {
  formulaMod: string;
  onChange?: (nome: string, valor: number) => void;
  initialNome?: string;
}


export default function AtributoMod({ formulaMod, onChange, initialNome }: AtributoModProps) {
  const [nome, setNome] = useState(initialNome || "");
  const [valor, setValor] = useState<number>(0);
  const [modificador, setModificador] = useState<number>(0);

  useEffect(() => {
    setModificador(calcularModificador(valor, formulaMod));
    if (onChange) onChange(nome, valor);
  }, [valor, nome, formulaMod]);

  return (
    <div className=" drag-handle border rounded bg-gray-800 shadow w-[100%] h-[100%]">
      
      <input
        type="text"
        placeholder="Nome do Atributo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-full border-b p-1 font-semibold drag-cancel text-sm text-center truncate"
      />

      <div className="flex flex-col items-center text-center gap-1 drag-handle justify-center ">
        <input
            type="number"
            value={valor}
            onChange={(e) => setValor(parseInt(e.target.value))}
            className="w-12 h-12 text-2xl text-center border rounded mt-1 drag-cancel [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Valor"
        />
        <div className="text-sm bg-gray-800 text-white px-1 mb-1 rounded border text-center drag-cancel">
            {modificador >= 0 ? "+" : ""}
            {modificador}
        </div>
        </div>

    </div>
  );
}
