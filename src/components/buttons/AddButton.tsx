import { Plus } from "lucide-react";

interface PlusButtonProps {
  onClick: () => void;
  className?: string;
  label?: string;
}

export default function PlusButton({ onClick, className = "", label = "" }: PlusButtonProps) {
  return (
    <button
      className={`w-59 h-30 aspect-[4/3] text-white mr-2 ml-2
        flex items-center justify-center rounded-xl shadow-md transition ${className}`}
      onClick={onClick}>
      <Plus size={32} />
      {label}
    </button>
  );
}
