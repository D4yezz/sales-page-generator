import { LoaderCircle } from "lucide-react";

export default function LoadingSuspense() {
  return (
    <section className="w-full h-screen font-instrument text-white bg-linear-to-br from-zinc-600 to-zinc-800 flex flex-col items-center justify-center">
      <span className="animate-spin">
        <LoaderCircle />
      </span>
      <h2 className="font-semibold text-xl">Loading...</h2>
    </section>
  );
}
