import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req) {
  const supabase = await createClient();

  try {
    const { email, password, confirm_password, full_name } = await req.json();

    if (!email || !password || !confirm_password || !full_name) {
      return NextResponse.json(
        { status: false, message: "Please fill all the fields" },
        { status: 400 },
      );
    }

    if (password !== confirm_password) {
      return NextResponse.json(
        {
          status: false,
          message: "Password and confirm password do not match",
        },
        { status: 400 },
      );
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { status: false, message: error.message },
        { status: 400 },
      );
    }

    const userId = data.user.id;

    const { error: insertError } = await supabase.from("profiles").insert([
      {
        id: userId,
        full_name,
        email,
      },
    ]);

    if (insertError) {
      return NextResponse.json(
        { status: false, message: insertError.message },
        { status: 400 },
      );
    }

    return NextResponse.json({
      status: true,
      message: "Register successfully",
      user: data.user,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { status: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
