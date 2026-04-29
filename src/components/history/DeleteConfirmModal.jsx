"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function DeleteConfirmModal({
  page,
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-700 font-instrument">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-900/30">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <DialogTitle className="text-lg text-white">
                Delete Sales Page?
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4 space-y-3">
          <div className="p-3 border rounded-lg bg-zinc-800 border-zinc-700">
            <p className="text-sm text-zinc-300">
              <span className="font-semibold">Product:</span>{" "}
              {page?.product_name}
            </p>
            {page?.description && (
              <p className="mt-1 text-sm text-zinc-400 line-clamp-2">
                {page.description}
              </p>
            )}
          </div>

          <p className="text-sm text-zinc-400">
            Are you sure you want to delete this sales page? All associated data
            will be permanently removed.
          </p>
        </div>

        <DialogFooter className="gap-3 bg-zinc-100">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="border-zinc-600 text-whitezinc-800 hover:text-white hover:bg-zinc-800"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isDeleting}
            className="text-white bg-red-900 hover:bg-red-800"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Page"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
