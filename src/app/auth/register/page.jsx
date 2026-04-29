import { RegisterForm } from "@/components/auth/register/form";
import LoadingSuspense from "@/components/layout/LoadingSuspense";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <Suspense fallback={<LoadingSuspense />}>
      <main className="font-instrument min-h-screen w-full bg-linear-to-br from-gray-700 to-zinc-800 text-white flex items-center justify-center">
        <div className="max-w-full">
          <RegisterForm />
        </div>
      </main>
    </Suspense>
  );
}
