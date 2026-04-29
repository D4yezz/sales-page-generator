"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { ProductInputForm } from "./ProductInputForm";
import { SalesPagePreview } from "./SalesPagePreview";
import { generateSalesPage, saveSalesPage } from "@/service/generate.service";
import { useRouter } from "next/navigation";

export default function GenerateView() {
  const [formData, setFormData] = useState(null);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleGenerateSalesPage = useCallback(async (productData) => {
    setIsGenerating(true);
    setFormData(productData);

    try {
      const response = await generateSalesPage({
        productName: productData.productName,
        description: productData.description,
        features: productData.features,
        targetAudience: productData.targetAudience,
        price: productData.price,
        usp: productData.usp,
      });

      if (!response.success) {
        throw new Error(response.error || "Failed to generate sales page");
      }

      setGeneratedContent(response.data);
      toast.success("Sales page generated successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to generate sales page");
      setGeneratedContent(null);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const handleSavePage = useCallback(async () => {
    if (!formData || !generatedContent) {
      toast.error("No content to save");
      return;
    }

    setIsSaving(true);

    try {
      const response = await saveSalesPage({
        productName: formData.productName,
        description: formData.description,
        features: formData.features,
        targetAudience: formData.targetAudience,
        price: formData.price,
        usp: formData.usp,
        generatedResult: generatedContent,
      });

      if (!response.success) {
        throw new Error(response.error || "Failed to save sales page");
      }

      toast.success("Sales page saved successfully!");

      setFormData(null);
      setGeneratedContent(null);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      router.push(`/history`);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to save sales page");
    } finally {
      setIsSaving(false);
    }
  }, [formData, generatedContent, router]);

  const handleEditForm = useCallback(() => {
    const formElement = document.querySelector("form");
    formElement?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <ProductInputForm
        key={formData ? "filled" : "empty"}
        onSubmit={handleGenerateSalesPage}
        isLoading={isGenerating}
        initialData={formData}
      />
      <SalesPagePreview
        generatedContent={generatedContent}
        isLoading={isGenerating}
        onSave={handleSavePage}
        onEdit={handleEditForm}
        isSaving={isSaving}
        productName={formData?.productName}
      />
    </div>
  );
}
