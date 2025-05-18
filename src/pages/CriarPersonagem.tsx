import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../backend/auth";
import { uploadImage } from "../backend/storage";
import { saveCharacterData} from "../backend/firestore";

export default function CriarPersonagem() {
  const [image, setImage] = useState<File | null>(null);
  const [nome, setNome] = useState("");
  const [forca, setForca] = useState(0);
  const [inteligencia, setInteligencia] = useState(0);
  const [destreza, setDestreza] = useState(0);
  const [carisma, setCarisma] = useState(0);
  const [sabedoria, setSabedoria] = useState(0);
  const [constituicao, setConstituicao] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateCharacter = async () => {
    // validação do nome
    if (!nome.trim()) return alert("Insira o nome do personagem.");
    setLoading(true);

    try {
      const user = getCurrentUser();
      const uid = user.uid;
      const placeholder = "https://firebasestorage.googleapis.com/v0/b/fichario-do-mestre.firebasestorage.app/o/app%2Fplaceholder.png?alt=media&token=6c4819be-3da7-4781-9396-519e67ae782b";
      const imagePath = `users/${uid}/characters/${nome}/imagem.png`;
      const imageUrl = image
        ? await uploadImage(image, imagePath)
        : placeholder;

      await saveCharacterData(uid, nome, {
        forca,
        inteligencia,
        destreza,
        carisma,
        sabedoria,
        constituicao,
        imageUrl,
      });

      navigate(`/personagens/${nome}`);
    } catch (error) {
      alert("Erro ao criar personagem: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-fundo text-fundo">
      <div className="bg-caixa p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Criar Personagem</h2>

        <input
          type="text"
          placeholder="Nome do personagem"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full mb-4 p-2 rounded"
        />

        <div className="mb-4">
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-caixa text-fundo px-4 py-2 rounded shadow hover:opacity-90 inline-block"
          >
            Selecionar imagem (opcional)
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
          <p className="mt-2 text-sm">
            {image ? image.name : "Imagem padrão será usada"}
          </p>
        </div>

        <div className="mb-4">
          <label>Força</label>
          <input
            type="number"
            value={forca}
            onChange={(e) => setForca(Number(e.target.value))}
            className="w-full mb-2 p-2 rounded"
          />
          <label>Inteligência</label>
          <input
            type="number"
            value={inteligencia}
            onChange={(e) => setInteligencia(Number(e.target.value))}
            className="w-full mb-2 p-2 rounded"
          />
          <label>Destreza</label>
          <input
            type="number"
            value={destreza}
            onChange={(e) => setDestreza(Number(e.target.value))}
            className="w-full mb-2 p-2 rounded"
          />
          <label>Carisma</label>
          <input
            type="number"
            value={carisma}
            onChange={(e) => setCarisma(Number(e.target.value))}
            className="w-full mb-2 p-2 rounded"
          />
          <label>Sabedoria</label>
          <input
            type="number"
            value={sabedoria}
            onChange={(e) => setSabedoria(Number(e.target.value))}
            className="w-full mb-2 p-2 rounded"
          />
          <label>Constituição</label>
          <input
            type="number"
            value={constituicao}
            onChange={(e) => setConstituicao(Number(e.target.value))}
            className="w-full mb-2 p-2 rounded"
          />
        </div>

        <button
          onClick={handleCreateCharacter}
          className="w-full bg-fundo text-caixa p-2 rounded hover:opacity-90"
          disabled={loading}
        >
          {loading ? "Criando..." : "Criar Personagem"}
        </button>
      </div>
    </div>
  );
}