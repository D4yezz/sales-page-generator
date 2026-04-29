import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const systemPrompt = `You are an expert sales copywriter. Generate a professional, compelling sales page in valid JSON format.

Return ONLY valid JSON (no markdown, no code blocks) with this exact structure:
{
  "headline": "Compelling main heading that hooks the reader",
  "subheadline": "Supporting headline that clarifies the benefit",
  "productDescription": "2-3 paragraph description of what the product/service does",
  "benefits": [
    "Benefit 1 with clear value proposition",
    "Benefit 2 with clear value proposition",
    "Benefit 3 with clear value proposition"
  ],
  "features": [
    {
      "title": "Feature Name",
      "description": "What this feature does and why it matters"
    }
  ],
  "socialProof": {
    "testimonial": "Sample customer testimonial quote",
    "customerName": "Customer Name",
    "position": "Customer Position",
    "rating": "5"
  },
  "pricing": {
    "amount": "Price amount",
    "currency": "Currency symbol",
    "description": "What's included or billing period"
  },
  "cta": "Clear, action-oriented call-to-action button text",
  "ctaDescription": "Supporting text for the CTA"
}`;

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");

    const { productName, description, features, targetAudience, price, usp } =
      await request.json();

    if (!productName) {
      return Response.json(
        { error: "Product name is required" },
        { status: 400 },
      );
    }

    const userPrompt = `
Create a sales page for the following product/service:

Product Name: ${productName}
Description: ${description || "Not provided"}
Key Features: ${features?.length > 0 ? features.join(", ") : "Not provided"}
Target Audience: ${targetAudience || "Not provided"}
Price: ${price || "Not provided"}
Unique Selling Point: ${usp || "Not provided"}

Create a comprehensive sales page with attractive, professional colors to turn visitors into customers.`;

    const response = await genAI.models.generateContent({
      // model: "gemini-2.5-flash",
      model: "gemini-3-flash-preview",
      contents: systemPrompt + "\n\n" + userPrompt,
    });

    const generatedText = response.text;

    let parsedContent;
    try {
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : generatedText;
      parsedContent = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Error parsing Gemini response:", generatedText);
      return Response.json(
        { error: "Failed to parse generated content" },
        { status: 500 },
      );
    }

    return Response.json({
      success: true,
      data: parsedContent,
      message: "Sales page generated successfully",
    });
  } catch (error) {
    console.error("Error generating sales page:", error);
    return Response.json(
      { error: error.message || "Failed to generate sales page" },
      { status: 500 },
    );
  }
}
