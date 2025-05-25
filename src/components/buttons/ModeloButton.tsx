import { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { getCurrentUser } from "../../backend/auth";
import { getAllSheetModels } from "../../backend/firestore"; // ajuste o caminho se necessário

interface ModelButtonProps {
  modelId: string;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ModelButton({
  modelId,
  onEdit,
  onDelete,
}: ModelButtonProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modelName, setModelName] = useState("");

  useEffect(() => {
    const fetchModelName = async () => {
      try {
        const user = getCurrentUser();
        const models = await getAllSheetModels(user.uid);
        const model = models.find((m) => m.id === modelId);

        if (model) {
          setModelName(model.data.nome || "Modelo sem nome");
        } else {
          setModelName("Modelo não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar nome do modelo:", (error as Error).message);
        setModelName("Erro ao carregar");
      }
    };

    fetchModelName();
  }, [modelId]);

  return (
    <div
      className="relative w-70 h-20 bg-gray-900 rounded-xl shadow-md flex items-center justify-between p-4 mb-4 group"
      onMouseEnter={() => setMenuOpen(true)}
      onMouseLeave={() => setMenuOpen(false)}
    >
      {/* Nome do modelo */}
      <p className="text-lg font-bold text-white truncate" style={{ fontSize: '1.2rem' }}>
        {modelName}
      </p>

      {/* Ícone do menu */}
      <div className="relative">
        <EllipsisVertical className="text-gray-400" />
        {menuOpen && (
          <div className="absolute top-6 right-0 shadow z-20 w-32 text-sm bg-white rounded-md">
            <button onClick={onEdit} className="w-full px-4 py-2 hover:bg-gray-100 text-left">Acessar</button>
            <button onClick={onDelete} className="w-full px-4 py-2 text-red-600 hover:bg-red-50 text-left">Deletar</button>
          </div>
        )}
      </div>
    </div>
  );
}
