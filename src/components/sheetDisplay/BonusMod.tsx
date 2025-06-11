import { useState } from "react";

interface BonusDisplayProps {
  nome: string;
  valorInicial?: number;
  onChange?: (valor: number) => void;
}

export default function BonusDisplay({
  nome,
  valorInicial = 0,
  onChange,
}: BonusDisplayProps) {
  const [input, setInput] = useState(() =>
    valorInicial >= 0 ? `+${valorInicial}` : `${valorInicial}`
  );

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    let v = e.target.value;
    v = v.replace(/[^0-9+-]/g, "");

    if (v === "+" || v === "-") {
      setInput(v);
      return;
    }

    if (v.startsWith("+") || v.startsWith("-")) {
      v = v[0] + v.slice(1).replace(/[+-]/g, "");
      v = v[0] + (v.slice(1).replace(/^0+/, "") || "0");
    } else if (/^\d/.test(v)) {
      v = "+" + v.replace(/[+-]/g, "");
      v = "+" + (v.slice(1).replace(/^0+/, "") || "0");
    }

    setInput(v);

    // Chamada de onChange APENAS aqui
    let num = parseInt(v, 10);
    if (isNaN(num)) num = 0;
    if (onChange) onChange(num);
  }

  return (
  <div className="drag-handle rounded bg-gray-800 shadow w-full h-full flex flex-col items-center p-2 gap-1">
    <div className="w-full basis-1/3 flex items-center justify-center font-semibold drag-cancel text-sm text-center truncate rounded bg-gray-700">
      {nome}
    </div>
    <input
      type="text"
      value={input}
      onChange={handleInput}
      className="w-full basis-2/3 text-2xl text-center rounded drag-cancel bg-gray-700"
      placeholder="+0"
      inputMode="text"
    />
  </div>
  );
}
