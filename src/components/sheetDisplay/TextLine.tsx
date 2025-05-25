// src/components/sheet/TextoDisplay.tsx
import { useState, useEffect } from "react";

interface TextoDisplayProps {
  nome: string;
  textoInicial?: string;
  onChange?: (texto: string) => void;
}

export default function TextoDisplay({
  nome,
  textoInicial = "",
  onChange,
}: TextoDisplayProps) {
  const [texto, setTexto] = useState(textoInicial);

  useEffect(() => {
    if (onChange) onChange(texto);
  }, [texto]);

  return (
    <div className="drag-handle flex items-center gap-2 border rounded bg-gray-800 shadow p-2 text-white">
      <div className="w-[150px] font-semibold">{nome}</div>
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        className="flex-grow p-2 rounded bg-gray-700 border text-white"
        placeholder="Digite o texto..."
      />
    </div>
  );
}
