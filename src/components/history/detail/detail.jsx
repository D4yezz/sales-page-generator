import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getDetailPage } from "@/service/generate.service";
import { ArrowLeft, FileCode, Pencil } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Detail() {
  const id = usePathname().split("/").pop();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const exportRef = useRef(null);

  useEffect(() => {
    const loadPages = async () => {
      setIsLoading(true);

      try {
        const response = await getDetailPage(id);
        if (response.success) {
          setData(response.data);
        } else {
          throw new Error(response.error || "Failed to fetch pages");
        }
      } catch (err) {
        console.error("Error fetching pages:", err);
        toast.error(err.message || "Failed to fetch pages");
      } finally {
        setIsLoading(false);
      }
    };
    loadPages();
  }, [id]);
  const handleExportHTML = (productName) => {
    if (!exportRef.current) return;

    const content = exportRef.current.innerHTML;

    const fullHTML = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sales Page</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-white">
    ${content}
  </body>
  </html>
  `;

    const blob = new Blob([fullHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${productName}.html`;
    a.click();

    URL.revokeObjectURL(url);
  };

  console.log(data);
  if (isLoading) {
    return <Skeleton className="h-[50vh] w-full rounded-lg bg-zinc-200" />;
  }
  return (
    <section className="p-0 overflow-hidden bg-white  text-zinc-900 font-instrument">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between gap-4 px-6 py-4 rounded bg-zinc-800">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => window.history.back()}
              className={"text-zinc-800 bg-zinc-100"}
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h2 className="text-xl font-semibold text-zinc-100">
                Preview: {data?.product_name}
              </h2>
              <p className="text-sm text-zinc-300">Sales page preview</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className={"bg-zinc-100 text-zinc-800 hover:text-white"}
              asChild
            >
              <Link href={`/history/${id}/edit`}>
                <Pencil />
              </Link>
            </Button>
            <Button
              onClick={() => handleExportHTML(data?.product_name)}
              className={"bg-zinc-100 text-zinc-800 "}
            >
              Export HTML
              <FileCode />
            </Button>
          </div>
        </div>

        <div ref={exportRef} className="flex-1 overflow-y-auto">
          <div className="max-w-3xl p-8 mx-auto space-y-8 md:p-12">
            <div className="space-y-4 text-center">
              <h1 className="text-4xl font-bold leading-tight md:text-5xl text-zinc-900">
                {data.generated_result?.headline}
              </h1>
              <p className="text-xl text-zinc-600">
                {data.generated_result?.subheadline}
              </p>
            </div>
            <div className="space-y-4">
              <div className="prose prose-lg max-w-none text-zinc-700">
                {data.generated_result?.productDescription
                  ?.split("\n")
                  .map((paragraph, idx) => (
                    <p key={idx} className="mb-4 text-justify">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>

            {data.generated_result?.benefits &&
              data.generated_result?.benefits.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-zinc-900">
                    Key Benefits
                  </h2>
                  <ul className="space-y-2">
                    {data.generated_result?.benefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-zinc-700"
                      >
                        <span className="inline-flex items-center justify-center h-6 w-6 bg-linear-to-br from-gray-700 to-zinc-800 text-white rounded-full text-sm shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {data.generated_result?.features &&
              data.generated_result?.features.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-zinc-900">Features</h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {data.generated_result?.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="p-4 transition-shadow border rounded-lg border-zinc-200 hover:shadow-md"
                      >
                        <h3 className="mb-2 font-semibold text-zinc-900">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-zinc-600">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {data.generated_result?.socialProof && (
              <div className="p-6 border rounded-lg bg-linear-to-br from-zinc-100 to-zinc-50 border-zinc-200">
                <div className="space-y-3">
                  <p className="text-lg italic text-zinc-700">
                    &quot;{data.generated_result?.socialProof.testimonial}&quot;
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-10 h-10 text-sm font-bold text-white rounded-full bg-linear-to-br from-gray-700 to-zinc-800">
                      {data.generated_result?.socialProof.customerName
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900">
                        {data.generated_result?.socialProof.customerName}
                      </p>
                      <p className="text-sm text-zinc-600">
                        {data.generated_result?.socialProof.position}
                      </p>
                    </div>
                  </div>
                  {data.generated_result?.socialProof.rating && (
                    <p className="text-sm font-semibold text-amber-500">
                      {"⭐".repeat(data.generated_result?.socialProof.rating)}
                    </p>
                  )}
                </div>
              </div>
            )}

            {data.generated_result?.pricing && (
              <div className="p-8 text-center text-white rounded-lg bg-gradient-to-br from-gray-700 to-zinc-800">
                <p className="mb-2 text-zinc-300">Our Price</p>
                <div className="mb-2 text-4xl font-bold">
                  {data.generated_result?.pricing.currency}
                  {data.generated_result?.pricing.amount}
                </div>
                <p className="text-sm text-zinc-300">
                  {data.generated_result?.pricing.description}
                </p>
              </div>
            )}

            {data.generated_result?.cta && (
              <div className="space-y-4 text-center">
                <Button
                  size="lg"
                  className="text-white border bg-gradient-to-r from-gray-700 to-zinc-800 hover:from-gray-600 hover:to-zinc-700 border-zinc-600 hover:border-zinc-500"
                >
                  {data.generated_result?.cta}
                </Button>
                {data.generated_result?.ctaDescription && (
                  <p className="text-sm text-zinc-600">
                    {data.generated_result?.ctaDescription}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
