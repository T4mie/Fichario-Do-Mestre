// CharacterButton.tsx
import { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { getCurrentUser } from "../../backend/auth";
import { getImageUrl } from "../../backend/storage";

interface CharacterButtonProps {
  nome: string;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CharacterButton({
  nome,
  onView,
  onEdit,
  onDelete,
}: CharacterButtonProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const user = getCurrentUser();
        const path = `users/${user.uid}/characters/${nome}/imagem.png`;
        const url = await getImageUrl(path);
        setImageUrl(url);
      } catch (error) {
        console.error("Erro ao carregar imagem:", (error as Error).message);
        setImageUrl("https://firebasestorage.googleapis.com/v0/b/fichario-do-mestre.firebasestorage.app/o/app%2Fplaceholder.png?alt=media&token=6c4819be-3da7-4781-9396-519e67ae782b");
      }
    };

    fetchImage();
  }, [nome]);

  return (
    <div
      className="relative w-70 h-35 aspect-[4/3] bg-gray-900 rounded-xl shadow-md flex mb-4 group"
      onMouseEnter={() => setMenuOpen(true)}
      onMouseLeave={() => setMenuOpen(false)}
    >
      {/* Imagem à esquerda */}
      <img
        src={imageUrl}
        alt={nome}
        className="w-2/5 object-cover h-full rounded-l-xl"
      />

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
          {nome}
        </p>
      </div>

      {/* Ícone do menu */}
      <div className="absolute top-2 right-2">
        <EllipsisVertical className="text-gray-400" />
      </div>

      {/* Menu flutuante */}
      {menuOpen && (
        <div className="absolute top-10 right-2 shadow z-20 w-32 text-sm">
          <button onClick={onView} className="w-full px-4 py-2 hover:bg-gray-100 text-left">Visualizar</button>
          <button onClick={onEdit} className="w-full px-4 py-2 hover:bg-gray-100 text-left">Editar</button>
          <button onClick={onDelete} className="w-full px-4 py-2 text-red-600 hover:bg-red-50 text-left">Deletar</button>
        </div>
      )}
    </div>
  );
}
