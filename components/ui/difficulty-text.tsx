export default function DifficultyText({ difficulty }: { difficulty: string }) {
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
    <span className={`text-sm font-semibold ${getDifficultyColor(difficulty)}`}>
      {difficulty}
    </span>
  );
}
