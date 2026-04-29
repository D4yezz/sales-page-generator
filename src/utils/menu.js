import { History, LayoutDashboardIcon, MessageCircleCode } from "lucide-react";

export const menu = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Generate",
      url: "/generate",
      icon: <MessageCircleCode />,
    },
    {
      title: "History",
      url: "/history",
      icon: <History />,
    },
  ],
};
