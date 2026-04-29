"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { fetchSalesPages, deleteSalesPage } from "@/service/generate.service";
import { SalesPageCard } from "./SalesPageCard";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { Skeleton } from "@/components/ui/skeleton";
import { File } from "lucide-react";

function HistorySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2, 3, 4, 5].map((_, i) => (
        <Skeleton key={i} className="h-48 rounded-lg" />
      ))}
    </div>
  );
}

export default function HistoryView() {
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [deletePage, setDeletePage] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadPages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchSalesPages();
        if (response.success) {
          setPages(response.data);
        } else {
          throw new Error(response.error || "Failed to fetch pages");
        }
      } catch (err) {
        console.error("Error fetching pages:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadPages();
  }, []);

  const handleDelete = (page) => {
    setDeletePage(page);
  };

  const handleConfirmDelete = async () => {
    if (!deletePage) return;

    setIsDeleting(true);

    try {
      const response = await deleteSalesPage(deletePage.id);
      if (response.success) {
        setPages((prev) => prev.filter((p) => p.id !== deletePage.id));
        toast.success("Sales page deleted successfully");
        setDeletePage(null);
      } else {
        throw new Error(response.error || "Failed to delete page");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(err.message || "Failed to delete page");
    } finally {
      setIsDeleting(false);
    }
  };

  if (error) {
    return (
      <div className="grid grid-cols-1 gap-4 p-4 border border-red-700 rounded-lg bg-red-900/20">
        <p className="text-red-400">⚠️ Error loading history.</p>
        <p className="text-sm text-red-300">
          {error.message || "Failed to fetch your sales pages."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-red-300 underline hover:text-red-200"
        >
          Try again
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <HistorySkeleton />;
  }

  if (pages.length === 0) {
    return (
      <div className="flex text-zinc-200 flex-col items-center justify-center gap-4 p-8 h-[60vh] text-center border rounded-lg bg-linear-to-br from-gray-700 to-zinc-800 border-zinc-700">
        <File size={54} />

        <p className="font-semibold text-white">No sales pages yet</p>
        <p className="text-sm text-zinc-400">
          Create your first sales page to see it here
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <SalesPageCard key={page.id} page={page} onDelete={handleDelete} />
        ))}
      </div>

      <DeleteConfirmModal
        page={deletePage}
        isOpen={!!deletePage}
        onClose={() => setDeletePage(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </>
  );
}
