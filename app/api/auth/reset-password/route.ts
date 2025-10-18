import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { withAPILogging } from "@/lib/api-logger";

export async function POST(request: NextRequest) {
  return withAPILogging(request, async () => {
    try {
      const { email } = await request.json();

      if (!email) {
        return NextResponse.json(
          { error: "Email is required" },
          { status: 400 }
        );
      }

      const supabase = await createClient();

      // Send password reset email
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${request.nextUrl.origin}/reset-password`,
      });

      if (error) {
        console.error("Password reset error:", error);
        return NextResponse.json(
          { error: error.message || "Failed to send reset email" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { message: "Password reset email sent successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Password reset error:", error);
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  });
}
