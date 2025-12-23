import { ReactNode } from "react";
import Hint from "./hint";
import HighlightedText from "@/components/ui/highlighted-text";

interface Example {
  input: string;
  output: string;
  explanation?: string;
}
interface Hint {
  text: string;
}
export interface Problem {
  id: string;
  title: string;
  difficulty: string;
  description: string;
  examples: Example[];
  constraints: string;
  tags: string[];
  follow_up?: string;
  hints?: Hint[];
}

interface DescriptionProps {
  problem: Problem;
}

export default function Description({ problem }: DescriptionProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600";
      case "Medium":
        return "text-yellow-600";
      case "Hard":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="h-screen overflow-auto pb-16 p-4 space-y-4">
      {/* Tags */}
      {problem.tags && problem.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {problem.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {/* Title and description */}
      <DescriptionCard>
        <h1 className="font-bold text-2xl">{problem.title}</h1>
        <span
          className={`text-sm font-semibold ${getDifficultyColor(
            problem.difficulty
          )}`}
        >
          {problem.difficulty}
        </span>
        <HighlightedText
          text={problem.description}
          className="text-primary/60"
        />
      </DescriptionCard>

      {/* Examples */}
      {problem.examples && problem.examples.length > 0 && (
        <DescriptionCard title="Examples">
          {problem.examples.map((example, index) => (
            <div
              key={index}
              className="bg-secondary rounded-lg py-2 px-4 font-mono text-sm mb-2"
            >
              <div>
                <span className="font-bold text-green-500">Input : </span>
                <span className="">{example.input}</span>
              </div>
              <div>
                <span className="font-bold text-green-600">Output: </span>
                <span>{example.output}</span>
              </div>
              {example.explanation && (
                <div className="pt-2 border-t border-primary mt-2">
                  <span className="text-primary/60 font-sans">
                    <span className="font-semibold text-primary">
                      Explanation:{" "}
                    </span>
                    {example.explanation}
                  </span>
                </div>
              )}
            </div>
          ))}
        </DescriptionCard>
      )}

      {/* Constraints */}
      {problem.constraints && (
        <DescriptionCard title="Constraints">
          <ul className="space-y-2 text-base-content/90">
            {problem.constraints.split("\n").map((constraint, index) => (
              <li key={index} className="flex gap-2">
                <span className="text-primary">•</span>
                <code className="text-sm">
                  <HighlightedText text={constraint} />
                </code>
              </li>
            ))}
          </ul>
        </DescriptionCard>
      )}

      {/* Follow Up */}
      {problem.follow_up && (
        <div className="border-l-4 border-blue-500 m-4 px-4">
          <p className="font-semibold mb-1">Follow-up:</p>
          <HighlightedText
            className="text-sm text-primary/60"
            text={problem.follow_up}
          />
        </div>
      )}

      {/* Hints */}
      {problem.hints && problem.hints.length > 0 && (
        <div>
          {problem.hints.map((hint, idx) => (
            <Hint hint={hint.text} index={idx} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
}

function DescriptionCard({
  title,
  children,
}: {
  title?: string;
  children?: ReactNode;
}) {
  return (
    <div className="px-4 mt-2">
      {title && (
        <h2 className="text-xl font-bold mb-2 text-base-content">{title}</h2>
      )}
      {children}
    </div>
  );
}

function DifficultyTag({ difficulty }: { difficulty?: string }) {
  let colorClassName = "";
  switch (difficulty) {
    case "Easy":
      colorClassName = "bg-green-200 text-green-800";
      break;
    case "Medium":
      colorClassName = "bg-yellow-200 text-yellow-800";
      break;
    case "Hard":
      colorClassName = "bg-red-200 text-red-800";
      break;
    default:
      colorClassName = "bg-gray-200 text-gray-800";
      break;
  }
  return (
    <div className={`px-4 text-sm rounded-xl ${colorClassName}`}>
      {difficulty}
    </div>
  );
}
