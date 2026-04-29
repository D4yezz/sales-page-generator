import { Button } from "@/components/ui/button";

export default function PreviewEdit({ generatedResult }) {
  return (
    <div className="pt-8 mt-12 border-t border-zinc-700">
      <h2 className="mb-6 text-2xl font-semibold text-white">Preview</h2>
      <div className="p-8 space-y-8 bg-white rounded-lg text-zinc-900">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl text-zinc-900">
            {generatedResult.headline}
          </h1>
          <p className="text-xl text-zinc-600">{generatedResult.subheadline}</p>
        </div>

        <div className="space-y-4">
          <div className="prose prose-lg max-w-none text-zinc-700">
            {generatedResult.productDescription
              ?.split("\n")
              .map((paragraph, idx) => (
                <p key={idx} className="mb-4 text-justify">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>

        {generatedResult.benefits && generatedResult.benefits.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900">Key Benefits</h2>
            <ul className="space-y-2">
              {generatedResult.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3 text-zinc-700">
                  <span className="inline-flex items-center justify-center h-6 w-6 bg-linear-to-br from-gray-700 to-zinc-800 text-white rounded-full text-sm shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {generatedResult.features && generatedResult.features.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900">Features</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {generatedResult.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-4 transition-shadow border rounded-lg border-zinc-200 hover:shadow-md"
                >
                  <h3 className="mb-2 font-semibold text-zinc-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {generatedResult.socialProof && (
          <div className="p-6 border rounded-lg bg-linear-to-br from-zinc-100 to-zinc-50 border-zinc-200">
            <div className="space-y-3">
              <p className="text-lg italic text-zinc-700">
                &quot;{generatedResult.socialProof.testimonial}&quot;
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 text-sm font-bold text-white rounded-full bg-linear-to-br from-gray-700 to-zinc-800">
                  {generatedResult.socialProof.customerName
                    ?.charAt(0)
                    .toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-zinc-900">
                    {generatedResult.socialProof.customerName}
                  </p>
                  <p className="text-sm text-zinc-600">
                    {generatedResult.socialProof.position}
                  </p>
                </div>
              </div>
              {generatedResult.socialProof.rating && (
                <p className="text-sm font-semibold text-amber-500">
                  {"⭐".repeat(generatedResult.socialProof.rating)}
                </p>
              )}
            </div>
          </div>
        )}

        {generatedResult.pricing && (
          <div className="p-8 text-center text-white rounded-lg bg-linear-to-br from-gray-700 to-zinc-800">
            <p className="mb-2 text-zinc-300">Our Price</p>
            <div className="mb-2 text-4xl font-bold">
              {generatedResult.pricing.currency}
              {generatedResult.pricing.amount}
            </div>
            <p className="text-sm text-zinc-300">
              {generatedResult.pricing.description}
            </p>
          </div>
        )}

        {generatedResult.cta && (
          <div className="space-y-4 text-center">
            <Button
              size="lg"
              className="text-white border bg-linear-to-r from-gray-700 to-zinc-800 hover:from-gray-600 hover:to-zinc-700 border-zinc-600 hover:border-zinc-500"
            >
              {generatedResult.cta}
            </Button>
            {generatedResult.ctaDescription && (
              <p className="text-sm text-zinc-600">
                {generatedResult.ctaDescription}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
