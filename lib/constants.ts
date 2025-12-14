export const SUPPORTED_LANGUAGES = [
  { id: "cpp", name: "C++", extension: ".cpp" },
  { id: "python", name: "Python", extension: ".py" },
  { id: "javascript", name: "JavaScript", extension: ".js" },
  { id: "java", name: "Java", extension: ".java" },
] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];
