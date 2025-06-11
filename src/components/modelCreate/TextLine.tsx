import { useEffect, useState } from "react";

interface TextoModProps {
  onChange?: (nome: string, valor: string) => void;
  initialNome?: string;
}


export default function TextoMod({ onChange, initialNome }: TextoModProps) {
  const [nome, setNome] = useState(initialNome || "");

  const [texto, setTexto] = useState("");

  useEffect(() => {
    if (onChange) onChange(nome, texto);
  }, [nome, texto]);

  return (
      <div className="w-full h-full flex flex-row justify-center bg-gray-800 items-center gap-2 drag-handle">
        <input
          type="text"
          placeholder="Nome do campo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="flex-1/3 h-[80%] flex items-center justify-center text-center bg-gray-700 rounded drag-cancel"
        />

        <input
          type="text"
          placeholder="Digite o texto aqui..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="flex-2/3 h-[80%] rounded p-2 bg-gray-700 drag-cancel"
        />
        <div></div>
      </div>
  );
}
