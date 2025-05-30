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
    <div className=" h-[100%] flex items-center border rounded bg-gray-800 shadow  text-white">
      <div className="flex-1/4 font-semibold text-center">{nome}</div>
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        className="flex-grow flex-3/4 rounded bg-gray-700 border text-white"
        placeholder="Digite o texto..."
      />
    </div>
  );
}
