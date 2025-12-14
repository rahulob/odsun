import { Lightbulb } from "lucide-react";
import { useState } from "react";

export default function Hint({ hint, index }: { hint: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="bg-yellow-400/10 border-l-4 border-yellow-400 m-4 p-2 rounded cursor-pointer"
    >
      <div className="flex items-start gap-2">
        <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0" />
        <div>
          <p className="font-bold">Hint {index + 1}</p>
          {isOpen && <p className="text-sm text-primary/80">{hint}</p>}
        </div>
      </div>
    </div>
  );
}
