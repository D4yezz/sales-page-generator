import { LoaderCircle } from "lucide-react";

export default function LoadingSuspense() {
  return (
    <section className="w-full h-screen bg-linear-to-br from-zinc-600 to-zinc-800 flex items-center justify-center">
      <span className="animate-spin">
        <LoaderCircle />
      </span>
      <h2>Loading...</h2>
    </section>
  );
}
