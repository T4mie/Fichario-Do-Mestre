// components/modelCreate/ImageComponent.tsx
interface ImageComponentProps {
  isCover: boolean;
  onSetAsCover: () => void;
}

export default function ImageComponent({ isCover, onSetAsCover }: ImageComponentProps) {
  return (
    <div className="border rounded bg-gray-700 text-white p-2 space-y-2 shadow">
      {/* Drag handle visível */}
      <div className="drag-handle cursor-move font-bold text-sm text-gray-300">☰ Imagem</div>

      <div className="w-full aspect-[1/0.95] bg-gray-600 rounded" />

      <button
        onClick={onSetAsCover}
        className={`mt-2 px-2 py-1 rounded text-xs ${
          isCover ? "bg-green-600" : "bg-gray-500 hover:bg-gray-600"
        }`}
      >
        {isCover ? "Imagem de Capa" : "Definir como Capa"}
      </button>
    </div>
  );
}
