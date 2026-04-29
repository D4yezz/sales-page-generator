"use client";

import { Zap, Loader2 } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TotalGeneratedCard({ totalPages, isLoading }) {
  return (
    <Card className="col-span-1 transition-colors bg-white border-zinc-700 hover:border-zinc-600">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardDescription className="text-zinc-700">
              Total Pages Created
            </CardDescription>
            <CardTitle className="mt-2 text-3xl font-bold text-zinc-800">
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </span>
              ) : (
                totalPages
              )}
            </CardTitle>
          </div>
          <div className="ml-4">
            <div className="flex items-center justify-center w-12 h-12 text-white rounded-full bg-linear-to-br from-zinc-600 to-zinc-800 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm text-zinc-700">
          {totalPages > 0
            ? `You have created ${totalPages} sales pages`
            : " No pages have been created yet"}
        </p>
      </CardHeader>
    </Card>
  );
}
