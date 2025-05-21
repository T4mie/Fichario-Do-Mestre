import { useEffect, useState } from "react";
import { getSystems, saveSheetModel } from "../backend/firestore"; // ajuste o caminho conforme seu projeto
import { getCurrentUser } from "../backend/auth"; // supondo que tenha hook de autenticação
import { useNavigate } from "react-router-dom";

export default function CriarModelo() {
  const [systems, setSystems] = useState<{ id: string; data: any }[]>([]);
  const [selectedSystemId, setSelectedSystemId] = useState("");
  const [selectedSystemData, setSelectedSystemData] = useState<any>(null);
  const [modelName, setModelName] = useState("");
  const [loading, setLoading] = useState(false);
  const user = getCurrentUser(); // precisa fornecer uid
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSystems() {
      try {
        const systemsList = await getSystems();
        setSystems(systemsList);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSystems();
  }, []);

  const handleSystemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = event.target.value;
    setSelectedSystemId(id);
    const system = systems.find((s) => s.id === id);
    setSelectedSystemData(system?.data || null);
  };

  const handleSave = async () => {
    if (!user || !selectedSystemId || !modelName) return;
    setLoading(true);
    try {
      await saveSheetModel(user.uid, selectedSystemId, modelName, {});
      alert("Modelo salvo com sucesso!");
      setModelName("");
    } catch (error) {
      alert("Erro ao salvar modelo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Criar Modelo</h1>

      <label className="block">
        <span className="font-medium">Selecione o Sistema</span>
        <select
          value={selectedSystemId}
          onChange={handleSystemChange}
          className="mt-1 block w-full border p-2 rounded"
        >
          <option value="">Selecione...</option>
          {systems.map((system) => (
            <option key={system.id} value={system.id}>
              {system.data.nome || system.id}
            </option>
          ))}
        </select>
      </label>

      {selectedSystemData && (
        <div className="p-3 bg-gray-100 rounded text-sm whitespace-pre-wrap">
          <strong>Dados do Sistema:</strong>
          <pre>{JSON.stringify(selectedSystemData, null, 2)}</pre>
        </div>
      )}

      <label className="block">
        <span className="font-medium">Nome do Modelo</span>
        <input
          type="text"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          className="mt-1 block w-full border p-2 rounded"
          placeholder="Ex: Modelo Guerreiro"
        />
      </label>

      <button
        onClick={handleSave}
        disabled={loading || !modelName || !selectedSystemId}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Salvando..." : "Salvar Modelo"}
      </button>
      <button
          onClick={() => navigate('/user')}
          className="bg-gray-500 text-white px-4 p-2 rounded hover:opacity-90 mb-4"
        >
          Voltar para Usuário
        </button>
    </div>
  );
}
