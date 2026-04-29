import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import HeaderSection from "@/components/layout/Header";
import DashboardView from "@/components/dashboard/DashboardView";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-zinc-700 to-zinc-800">
      <header className="flex h-16 shrink-0 items-center bg-white text-zinc-800 gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 font-instrument-sans">
        <div className="flex items-center gap-2 px-4 h-10">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-full"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <HeaderSection
        className={"text-white"}
        title={"Dashboard"}
        desc={"Manage your sales page with ease."}
      />
      <div className="flex flex-col px-8 mt-8 mb-20 gap-4">
        <DashboardView />
      </div>
    </main>
  );
}
