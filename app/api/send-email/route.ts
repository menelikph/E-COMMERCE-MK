
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { to, subject, message } = body;

    console.log(to, subject, message);
    const sendTo = to || process.env.EMAIL_TO;

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: sendTo,
      subject: subject || "Nuevo producto agregado",
      html: message || "<p>Tu producto fue agregado correctamente.</p>",
    });

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}
