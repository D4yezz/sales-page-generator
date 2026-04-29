import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  generateSalesPage,
  getDetailPage,
  updateSalesPage,
} from "@/service/generate.service";
import { Loader2, Plus, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PreviewEdit from "./preview";

export default function EditHistory() {
  const { id } = useParams();
  const router = useRouter();
  const [page, setPage] = useState(null);
  const [formData, setFormData] = useState(null);
  const [generatedResult, setGeneratedResult] = useState(null);

  const [featureInput, setFeatureInput] = useState("");
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    const getCurrentPage = async () => {
      const response = await getDetailPage(id);

      if (response.success) {
        setPage(response.data);
        setGeneratedResult(response.data.generated_result || null);

        setFormData({
          productName: response.data.product_name || "",
          description: response.data.description || "",
          features: response.data.features || [],
          targetAudience: response.data.target_audience || "",
          price: response.data.price || "",
          usp: response.data.usp || "",
        });
      }
    };

    getCurrentPage();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFeature();
    }
  };

  const handleSaveEdit = async () => {
    if (!id) return;

    setIsSaving(true);

    try {
      const response = await updateSalesPage(id, {
        productName: formData.productName,
        description: formData.description,
        features: formData.features,
        targetAudience: formData.targetAudience,
        price: formData.price,
        usp: formData.usp,
        generatedResult: generatedResult,
      });

      if (response.success) {
        toast.success("Sales page updated successfully");
        router.push("/history");
      } else {
        throw new Error(response.error || "Failed to update page");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(err.message || "Failed to update page");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRegenerate = async () => {
    if (!formData.productName.trim()) {
      toast.error("Product name is required");
      return;
    }

    setIsRegenerating(true);

    try {
      const response = await generateSalesPage({
        productName: formData.productName,
        description: formData.description,
        features: formData.features,
        targetAudience: formData.targetAudience,
        price: formData.price,
        usp: formData.usp,
      });

      if (!response.success) {
        throw new Error(response.error || "Failed to regenerate");
      }

      setGeneratedResult(response.data);
      toast.success(
        "Sales page regenerated! Preview below, then save if satisfied.",
      );
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to regenerate");
    } finally {
      setIsRegenerating(false);
    }
  };

  if (!page || !formData) {
    return (
      <div className="w-full p-4 flex flex-col justify-center items-center gap-4">
        <Skeleton className="h-[80vh] w-full rounded-lg bg-zinc-200" />
        <Skeleton className="h-[90vh] w-full rounded-lg bg-zinc-200" />
      </div>
    );
  }

  return (
    <div className="w-full text-zinc-100 p-6 min-h-screen font-instrument">
      <div className=" z-10 pb-4 border-b border-zinc-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl font-semibold">
              Edit & Regenerate
            </h2>
            <p className="text-zinc-300">{page.product_name}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6 py-4">
        <div className="space-y-2">
          <Label htmlFor="productName" className="text-white">
            Product/Service Name <span className="text-red-400">*</span>
          </Label>
          <Input
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="E.g., Premium Cloud Storage Solution"
            className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-white">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe what your product does..."
            className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-200 min-h-20 resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="featureInput" className="text-white">
            Key Features
          </Label>
          <div className="flex gap-2">
            <Input
              id="featureInput"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a feature..."
              className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-200"
            />
            <Button
              type="button"
              onClick={handleAddFeature}
              variant="outline"
              size="sm"
              className="border-zinc-600 text-zinc-800 hover:bg-zinc-700"
            >
              <Plus />
            </Button>
          </div>

          {formData.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-zinc-100 text-zinc-800 px-2 py-1 rounded text-sm"
                >
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="hover:bg-zinc-300 rounded p-1"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="targetAudience" className="text-white">
            Target Audience
          </Label>
          <Input
            id="targetAudience"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            placeholder="E.g., Small business owners, startups"
            className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-200"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price" className="text-white">
              Price
            </Label>
            <Input
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="E.g., $99/month"
              className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="usp" className="text-white">
              Unique Selling Point
            </Label>
            <Input
              id="usp"
              name="usp"
              value={formData.usp}
              onChange={handleChange}
              placeholder="What makes you different?"
              className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-200"
            />
          </div>
        </div>

        <div className="pt-4">
          <Button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
          >
            {isRegenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Regenerating...
              </>
            ) : (
              "Regenerate Preview"
            )}
          </Button>
          <p className="text-zinc-400 text-sm mt-2">
            Click to regenerate the sales page preview with your current form
            data
          </p>
        </div>
      </div>

      <div className="pt-4 flex gap-3">
        <Button
          variant="outline"
          onClick={() => router.push("/history")}
          disabled={isRegenerating || isSaving}
          className="flex-1 border-zinc-800 text-zinc-800 h-12 border-2 hover:bg-zinc-300"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSaveEdit}
          disabled={isRegenerating || isSaving}
          className="flex-1 bg-zinc-800 hover:bg-zinc-700 border-zinc-100 border-2 h-12 text-white"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>

      {generatedResult && <PreviewEdit generatedResult={generatedResult} />}
    </div>
  );
}
