import supabase from "@/lib/supabase/client";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(context) {
  const { id } = await context.params;
  const detailPages = await supabase
    .from("sales_pages")
    .select("*")
    .eq("id", id)
    .single();

  if (!detailPages) {
    return NextResponse.json(
      { message: "Detail pages not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(detailPages);
}

export async function PUT(request) {
  try {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options),
              );
            } catch {}
          },
        },
      },
    );

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const pageId = url.pathname.split("/").pop();

    const {
      productName,
      description,
      features,
      targetAudience,
      price,
      usp,
      generatedResult,
      template,
    } = await request.json();

    const { data, error } = await supabase
      .from("sales_pages")
      .update({
        product_name: productName,
        description,
        features: features || [],
        target_audience: targetAudience,
        price,
        usp,
        generated_result: generatedResult,
        template,
        updated_at: new Date().toISOString(),
      })
      .eq("id", pageId)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return Response.json(
        { error: error.message || "Failed to update sales page" },
        { status: 500 },
      );
    }

    return Response.json({
      success: true,
      data,
      message: "Sales page updated successfully",
    });
  } catch (error) {
    console.error("Error updating sales page:", error);
    return Response.json(
      { error: error.message || "Failed to update sales page" },
      { status: 500 },
    );
  }
}
