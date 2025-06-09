import { useEffect, useState } from "react";
import { calcularModificador } from "../../backend/caluladora";

interface Atributo {
  id: string;
  nome: string;
  valor?: number;
}

interface Bonus {
  id: string;
  nome: string;
  valor?: number;
}

interface PericiaDisplayProps {
  nome: string;
  atributoId: string;
  bonusId?: string;
  atributos: Atributo[];
  bonus: Bonus[];
  formulaMod: string;
  onChange?: (bonusId: string) => void;
}

export default function PericiaDisplay({
  nome,
  atributoId,
  bonusId = "",
  atributos,
  bonus: bonusList,
  formulaMod,
  onChange,
}: PericiaDisplayProps) {
  const [selectedBonusId, setSelectedBonusId] = useState(bonusId);

  // Busca o atributo selecionado
  const atributo = atributos.find((a) => a.id === atributoId);
  const valorAtributo = atributo?.valor ?? 0;
  const modAtributo = calcularModificador(valorAtributo, formulaMod);

  // Busca o bônus selecionado
  const bonusObj = bonusList.find((b) => b.id === selectedBonusId);
  const valorBonus = bonusObj?.valor ?? 0;

  // Soma total
  const total = modAtributo + valorBonus;

  useEffect(() => {
    if (onChange) onChange(selectedBonusId);
  }, [selectedBonusId]);

  return (
    <div className="flex gap-2 border rounded bg-gray-800 shadow items-center p-2">
      <div className="font-semibold w-[150px] truncate">{nome}</div>
      <div className="px-2 py-1 rounded bg-gray-900 text-gray-100 border">
        {atributo?.nome || "Atributo"}
      </div>
      <select
        value={selectedBonusId}
        onChange={(e) => setSelectedBonusId(e.target.value)}
        className="p-1 rounded bg-gray-700 text-white"
        style={{ minWidth: 80 }}
      >
        <option value="">-</option>
        {bonusList.map((b) => (
          <option key={b.id} value={b.id}>
            {b.nome} ({(b.valor ?? 0) >= 0 ? "+" : ""}
            {b.valor ?? 0})
          </option>
        ))}
      </select>
      <div className="ml-2 px-3 py-1 rounded bg-gray-900 text-gray-100 font-bold text-lg border">
        {total >= 0 ? "+" : ""}
        {total}
      </div>
    </div>
  );
}