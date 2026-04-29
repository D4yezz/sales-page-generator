import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const cookieStore = await cookies();

    // Create Supabase client using SSR helper
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
            } catch {
              // The `set` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
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

    const {
      productName,
      description,
      features,
      targetAudience,
      price,
      usp,
      generatedResult,
      template = "modern",
    } = await request.json();

    if (!productName || !generatedResult) {
      return Response.json(
        { error: "Product name and generated result are required" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("sales_pages")
      .insert({
        user_id: user.id,
        product_name: productName,
        description,
        features: features || [],
        target_audience: targetAudience,
        price,
        usp,
        generated_result: generatedResult,
        template,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return Response.json(
        { error: error.message || "Failed to save sales page" },
        { status: 500 },
      );
    }

    return Response.json({
      success: true,
      sales_page: data,
      message: "Sales page saved successfully",
    });
  } catch (error) {
    console.error("Error saving sales page:", error);
    return Response.json(
      { error: error.message || "Failed to save sales page" },
      { status: 500 },
    );
  }
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
        updated_at: new Date().toISOString().toISOString(),
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

export async function GET(request) {
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

    const { data, error } = await supabase
      .from("sales_pages")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Database error:", error);
      return Response.json(
        { error: error.message || "Failed to fetch sales pages" },
        { status: 500 },
      );
    }

    return Response.json({
      success: true,
      data: data || [],
      message: "Sales pages fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching sales pages:", error);
    return Response.json(
      { error: error.message || "Failed to fetch sales pages" },
      { status: 500 },
    );
  }
}

export async function DELETE(request) {
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
    const pageId = url.searchParams.get("id");

    if (!pageId) {
      return Response.json(
        { error: "Sales page ID is required" },
        { status: 400 },
      );
    }

    const { error } = await supabase
      .from("sales_pages")
      .delete()
      .eq("id", pageId)
      .eq("user_id", user.id);

    if (error) {
      console.error("Database error:", error);
      return Response.json(
        { error: error.message || "Failed to delete sales page" },
        { status: 500 },
      );
    }

    return Response.json({
      success: true,
      message: "Sales page deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting sales page:", error);
    return Response.json(
      { error: error.message || "Failed to delete sales page" },
      { status: 500 },
    );
  }
}
