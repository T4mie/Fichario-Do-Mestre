import { useEffect, useState } from "react";

interface TextAreaModProps {
  onChange?: (nome: string, valor: string) => void;
  initialNome?: string;
}

export default function TextAreaMod({ onChange, initialNome }: TextAreaModProps) {
  const [nome, setNome] = useState(initialNome || "");
  const [texto, setTexto] = useState("");

  useEffect(() => {
    if (onChange) onChange(nome, texto);
  }, [nome, texto]);

  return (
    <div className="flex flex-col h-full rounded bg-gray-800 shadow p-2 drag-handle">
      <input
        type="text"
        placeholder="Nome do campo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="mb-2 p-1 font-semibold bg-gray-700 text-white  rounded drag-cancel"
      />
      <div className="flex-1 flex justify-end">
        <textarea
          placeholder="Digite o texto aqui..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="w-full h-full min-h-[80px] max-h-[200px] p-2 font-semibold bg-gray-700 text-white rounded resize-none drag-cancel"
        />
      </div>
    </div>
  );
}