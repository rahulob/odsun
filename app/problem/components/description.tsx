import HighlightedText from "@/components/ui/highlighted-text";
import { ReactNode, useState } from "react";
import Hint from "./hint";

const problem = {
  title: "Two Sum",
  difficulty: "Easy",
  descrition:
    "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
    },
    {
      input: "nums = [3,3], target = 6",
      output: "[0,1]",
    },
  ],
  constraints: [
    "2 <= nums.length <= 104",
    "-109 <= nums[i] <= 109",
    "-109 <= target <= 109",
    "Only one valid answer exists.",
  ],
  followUp:
    "Can you come up with an algorithm that is less than `O(n^2)` time complexity?",
  hints: [
    "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it's best to try out brute force solutions just for completeness. It is from these brute force solutions that you can come up with optimizations.",
    "So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
    "The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?",
  ],
};

export default function Description() {
  return (
    <div className="h-screen overflow-auto pb-16 p-4">
      {/* Title and description */}
      <DescriptionCard>
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-bold text-2xl">{problem.title}</h1>
          <DifficultyTag difficulty={problem.difficulty} />
        </div>
        <HighlightedText
          text={problem.descrition}
          className="text-primary/60"
        />
      </DescriptionCard>

      {/* EXAMPLES SECTION */}
      <DescriptionCard title="Examples">
        {problem.examples.map((example: any, idx: number) => (
          <div
            key={idx}
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

      {/* CONSTRAINTS */}
      <DescriptionCard title="Constraints">
        <ul className="space-y-2 text-base-content/90">
          {problem.constraints.map((constraint: string, idx: number) => (
            <li key={idx} className="flex gap-2">
              <span className="text-primary">•</span>
              <code className="text-sm">{constraint}</code>
            </li>
          ))}
        </ul>
      </DescriptionCard>

      {/* Follow Up */}
      {problem.followUp && (
        <div className="border-l-4 border-blue-500 m-4 px-4">
          <p className="font-semibold mb-1">Follow-up:</p>
          <HighlightedText
            className="text-sm text-primary/60"
            text={problem.followUp}
          />
        </div>
      )}

      {/* Hints */}
      {problem.hints.map((hint, idx) => (
        <Hint hint={hint} index={idx} key={idx} />
      ))}
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
