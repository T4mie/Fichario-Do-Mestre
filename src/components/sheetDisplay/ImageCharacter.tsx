// components/sheetDisplay/ImageUpload.tsx
import { useEffect, useState } from "react";
import { uploadImage } from "../../backend/storage";
import { updateCharacterImage } from "../../backend/firestore";
import { getCurrentUser } from "../../backend/auth";

interface ImageUploadProps {
  characterId: string;
  compId: string;
}

export default function ImageUpload({ characterId, compId }: ImageUploadProps) {
  const user = getCurrentUser();
  const [previewUrl, setPreviewUrl] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !user) return;

    const file = e.target.files[0];
    const path = `users/${user.uid}/characters/${characterId}/${compId}.png`;

    try {
      const url = await uploadImage(file, path);
      await updateCharacterImage(user.uid, characterId, url); // opcional
      setPreviewUrl(url);
    } catch (error) {
      console.error("Erro ao enviar imagem:", (error as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-start text-white">
      <label className="mb-1 text-sm">Imagem</label>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {previewUrl && (
        <img src={previewUrl} alt="preview" className="mt-2 rounded w-full max-w-[200px]" />
      )}
    </div>
  );
}
