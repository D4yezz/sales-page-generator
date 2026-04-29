"use client";

import * as React from "react";

import { NavMain } from "@/components/dashboard/ui/nav-main";
import { NavUser } from "@/components/dashboard/ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { getProfileUser } from "@/service/auth.service";
import { menu } from "@/utils/menu";

export function AppSidebar({ ...props }) {
  const [userData, setUserData] = React.useState({
    userId: "",
    full_name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
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
  return (
    <Sidebar collapsible="offcanvas" {...props} className={"font-instrument"}>
      <SidebarHeader>
        <h3 className="text-xl text-center py-4 font-semibold text-transparent font-geist-sans bg-linear-to-br from-gray-700 to-zinc-800 bg-clip-text">
          AI Page Generator
        </h3>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menu.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
