import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirect = searchParams.get("redirect") ?? "/";

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.redirect(`${origin}/login`);

    // Check if user is an ONG
    const { data: ong } = await supabase
      .from("ong")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (ong) {
      return NextResponse.redirect(`${origin}/ong/dashboard`);
    }

    // Check if user is a donante
    const { data: donante } = await supabase
      .from("donante")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!donante) {
      return NextResponse.redirect(`${origin}/onboarding`);
    }

    return NextResponse.redirect(`${origin}${redirect}`);
  }

  return NextResponse.redirect(`${origin}/login`);
}
