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
    <div className="flex flex-col drag-handle rounded bg-gray-800 shadow w-[100%] h-[100%] p-2 gap-1">
      
      <input
        type="text"
        placeholder="Nome do Atributo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-full h-1/4  bg-gray-700 rounded p-1 font-semibold drag-cancel text-sm text-center truncate"
      />
      <input
          type="number"
          value={valor}
          onChange={(e) => setValor(parseInt(e.target.value))}
          className="w-full h-2/4 text-2xl text-center bg-gray-700 drag-cancel rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="Valor"
      />
      <div className=" h-1/4  text-white w-full rounded text-center drag-hadle content-center bg-gray-700" style={{fontSize:"auto"}}>
          {modificador >= 0 ? "+" : ""}
          {modificador}
      </div>
    </div>
  );
}
