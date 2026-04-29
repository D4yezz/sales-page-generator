"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const emptyForm = {
  productName: "",
  description: "",
  features: [],
  targetAudience: "",
  price: "",
  usp: "",
};
export function ProductInputForm({ onSubmit, isLoading, initialData = null }) {
  const [formData, setFormData] = useState(initialData || emptyForm);

  const [featureInput, setFeatureInput] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.productName.trim()) {
      toast.error("Product name is required");
      return;
    }
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-h-screen col-span-1 bg-linear-to-br from-zinc-700 to-zinc-800 border-zinc-700 h-fit">
      <CardHeader>
        <CardTitle className="text-white">Product Information</CardTitle>
        <CardDescription className="text-zinc-400">
          Provide details about your product to generate a compelling sales page
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="productName" className="text-white">
            Product / Service Name <span className="text-red-400">*</span>
          </Label>
          <Input
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="E.g., Premium Cloud Storage Solution"
            className="text-white bg-zinc-900 border-zinc-600 placeholder:text-zinc-500 focus-visible:ring-zinc-300"
            required
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
            placeholder="Describe what your product does and its main benefits..."
            className="text-white resize-none bg-zinc-900 border-zinc-600 placeholder:text-zinc-500 focus-visible:ring-zinc-300 min-h-24"
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
              placeholder="Add a feature and press Enter..."
              className="text-white bg-zinc-900 border-zinc-600 placeholder:text-zinc-500 focus-visible:ring-zinc-300"
            />
            <Button
              type="button"
              onClick={handleAddFeature}
              variant="outline"
              size="sm"
              className="border-zinc-600 text-zinc-800 hover:bg-zinc-700"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {formData.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 text-sm text-white rounded-full bg-zinc-700"
                >
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="hover:bg-zinc-600 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="targetAudience" className="text-white">
              Target Audience
            </Label>
            <Input
              id="targetAudience"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              placeholder="E.g., Small business owners, startups, enterprises"
              className="text-white bg-zinc-900 border-zinc-600 placeholder:text-zinc-500 focus-visible:ring-zinc-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price" className="text-white">
              Price
            </Label>
            <Input
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="E.g., $99/month or $999 one-time"
              className="text-white bg-zinc-900 border-zinc-600 placeholder:text-zinc-500 focus-visible:ring-zinc-300"
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
              className="text-white bg-zinc-900 border-zinc-600 placeholder:text-zinc-500 focus-visible:ring-zinc-300"
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={isLoading || !formData.productName.trim()}
          className="w-full transition-all border shadow-lg bg-linear-to-br from-zinc-100 to-zinc-200 hover:from-slate-200 hover:to-slate-300 text-zinc-800 hover:text-gray-800 border-zinc-600 hover:border-zinc-500 hover:shadow-xl disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Sales Page"
          )}
        </Button>
      </form>
    </Card>
  );
}
