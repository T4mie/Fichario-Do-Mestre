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
      <div className="mb-2 font-semibold">{nome}</div>
      <div className="flex-1 flex-col justify-end">
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="w-full h-full min-h-[80px] max-h-[200px] p-2 rounded bg-gray-700  text-white resize-none"
          placeholder="Digite o texto..."
        />
      </div>
    </div>
  );
}