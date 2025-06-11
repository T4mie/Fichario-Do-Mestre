import { useEffect, useState } from "react";

interface BonusModProps {
  onChange?: (nome: string, valor: number) => void;
  initialNome?: string;
}

export default function BonusMod({ onChange, initialNome }: BonusModProps) {
  const [nome, setNome] = useState(initialNome || "");
  const [input, setInput] = useState("+0");

  // Atualiza o valor numérico e notifica o parent
  useEffect(() => {
    let num = parseInt(input, 10);
    if (isNaN(num)) num = 0;
    if (onChange) onChange(nome, num);
  }, [nome, input]);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    let v = e.target.value;

    // Remove tudo que não é dígito, + ou -
    v = v.replace(/[^0-9+-]/g, "");

    // Se o usuário digitar só "+" ou "-", mantém
    if (v === "+" || v === "-") {
        setInput(v);
        return;
    }

    // Se começa com + ou -, mantém o sinal e remove sinais extras
    if (v.startsWith("+") || v.startsWith("-")) {
        // Remove sinais extras no restante
        v = v[0] + v.slice(1).replace(/[+-]/g, "");
        // Remove zeros à esquerda, mas mantém um zero se for só sinal+zero
        v = v[0] + v.slice(1).replace(/^0+/, "") || v[0] + "0";
    }else if (/^\d/.test(v)) {
        // Se começa com número, adiciona +
        v = "+" + v.replace(/[+-]/g, "");
        v = "+" + (v.slice(1).replace(/^0+/, "") || "0");
    }

    setInput(v);
    }

  return (
    <div className="drag-handle rounded bg-gray-800 shadow w-full h-full flex flex-col items-center p-2 gap-1">
      <input
        type="text"
        placeholder="Nome do Bônus"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-full h-1/3 font-semibold drag-cancel text-sm text-center truncate rounded bg-gray-700"
      />
      <input
        type="text"
        value={input}
        onChange={handleInput}
        className=" w-full h-2/3 text-2xl text-center rounded drag-cancel bg-gray-700"
        placeholder="+0"
        inputMode="text"
      />
    </div>
  );
}