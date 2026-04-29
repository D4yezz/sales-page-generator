"use client";

import { Download, Edit2, File, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function SalesPagePreview({
  generatedContent,
  isLoading,
  onSave,
  onEdit,
  isSaving,
}) {
  if (!generatedContent && !isLoading) {
    return (
      <Card className="flex items-center justify-center w-full min-h-screen bg-linear-to-br from-zinc-600 to-zinc-800 border-zinc-700">
        <CardContent className="py-12 text-center">
          <div className="flex flex-col items-center justify-center text-zinc-200">
            <p className="mb-2">
              <File size={54} />
            </p>
            <h2 className="text-2xl font-semibold">
              No sales page generated yet
            </h2>
            <p className="mt-2 text-sm text-zinc-300">
              Fill out the form and click generate to create your sales page
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full min-h-screen space-y-8">
      <Card className="overflow-hidden bg-transparent border-2 shadow-lg border-zinc-700">
        <div className="min-h-screen bg-white text-zinc-900">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin text-zinc-600" />
                <p className="text-zinc-600">Generating your sales page...</p>
              </div>
            </div>
          ) : generatedContent ? (
            <div className="max-w-4xl p-8 mx-auto space-y-8 md:p-12">
              <div className="space-y-4 text-center">
                <h1 className="text-4xl font-bold leading-tight md:text-5xl text-zinc-900">
                  {generatedContent.headline}
                </h1>
                <p className="text-xl text-zinc-600">
                  {generatedContent.subheadline}
                </p>
              </div>

              <div className="space-y-4">
                <div className="prose prose-lg max-w-none text-zinc-700">
                  {generatedContent.productDescription
                    ?.split("\n")
                    .map((paragraph, idx) => (
                      <p key={idx} className="mb-4 text-justify">
                        {paragraph}
                      </p>
                    ))}
                </div>
              </div>

              {generatedContent.benefits &&
                generatedContent.benefits.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-zinc-900">
                      Key Benefits
                    </h2>
                    <ul className="space-y-2">
                      {generatedContent.benefits.map((benefit, idx) => (
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

              {generatedContent.features &&
                generatedContent.features.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-zinc-900">
                      Features
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {generatedContent.features.map((feature, idx) => (
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

              {generatedContent.socialProof && (
                <div className="p-6 border rounded-lg bg-linear-to-br from-zinc-100 to-zinc-50 border-zinc-200">
                  <div className="space-y-3">
                    <p className="text-lg italic text-zinc-700">
                      &quot;{generatedContent.socialProof.testimonial}&quot;
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-10 h-10 text-sm font-bold text-white rounded-full bg-linear-to-br from-gray-700 to-zinc-800">
                        {generatedContent.socialProof.customerName
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900">
                          {generatedContent.socialProof.customerName}
                        </p>
                        <p className="text-sm text-zinc-600">
                          {generatedContent.socialProof.position}
                        </p>
                      </div>
                    </div>
                    {generatedContent.socialProof.rating && (
                      <p className="text-sm font-semibold text-amber-500">
                        {"⭐".repeat(generatedContent.socialProof.rating)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {generatedContent.pricing && (
                <div className="p-8 text-center text-white rounded-lg bg-linear-to-br from-gray-700 to-zinc-800">
                  <p className="mb-2 text-zinc-300">Our Price</p>
                  <div className="mb-2 text-4xl font-bold">
                    {generatedContent.pricing.currency}{" "}
                    {generatedContent.pricing.amount}
                  </div>
                  <p className="text-sm text-zinc-300">
                    {generatedContent.pricing.description}
                  </p>
                </div>
              )}

              {generatedContent.cta && (
                <div className="space-y-4 text-center">
                  <Button
                    size="lg"
                    className="h-12 px-8 text-white transition-all border shadow-lg bg-linear-to-r from-gray-700 to-zinc-800 hover:from-gray-600 hover:to-zinc-700 border-zinc-600 hover:border-zinc-500 hover:shadow-xl"
                  >
                    {generatedContent.cta}
                  </Button>
                  {generatedContent.ctaDescription && (
                    <p className="text-sm text-zinc-600">
                      {generatedContent.ctaDescription}
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </Card>

      {generatedContent && (
        <div className="flex gap-3">
          <Button
            onClick={onEdit}
            variant="outline"
            className="flex-1 h-10 border-zinc-600 text-zinc-800 hover:bg-zinc-300"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit & Regenerate
          </Button>
          <Button
            onClick={onSave}
            disabled={isSaving}
            className="flex-1 h-10 text-white border bg-linear-to-r from-gray-700 to-zinc-800 hover:from-gray-600 hover:to-zinc-700 border-zinc-600 hover:border-zinc-500"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Save Page
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
