import { AppSidebar } from "@/components/dashboard/ui/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function MainLayout({ children }) {
  return (
    <SidebarProvider className="font-instrument">
      <AppSidebar />
      <SidebarInset className="flex flex-col w-full overflow-x-hidden">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
