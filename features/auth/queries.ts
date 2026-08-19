import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/features/auth/types";

// Memoized per request: safe to call from multiple Server Components/layouts
// on the same render without re-hitting Supabase each time.
export const getCurrentProfile = cache(async (): Promise<Profile | null> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return profile;
});

// The single gate every protected admin route/action should call. Redirects
// unauthenticated or non-staff users to the login page rather than ever
// rendering protected content or performing a mutation for them.
export async function requireStaff(): Promise<Profile> {
  const profile = await getCurrentProfile();

  if (!profile || (profile.role !== "admin" && profile.role !== "editor")) {
    redirect("/admin/login");
  }

  return profile;
}
