"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Description from "@/app/problem/components/description";

interface Example {
  input: string;
  output: string;
  explanation?: string;
}

interface Hint {
  text: string;
}

interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

interface StarterCode {
  javascript: string;
  python: string;
  java: string;
  cpp: string;
}

const SUPPORTED_LANGUAGES = [
  { id: "javascript", label: "JavaScript" },
  { id: "python", label: "Python" },
  { id: "java", label: "Java" },
  { id: "cpp", label: "C++" },
];

export default function ExplainationTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const problemSlug = searchParams.get("slug");
  const isEditMode = !!problemSlug;

  const supabase = createClient();

  const [formData, setFormData] = useState({
    title: "",
    difficulty: "Easy",
    description: "",
    constraints: "",
    tags: "",
    followUp: "",
  });

  const [examples, setExamples] = useState<Example[]>([
    { input: "", output: "", explanation: "" },
  ]);

  const [hints, setHints] = useState<Hint[]>([{ text: "" }]);

  const [starterCode, setStarterCode] = useState<StarterCode>({
    javascript: "",
    python: "",
    java: "",
    cpp: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing problem data if in edit mode
  useEffect(() => {
    const fetchProblem = async () => {
      if (!problemSlug) return;

      setFetchLoading(true);
      try {
        const { data, error } = await supabase
          .from("problems")
          .select("*")
          .eq("slug", problemSlug)
          .single();

        if (error) throw error;

        setFormData({
          title: data.title || "",
          difficulty: data.difficulty || "Easy",
          description: data.description || "",
          constraints: data.constraints || "",
          tags: data.tags ? data.tags.join(", ") : "",
          followUp: data.follow_up || "",
        });

        setExamples(
          data.examples && data.examples.length > 0
            ? data.examples
            : [{ input: "", output: "", explanation: "" }]
        );

        setHints(
          data.hints && data.hints.length > 0 ? data.hints : [{ text: "" }]
        );

        // Load starter code
        if (data.starter_code) {
          setStarterCode({
            javascript: data.starter_code.javascript || "",
            python: data.starter_code.python || "",
            java: data.starter_code.java || "",
            cpp: data.starter_code.cpp || "",
          });
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchProblem();
  }, [problemSlug]);

  const addExample = () => {
    setExamples([...examples, { input: "", output: "", explanation: "" }]);
  };

  const removeExample = (index: number) => {
    setExamples(examples.filter((_, i) => i !== index));
  };

  const updateExample = (
    index: number,
    field: keyof Example,
    value: string
  ) => {
    const updated = [...examples];
    updated[index] = { ...updated[index], [field]: value };
    setExamples(updated);
  };

  const addHint = () => {
    setHints([...hints, { text: "" }]);
  };

  const removeHint = (index: number) => {
    setHints(hints.filter((_, i) => i !== index));
  };

  const updateHint = (index: number, value: string) => {
    const updated = [...hints];
    updated[index] = { text: value };
    setHints(updated);
  };

  const updateStarterCode = (language: keyof StarterCode, code: string) => {
    setStarterCode({ ...starterCode, [language]: code });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("You must be logged in to create/update problems");
        setLoading(false);
        return;
      }

      const slug = formData.title.toLowerCase().replace(/\s+/g, "-");
      const validExamples = examples.filter((ex) => ex.input && ex.output);
      const validHints = hints.filter((h) => h.text.trim() !== "");

      // Only include languages with code
      const validStarterCode: any = {};
      Object.entries(starterCode).forEach(([lang, code]) => {
        if (code.trim()) {
          validStarterCode[lang] = code;
        }
      });

      const problemData = {
        title: formData.title,
        slug: slug,
        difficulty: formData.difficulty,
        description: formData.description,
        constraints: formData.constraints,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        examples: validExamples,
        follow_up: formData.followUp || null,
        hints: validHints,
        starter_code:
          Object.keys(validStarterCode).length > 0 ? validStarterCode : null,
      };

      if (isEditMode) {
        const { data, error } = await supabase
          .from("problems")
          .update(problemData)
          .eq("slug", problemSlug)
          .select();

        if (error) throw error;
        alert("Problem updated successfully!");
      } else {
        const { data, error } = await supabase
          .from("problems")
          .insert([
            {
              ...problemData,
              created_by: user.id,
            },
          ])
          .select();

        if (error) throw error;
        alert("Problem created successfully!");
      }

      router.push(`/problems/${slug}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="text-lg">Loading problem data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="w-full p-4 overflow-y-auto max-h-screen">
        <h1 className="text-3xl font-bold mb-6">
          {isEditMode ? "Update Problem" : "Create New Problem"}
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-end gap-8">
            <div className="w-full">
              <Label htmlFor="title">Problem Title *</Label>
              <Input
                id="title"
                placeholder="Two Sum"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="w-full">
              <Label htmlFor="difficulty">Difficulty *</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) =>
                  setFormData({ ...formData, difficulty: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-secondary">
                  <SelectGroup>
                    <SelectLabel>Difficulty</SelectLabel>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={5}
              placeholder="Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target..."
            />
          </div>

          {/* Examples Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Examples</h2>
              <Button type="button" onClick={addExample}>
                + Add Example
              </Button>
            </div>

            {examples.map((example, index) => (
              <div key={index} className="flex items-center gap-4 mb-4">
                <div className="text-xs">{index + 1}</div>
                <div className="border rounded-lg p-2 w-full">
                  <div className="space-y-2">
                    <div className="flex gap-8">
                      <div className="flex items-center gap-2 w-full">
                        <Label>Input</Label>
                        <Textarea
                          value={example.input}
                          onChange={(e) =>
                            updateExample(index, "input", e.target.value)
                          }
                          placeholder="nums = [2,7,11,15], target = 9"
                        />
                      </div>

                      <div className="flex items-center gap-2 w-full">
                        <Label>Output</Label>
                        <Textarea
                          value={example.output}
                          onChange={(e) =>
                            updateExample(index, "output", e.target.value)
                          }
                          placeholder="[0,1]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Label>Explanation</Label>
                      <Textarea
                        value={example.explanation}
                        onChange={(e) =>
                          updateExample(index, "explanation", e.target.value)
                        }
                        rows={2}
                        placeholder="Because nums[0] + nums[1] == 9, we return [0, 1]."
                      />
                    </div>
                  </div>
                </div>
                {examples.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExample(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    <Trash2 />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Starter Code Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Starter Code</h2>
            <Tabs defaultValue="javascript" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <TabsTrigger key={lang.id} value={lang.id}>
                    {lang.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <TabsContent key={lang.id} value={lang.id}>
                  <Textarea
                    value={starterCode[lang.id as keyof StarterCode]}
                    onChange={(e) =>
                      updateStarterCode(
                        lang.id as keyof StarterCode,
                        e.target.value
                      )
                    }
                    rows={10}
                    placeholder={`// ${lang.label} starter code\nfunction twoSum(nums, target) {\n    // Your code here\n}`}
                    className="font-mono text-sm"
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div>
            <Label>Constraints</Label>
            <Textarea
              value={formData.constraints}
              onChange={(e) =>
                setFormData({ ...formData, constraints: e.target.value })
              }
              rows={4}
              placeholder="1 <= nums.length <= 10^4&#10;-10^9 <= nums[i] <= 10^9"
            />
          </div>

          <div>
            <Label>Follow-up Question</Label>
            <Textarea
              value={formData.followUp}
              onChange={(e) =>
                setFormData({ ...formData, followUp: e.target.value })
              }
              placeholder="Could you solve this in O(n) time and O(1) space?"
            />
          </div>

          {/* Hints Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Hints</h2>
              <Button type="button" onClick={addHint}>
                + Add Hint
              </Button>
            </div>

            {hints.map((hint, index) => (
              <div key={index} className="flex gap-4 items-center mb-2">
                <h3 className="text-xs">{index + 1}</h3>
                <Textarea
                  value={hint.text}
                  onChange={(e) => updateHint(index, e.target.value)}
                  rows={3}
                  placeholder="Try using a hash map to store values you've seen..."
                />
                {hints.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeHint(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    <Trash2 />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div>
            <Label>Tags (comma-separated)</Label>
            <Input
              type="text"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              placeholder="array, hash-table, sorting"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
              ? "Update Problem"
              : "Create Problem"}
          </Button>
        </form>
      </div>

      {/* Preview */}
      <div className="w-full overflow-y-auto max-h-screen">
        <h1 className="text-3xl font-bold pl-8 pt-4">Preview</h1>
        <Description
          problem={{
            id: "unique_id",
            title: formData.title,
            difficulty: formData.difficulty,
            description: formData.description,
            constraints: formData.constraints,
            tags: formData.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
            examples: examples,
            follow_up: formData.followUp,
            hints: hints,
          }}
        />
      </div>
    </div>
  );
}
