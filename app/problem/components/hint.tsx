import HighlightedText from "@/components/ui/highlighted-text";
import { Lightbulb } from "lucide-react";
import { useState } from "react";

export default function Hint({ hint, index }: { hint: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="bg-yellow-400/10 border-l-4 border-yellow-400 m-4 p-2 rounded cursor-pointer transition-all hover:bg-yellow-400/20"
    >
      <div className="flex items-start gap-2">
        <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-bold">Hint {index + 1}</p>
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              isOpen
                ? "grid-rows-[1fr] opacity-100 my-2"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <HighlightedText text={hint} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
