import { Resend } from "resend";
import { NextResponse } from "next/server";

// We keep the Resend initialization but make it optional to avoid build-time errors
// when the API key is missing. The user wants the form to be non-functional.
const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, message } = await req.json();

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // If Resend is configured, we could send the email, 
    // but the user explicitly asked for the form to be non-functional (UI only).
    // So we just log the attempt and return success.
    console.log("Contact form submission received (non-functional):", {
      fullName,
      email,
      phone,
      message,
    });

    /* 
    if (resend) {
      const { data, error } = await resend.emails.send({
        from: "Brewcycle Contact <onboarding@resend.dev>",
        to: [process.env.CONTACT_RECEIVER_EMAIL || "hallo@brewcycle.de"],
        subject: `Neue Kontaktanfrage von ${fullName}`,
        replyTo: email,
        html: `
          <h2>Neue Kontaktanfrage</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>E-Mail:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone || "Nicht angegeben"}</p>
          <p><strong>Nachricht:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });

      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json({ error }, { status: 500 });
      }
    }
    */

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
