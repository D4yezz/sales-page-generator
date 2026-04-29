"use client";

import { Eye, Edit2, Trash2, MoreHorizontal, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatTimeAgo, formatDate } from "@/utils/formatTime";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function SalesPageCard({ page, onDelete }) {
  const router = useRouter();
  return (
    <Card className="col-span-1 transition-all bg-linear-to-br font-instrument from-zinc-700 to-zinc-800 border-zinc-700 hover:border-zinc-600 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg text-white truncate">
              {page.product_name}
            </CardTitle>
            <CardDescription className="mt-1 text-sm text-zinc-400">
              Created {formatTimeAgo(page.created_at)}
            </CardDescription>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 ml-2 text-zinc-400 hover:text-white hover:bg-zinc-700"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-zinc-900 border-zinc-700 font-instrument"
            >
              <DropdownMenuItem
                onClick={() => router.push("/history" + "/" + page.id)}
                className="cursor-pointer text-zinc-100 hover:bg-zinc-300 focus:bg-zinc-300"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push("/history" + "/" + page.id + "/edit")
                }
                className="cursor-pointer text-zinc-100 hover:bg-zinc-300 focus:bg-zinc-300"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit & Regenerate
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-zinc-700" />
              <DropdownMenuItem
                onClick={() => onDelete(page)}
                className="text-red-400 cursor-pointer hover:bg-zinc-300 focus:bg-zinc-300"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2 text-sm">
          {page.description && (
            <p className="text-zinc-300 line-clamp-2">{page.description}</p>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            {page.target_audience && (
              <span className="inline-block px-2 py-1 text-xs rounded bg-zinc-700 text-zinc-100">
                {page.target_audience}
              </span>
            )}
            {page.price && (
              <span className="inline-block px-2 py-1 text-xs rounded bg-amber-900/30 text-amber-300">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                }).format(
                  Number(page.price.replace(/\./g, "").replace(",", ".")),
                )}
              </span>
            )}
            {page.features && page.features.length > 0 && (
              <span className="inline-block px-2 py-1 text-xs text-blue-300 rounded bg-blue-900/30">
                {page.features.length} features
              </span>
            )}
          </div>

          <p className="pt-2 text-xs text-zinc-500">
            Last updated: {formatDate(page.updated_at)}
          </p>
        </div>
      </CardHeader>
    </Card>
  );
}
