"use client";

import { UserCircle2, Loader2 } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function WelcomeUserCard({ user, isLoading }) {
  return (
    <Card className="col-span-1 transition-colors bg-white border-zinc-700 hover:border-zinc-600">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardDescription className="text-zinc-700">Welcome</CardDescription>
            <CardTitle className="mt-2 text-2xl font-semibold text-zinc-800">
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading...
                </span>
              ) : user?.full_name ? (
                `Hello, ${user.full_name}! 👋`
              ) : (
                "Hello!"
              )}
            </CardTitle>
          </div>
          <div className="ml-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-br from-zinc-600 to-zinc-800 shrink-0">
              <UserCircle2 className="text-white w-7 h-7" />
            </div>
          </div>
        </div>
        <p className="mt-2 text-zinc-800">
          Ready to create a new sales page today?
        </p>
      </CardHeader>
    </Card>
  );
}
