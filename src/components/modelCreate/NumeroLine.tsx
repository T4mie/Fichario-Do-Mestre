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
    <div className="drag-handle flex gap-1 border rounded bg-gray-800 shadow items-center">
      <input
        type="text"
        placeholder="Nome do campo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="m-2 w-[65%] p-1 font-semibold bg-gray-700 text-white border-b rounded drag-cancel"
      />
      <input
        type="number"
        className="m-2 w-1/2 p-1 font-semibold bg-gray-700 text-white rounded drag-cancel text-right opacity-60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        placeholder="0"
      />
    </div>
  );
}