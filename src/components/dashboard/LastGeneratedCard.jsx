"use client";

import { Clock, Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatTimeAgo, formatDateOnly } from "@/utils/formatTime";
import { Separator } from "../ui/separator";

export function LastGeneratedCard({ lastGenerated, isLoading }) {
  const hasData = lastGenerated && lastGenerated.id;

  return (
    <Card className="col-span-1 transition-colors bg-white border-zinc-700 hover:border-zinc-600 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardDescription className="text-zinc-700">
              Last Created
            </CardDescription>
            <CardTitle className="mt-2 text-xl font-semibold text-zinc-800">
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading...
                </span>
              ) : hasData ? (
                <Link
                  href={`/history/${lastGenerated.id}`}
                  className="inline-flex items-center gap-2 text-2xl font-semibold truncate transition-colors hover:text-zinc-600 text-zinc-800"
                >
                  <span className="truncate">{lastGenerated.product_name}</span>
                  <ExternalLink className="w-4 h-4 transition-opacity opacity-0 shrink-0 group-hover:opacity-100" />
                </Link>
              ) : (
                "No pages yet"
              )}
            </CardTitle>
          </div>
          <div className="ml-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-br from-zinc-600 to-zinc-800 shrink-0">
              <Clock className="w-6 h-6 text-zinc-100" />
            </div>
          </div>
        </div>
        {hasData && (
          <div className="mt-2 space-y-1 text-sm text-zinc-800">
            <p>
              Time :{" "}
              <span className="font-semibold">
                {formatTimeAgo(lastGenerated.created_at)}
              </span>
            </p>
            <p>
              Date :{" "}
              <span className="font-semibold">
                {formatDateOnly(lastGenerated.created_at)}
              </span>
            </p>
            <Separator />
            {lastGenerated.description && (
              <p className="mt-2 text-zinc-800 line-clamp-2">
                {lastGenerated.description}
              </p>
            )}
          </div>
        )}
        {!isLoading && !hasData && (
          <p className="mt-2 text-sm text-zinc-700">
            Create your first page to view it here
          </p>
        )}
      </CardHeader>
    </Card>
  );
}
