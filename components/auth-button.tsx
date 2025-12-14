// components/auth-button.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client"; // Use CLIENT version
import UserDropdownMenu from "./user-dropdown-menu";
import { User } from "@supabase/supabase-js";

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="h-9 w-20 animate-pulse bg-gray-200 rounded" />; // Loading skeleton
  }

  return user ? (
    <UserDropdownMenu user={user} />
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm">
        <Link href="/auth/login">Sign in</Link>
      </Button>
    </div>
  );
}
