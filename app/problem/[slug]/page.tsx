"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Description from "../components/description";
import Navbar from "@/components/navbar";
import CodeEditor from "../components/code-editor";
import { createClient } from "@/lib/supabase/client";

export interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string;
  follow_up?: string;
  tags: string[];
  starter_code?: any;
}

export default function Problem() {
  const params = useParams();
  const slug = params.slug as string;

  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const supabase = createClient();

  // Fetch problem data
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const { data, error } = await supabase
          .from("problems")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) throw error;

        setProblem(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProblem();
    }
  }, [slug]);

  // Load saved code and language from localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage && problem) {
      const savedLanguage = localStorage.getItem(`${slug}-language`);
      const savedCode = localStorage.getItem(
        `${slug}-${selectedLanguage}-code`
      );

      if (savedLanguage) {
        setSelectedLanguage(savedLanguage);
      }

      if (savedCode) {
        setCode(savedCode);
      } else if (problem.starter_code?.[selectedLanguage]) {
        // Load starter code if no saved code exists
        setCode(problem.starter_code[selectedLanguage]);
      }
    }
  }, [problem, slug]);

  // Save language selection
  const handleLanguageChange = (newLanguage: string) => {
    // Save current code before switching
    localStorage.setItem(`${slug}-${selectedLanguage}-code`, code);

    setSelectedLanguage(newLanguage);
    localStorage.setItem(`${slug}-language`, newLanguage);

    // Load code for new language
    const savedCode = localStorage.getItem(`${slug}-${newLanguage}-code`);
    if (savedCode) {
      setCode(savedCode);
    } else if (problem?.starter_code?.[newLanguage]) {
      setCode(problem.starter_code[newLanguage]);
    } else {
      setCode("");
    }
  };

  // Save code on change
  const handleCodeChange = (value: string) => {
    setCode(value);
    localStorage.setItem(`${slug}-${selectedLanguage}-code`, value);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading problem...</div>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Problem Not Found
          </h1>
          <p className="text-gray-600">
            {error || "This problem doesn't exist."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={40} minSize={30} maxSize={60}>
          <Description problem={problem} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70} minSize={20}>
              <CodeEditor
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
                code={code}
                onCodeChange={handleCodeChange}
              />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={30} minSize={10}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Console</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
