import { Plus } from "lucide-react";

interface PlusButtonProps {
  onClick: () => void;
  className?: string;
  label?: string;
}

export default function PlusButton({ onClick, className = "", label = "" }: PlusButtonProps) {
  return (
    <button
      className={`w-50 h-30 aspect-[4/3] text-white
        flex items-center justify-center rounded-xl shadow-md transition ${className}`}
      onClick={onClick}>
      <Plus size={32} />
      {label}
    </button>
  );
}
