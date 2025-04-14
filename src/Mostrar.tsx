import { useEffect, useState } from "react";
import { getCurrentUser } from "./backend/auth";
import { getUserUploads } from "./backend/firestore";
import { getImageUrl } from "./backend/storage";

export default function Gallery() {
  const [uploads, setUploads] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = getCurrentUser();
        const uid = user.uid;

        const uploadsFromDB = await getUserUploads(uid);

        const uploadsWithURLs = await Promise.all(
          uploadsFromDB.map(async (upload: any) => {
            const imageUrl = await getImageUrl(`users/${uid}/${upload.id}`);
            return { ...upload, imageUrl };
          })
        );

        setUploads(uploadsWithURLs);
      } catch (error) {
        alert("Erro ao carregar imagens: " + (error as Error).message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-fundo text-fundo">
      <h2 className="text-2xl font-bold mb-6">Galeria de Imagens</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {uploads.map((upload) => (
          <div key={upload.id} className="bg-caixa p-4 rounded-lg shadow-lg">
            <img src={upload.imageUrl} alt="Imagem de upload" className="w-full h-auto rounded mb-2" />
            <p>{upload.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
