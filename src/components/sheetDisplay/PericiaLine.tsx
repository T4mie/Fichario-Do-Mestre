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
  const atributo = atributos.find((a) => a.id === atributoId) || atributos[0];
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
    <div className="w-full h-full flex flex-row gap-2  rounded bg-gray-800 shadow items-center p-2">
      <div className="font-semibold w-3/6 truncate bg-gray-700 h-full flex items-center px-2 rounded">
        {nome}
      </div>

      <div className="w-2/6 rounded bg-gray-900 text-gray-100 h-full flex items-center justify-center truncate">
        {atributo?.nome || "Atributo"}
      </div>

      <select
        value={selectedBonusId}
        onChange={(e) => setSelectedBonusId(e.target.value)}
        className=" rounded bg-gray-700 text-white h-full w-1/6"
      >
        <option value="">-</option>
        {bonusList.map((b) => (
          <option key={b.id} value={b.id}>
            {b.nome} ({(b.valor ?? 0) >= 0 ? "+" : ""}
            {b.valor ?? 0})
          </option>
        ))}
      </select>

      <div className="rounded bg-gray-900 text-gray-100 h-full w-1/6 font-bold text-lg flex items-center justify-center">
        {total >= 0 ? "+" : ""}
        {total}
      </div>
    </div>

  );
}