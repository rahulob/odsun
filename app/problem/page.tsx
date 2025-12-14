"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Description from "./components/description";
import Navbar from "@/components/navbar";
import CodeEditor from "./components/code-editor";
import { Suspense, useEffect, useState } from "react";

export default function Problem() {
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const saved = localStorage.getItem("selectedLanguage");
      if (saved) {
        setSelectedLanguage(saved);
      }
    }
  }, []);

  // Save to localStorage when value changes
  const handleLanguageChange = (newValue: string) => {
    setSelectedLanguage(newValue);
    localStorage.setItem("selectedLanguage", newValue);
  };
  return (
    <div className="flex flex-col h-screen">
      <Suspense>
        <Navbar />
      </Suspense>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={40} minSize={30} maxSize={60}>
          <Description />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70} minSize={20}>
              <CodeEditor
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
                code={code}
                onCodeChange={(value: string) => setCode(value)}
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
