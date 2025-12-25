"use client";

import { Button } from "@/components/ui/button";
import Editor from "@monaco-editor/react";
import { Check, PlayIcon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUPPORTED_LANGUAGES } from "@/lib/constants";

function CodeEditor({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}: any) {
  const { resolvedTheme } = useTheme();
  return (
    <div className="h-full bg-base-300 flex flex-col">
      <div className="flex items-center justify-between px-4 py-2">
        <Select value={selectedLanguage} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            {SUPPORTED_LANGUAGES.map((item) => (
              <SelectItem value={item.id} key={item.extension}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div>
          <Button disabled={isRunning} onClick={onRunCode} variant="secondary">
            <PlayIcon className="size-4" />
            Run
          </Button>
          <Button
            disabled={isRunning}
            onClick={onRunCode}
            className="bg-green-600 hover:bg-green-700 text-primary ml-4"
          >
            <Check className="size-4" />
            Submit
          </Button>
        </div>
      </div>

      <div className="flex-1">
        <Editor
          key={selectedLanguage}
          height={"100%"}
          language={selectedLanguage}
          value={code}
          onChange={onCodeChange}
          theme={resolvedTheme === "dark" ? "vs-dark" : ""}
          options={{
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
          }}
        />
      </div>
    </div>
  );
}
export default CodeEditor;
