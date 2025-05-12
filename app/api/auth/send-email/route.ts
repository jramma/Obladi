

import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { to, subject, html } = body;

  try {
    const data = await resend.emails.send({
      from: "Ob-La-Di <noreply@obladi.site>", // debe estar verificado en Resend
      to,
      subject,
      html,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("❌ Error enviando email:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
