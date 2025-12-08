import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import UserDropdownMenu from "./user-dropdown-menu";

export async function AuthButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

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
