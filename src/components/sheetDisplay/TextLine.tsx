// src/components/sheet/TextoDisplay.tsx
import { div } from "motion/react-client";
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
    <div className="w-full h-full flex flex-row justify-center bg-gray-800 items-center gap-2">
      <div></div>
      <div className="flex-1/3 h-[80%] flex items-center justify-center text-center bg-gray-700 rounded">
        {nome}
      </div>
      <input 
        type="text" 
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        className="flex-2/3 h-[80%] rounded p-2 bg-gray-700"
      />
      <div></div>
    </div>
  );
}
