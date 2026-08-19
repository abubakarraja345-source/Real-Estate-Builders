import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/features/auth/queries";
import { AdminLoginForm } from "@/components/forms/admin-login-form";
import { SITE_BRAND } from "@/lib/constants/site";

export default async function AdminLoginPage() {
  const profile = await getCurrentProfile();

  if (profile && (profile.role === "admin" || profile.role === "editor")) {
    redirect("/admin");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 px-6 py-16">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">{SITE_BRAND}</p>
      </div>
      <AdminLoginForm />
    </main>
  );
}
