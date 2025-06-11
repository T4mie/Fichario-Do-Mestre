import { useState, useEffect } from "react";

interface TextAreaDisplayProps {
  nome: string;
  textoInicial?: string;
  onChange?: (texto: string) => void;
}

export default function TextAreaDisplay({
  nome,
  textoInicial = "",
  onChange,
}: TextAreaDisplayProps) {
  const [texto, setTexto] = useState(textoInicial);

  useEffect(() => {
    if (onChange) onChange(texto);
  }, [texto]);

  return (
    <div className="flex flex-col h-full rounded bg-gray-800 shadow text-white p-2">
      <div className="font-semibold h-1/6">{nome}</div>
      <div className="flex h-6/6">
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="w-full h-full p-2 rounded bg-gray-700  text-white resize-none"
          placeholder="Digite o texto..."
        />
      </div>
    </div>
  );
}