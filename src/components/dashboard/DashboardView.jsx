"use client";

import { WelcomeUserCard } from "./WelcomeUserCard";
import { TotalGeneratedCard } from "./TotalGeneratedCard";
import { LastGeneratedCard } from "./LastGeneratedCard";
import { QuickActionButton } from "./QuickActionButton";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { getProfileUser } from "@/service/auth.service";
import { getDashboardData } from "@/service/dashboard.service";

function DashboardSkeleton() {
  return <Skeleton className="h-[50vh] w-full rounded-lg bg-zinc-200" />;
}

export default function DashboardView() {
  const [userData, setUserData] = useState({
    userId: "",
    full_name: "",
    email: "",
  });
  const [data, setData] = useState({
    totalPages: 0,
    lastGenerated: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const res = await getProfileUser();
      if (res.status && res.data) {
        setUserData({
          userId: res.data.profile.id,
          full_name: res.data.profile.full_name,
          email: res.data.auth.email,
        });
      }
      setIsLoading(false);
    };

    getUserData();
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboardData();

        if (res.status) {
          setData(res.data);
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (error) {
    return (
      <div className="grid grid-cols-1 gap-4 p-4 border border-red-700 rounded-lg bg-red-900/20">
        <p className="text-red-400">
          ⚠️ An error occurred while loading the dashboard data.
        </p>
        <p className="text-sm text-red-300">
          Please try refreshing the page or contact support if the issue
          persists.
        </p>
      </div>
    );
  }

  return (
    <>
      {isLoading && !data.user ? (
        <DashboardSkeleton />
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <WelcomeUserCard user={userData} isLoading={isLoading} />
            <TotalGeneratedCard
              totalPages={data.totalPages}
              isLoading={isLoading}
            />
          </div>
          <LastGeneratedCard
            lastGenerated={data.lastGenerated}
            isLoading={isLoading}
          />
          <QuickActionButton />
        </div>
      )}
    </>
  );
}
