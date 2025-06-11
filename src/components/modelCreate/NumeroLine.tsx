import { useEffect, useState } from "react";

interface NumeroModProps {
  onChange?: (nome: string) => void;
  initialNome?: string;
}

export default function NumeroMod({ onChange, initialNome }: NumeroModProps) {
  const [nome, setNome] = useState(initialNome || "");

  useEffect(() => {
    if (onChange) onChange(nome);
  }, [nome]);

  return (
    <div className="drag-handle w-full h-full flex flex-row justify-center bg-gray-800 shadow text-white items-center gap-2 rounded ">
      <div></div>
      <input
        type="text"
        placeholder="Nome do campo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="font-semibold w-2/3 text-center truncate drag drag-cancel"
      />
      <input
        type="number"
        className="ml-auto w-1/3 rounded p-2 bg-gray-700  text-white text-center drag-cancel [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        placeholder="0"
      />
      <div></div>
    </div>
  );
}