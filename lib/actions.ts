"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export async function signInWithGoogle() {
  const supabase = await createClient();

  const auth_callback_url = `${process.env.NEXT_SITE_URL}/auth/callback`;

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: auth_callback_url,
    },
  });

  if (data.url) redirect(data.url);
}
