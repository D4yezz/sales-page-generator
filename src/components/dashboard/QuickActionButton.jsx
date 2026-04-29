"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function QuickActionButton() {
  return (
    <Card className="flex items-center justify-center col-span-1 transition-colors border-2 bg-linear-to-br from-zinc-700 to-zinc-800 hover:border-white border-zinc-600 min-h-45">
      <CardHeader className="flex flex-col items-center justify-center w-full text-center">
        <CardDescription className="mb-4 text-zinc-200">
          Start Creating Now
        </CardDescription>
        <Link href="/generate">
          <Button
            size="lg"
            className="text-black transition-all duration-300 ease-in-out border-2 shadow-lg bg-linear-to-br from-zinc-100 to-zinc-200 hover:text-white hover:from-gray-600 hover:to-zinc-700 border-zinc-900 hover:border-zinc-500 hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create a New Page
          </Button>
        </Link>
        <p className="max-w-xs mt-4 text-xs text-zinc-200">
          Click the button above to create a new sales page with AI
        </p>
      </CardHeader>
    </Card>
  );
}
