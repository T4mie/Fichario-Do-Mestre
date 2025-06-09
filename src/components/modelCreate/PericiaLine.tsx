import { useState, useEffect } from "react";

interface Bonus {
  id: string;
  nome: string;
}

interface PericiaModProps {
  atributos: { id: string; nome: string; valor?: number }[];
  bonus: Bonus[];
  initialNome?: string;
  initialAtributoId?: string;
  onChange?: (nome: string, atributoId: string) => void;
}

export default function PericiaMod({
  atributos,
  bonus = [],
  initialNome = "",
  initialAtributoId = "",
  onChange,
}: PericiaModProps) {
  const [nome, setNome] = useState(initialNome);
  const [atributoId, setAtributoId] = useState(
    initialAtributoId || (atributos[0]?.id ?? "")
  );
  const [selectedBonusId, setSelectedBonusId] = useState<string>("");

  useEffect(() => {
    if (onChange) onChange(nome, atributoId);
  }, [nome, atributoId]);


  function handleBonusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedBonusId(e.target.value);
  }

  return (
    <div className="drag-handle flex gap-2 border rounded bg-gray-800 shadow items-center p-2">
      <input
        type="text"
        placeholder="Nome da Perícia"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-[150px] p-1 font-semibold bg-gray-700 text-white border-b rounded drag-cancel"
      />
      <select
        value={atributoId}
        onChange={(e) => setAtributoId(e.target.value)}
        className="p-1 rounded bg-gray-700 text-white drag-cancel"
      >
        {atributos.map((a) => (
          <option key={a.id} value={a.id}>
            {a.nome}
          </option>
        ))}
      </select>
      <select
        value={selectedBonusId}
        onChange={handleBonusChange}
        className="p-1 rounded bg-gray-700 text-white drag-cancel"
        style={{ minWidth: 80 }}
      >
        <option value="">-</option>
        {bonus.map((b) => (
          <option key={b.id} value={b.id}>
            {b.nome}
          </option>
        ))}
      </select>
      <div className="ml-2 px-3 py-1 rounded bg-gray-900 text-gray-100 font-bold text-lg border">
        +0
      </div>
    </div>
  );
}
