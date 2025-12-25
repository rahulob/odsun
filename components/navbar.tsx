import { ThemeSwitcher } from "./theme-switcher";
import { AuthButton } from "./auth-button";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href={"/"}>ODSUN</Link>
        </div>
        <div className="flex gap-4 items-center">
          <Link href={"/"}>
            <Button variant="link">Roadmap</Button>
          </Link>
          <ThemeSwitcher />
          <Suspense>
            <AuthButton />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
