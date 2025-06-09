// CharacterButton.tsx
import { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { getCurrentUser } from "../../backend/auth";

interface CharacterButtonProps {
  characterId: string;
  nome: string; // Nome do personagem
  onEdit: () => void;
  onDelete: () => void;
}

export default function CharacterButton({
  characterId,
  nome,
  onEdit,
  onDelete,
}: CharacterButtonProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [characterName, setCharacterName] = useState(nome);

  return (
    <div
      className="relative w-70 h-30 aspect-[4/3] bg-gray-900 rounded-xl shadow-md flex mb-4 group mr-2 ml-2"
      onMouseEnter={() => setMenuOpen(true)}
      onMouseLeave={() => setMenuOpen(false)}
    >

      {/* Nome do personagem */}
      <div className="flex-1 p-3 flex flex-col justify-center overflow-hidden">
        <p
          className="text-lg font-bold text-white break-words line-clamp-2"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontSize: '1.2rem',
          }}
        >
          {characterName}
        </p>
      </div>

      {/* Ícone do menu */}
      <div className="absolute top-2 right-2">
        <EllipsisVertical className="text-gray-400" />
      </div>

      {/* Menu flutuante */}
      {menuOpen && (
        <div className="absolute top-10 right-2 shadow z-20 w-32 text-sm">
          <button onClick={onEdit} className="w-full px-4 py-2 hover:bg-gray-100 text-left">Acessar</button>
          <button onClick={onDelete} className="w-full px-4 py-2 text-red-600 hover:bg-red-50 text-left">Deletar</button>
        </div>
      )}
    </div>
  );
}