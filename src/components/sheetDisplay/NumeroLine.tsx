import { useState, useEffect } from "react";

interface NumeroDisplayProps {
  nome: string;
  valorInicial?: number;
  onChange?: (valor: number) => void;
}

export default function NumeroDisplay({
  nome,
  valorInicial = 0,
  onChange,
}: NumeroDisplayProps) {
  const [valor, setValor] = useState(valorInicial);

  useEffect(() => {
    if (onChange) onChange(valor);
  }, [valor]);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value.replace(/[^0-9]/g, "");
    setValor(v === "" ? 0 : parseInt(v, 10));
  }

  return (
    <div className="w-full h-full flex flex-row justify-center bg-gray-800 shadow text-white items-center gap-2 rounded">
      <div></div>
      <div
        className="font-semibold w-2/3 text-center truncate drag drag-cancel"
        title={nome}
      >
        {nome}
      </div>
      <input
        type="text"
        value={valor}
        onChange={handleInput}
        className="ml-auto w-1/3 rounded p-2 bg-gray-700  text-white text-center drag-cancel"
        placeholder="0"
        inputMode="numeric"
      />
      <div></div>
    </div>

  );
}