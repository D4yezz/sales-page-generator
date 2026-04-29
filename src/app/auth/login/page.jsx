import FormLogin from "@/components/auth/login/form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="bg-linear-to-br from-gray-700 to-zinc-800 text-white">
        <FormLogin />
      </main>
    </Suspense>
  );
}
