import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import HeaderSection from "@/components/layout/Header";
import GenerateView from "@/components/generate/GenerateView";

export default function GeneratePage() {
  return (
    <main>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 font-instrument-sans">
        <div className="flex items-center gap-2 px-4 h-10">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-full"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Generate</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <HeaderSection
        className={"text-zinc-800"}
        title={"Generate Sales Page"}
        desc={
          "Create a compelling AI-powered sales page for your product in minutes."
        }
      />
      <div className="flex flex-col px-8 mt-8 mb-20 gap-4">
        <GenerateView />
      </div>
    </main>
  );
}
