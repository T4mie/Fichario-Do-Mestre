import { useState } from "react";
import { useNavigate } from "react-router";
import { getCurrentUser } from "./backend/auth";
import { uploadImage } from "./backend/storage";
import { saveImageMetadata } from "./backend/firestore";

export default function Upload() {
  // declarando as constantes do arquivo,
  // descrição, estado de carregamento
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // declarando o método de navegação
  const navigate = useNavigate();

  // método de upload
  const handleUpload = async () => {
    if (!image) return alert("Selecione uma imagem.");
    if (!description) return alert("Digite uma descrição.");

    setLoading(true);

    try {
      const user = getCurrentUser();
      const uid = user.uid;
      const imagePath = `users/${uid}/${image.name}`;

      const imageUrl = await uploadImage(image, imagePath);

      await saveImageMetadata(uid, image.name, {
        description,
        imageUrl,
        timestamp: new Date(),
      });

      alert("Upload realizado com sucesso!");
      setImage(null);
      setDescription("");
    } catch (error) {
      alert("Erro ao enviar: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-fundo text-fundo">
      <div className="bg-caixa p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Enviar Imagem</h2>
        <div className="mb-4">
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-caixa text-fundo px-4 py-2 rounded shadow hover:opacity-90 inline-block"
          >
            Selecionar imagem
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
          {image && <p className="mt-2 text-sm">{image.name}</p>}
        </div>
        <textarea
          placeholder="Digite uma descrição..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-2 rounded"
        />
        <button
          onClick={handleUpload}
          className="w-full bg-fundo text-caixa p-2 rounded hover:opacity-90"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center bg-fundo text-fundo">
        <h1 className="text-3xl font-bold mb-6">Página de Upload</h1>
        <button
          onClick={() => navigate("/mostrar")}
          className="bg-caixa text-fundo px-4 py-2 rounded-lg shadow hover:opacity-90"
        >
          Ver minhas imagens
        </button>
      </div>
    </div>
  );
}
