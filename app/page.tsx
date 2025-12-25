"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DifficultyText from "@/components/ui/difficulty-text";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Table className="max-w-xl mx-auto mt-8">
        <TableHeader>
          <TableRow>
            <TableHead>Difficulty</TableHead>
            <TableHead>Name</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems?.map((problem, index) => (
            <TableRow key={index}>
              <TableCell>
                <DifficultyText difficulty={problem.difficulty} />
              </TableCell>
              <TableCell>{problem.title}</TableCell>
              <TableCell>
                <Link
                  href={`solution/${problem.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  <Button variant="outline">Solution</Button>
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`problem/${problem.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  <Button>Solve</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const problems = [
  {
    title: "Contains Duplicate",
    difficulty: "Easy",
  },
  {
    title: "Valid Anagram",
    difficulty: "Easy",
  },
  {
    title: "Two Sum",
    difficulty: "Easy",
  },
  {
    title: "Group Anagrams",
    difficulty: "Medium",
  },
  {
    title: "Top K frequent Elements",
    difficulty: "Medium",
  },
  {
    title: "Encode and Decode Strings",
    difficulty: "Medium",
  },
  {
    title: "Product of Array Except Self",
    difficulty: "Medium",
  },
  {
    title: "Valid Sudoku",
    difficulty: "Medium",
  },
  {
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
  },
];
