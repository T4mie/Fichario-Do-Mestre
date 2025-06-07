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
      <div className="drag-handle flex gap-1 border rounded bg-gray-800 shadow">
        <input
          type="text"
          placeholder="Nome do campo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="m-2 w-[150px] p-1 font-semibold bg-gray-700 text-white border-b rounded drag-cancel"
        />

        <input
          type="text"
          placeholder="Digite o texto aqui..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="m-2 w-4xl p-1 font-semibold bg-gray-700 text-white rounded drag-cancel"
        />
      </div>
  );
}
