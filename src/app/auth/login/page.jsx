import FormLogin from "@/components/auth/login/form";
import LoadingSuspense from "@/components/layout/LoadingSuspense";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingSuspense />}>
      <main className="bg-linear-to-br from-gray-700 to-zinc-800 text-white">
        <FormLogin />
      </main>
    </Suspense>
  );
}
