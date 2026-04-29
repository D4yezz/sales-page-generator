import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: error.message,
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      status: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.error("Logout API error:", error);
    return NextResponse.json(
      {
        status: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
