import { NextResponse } from "next/server";
import { Resend } from "resend";

type ApplicationPayload = {
  name: string;
  email: string;
  phone?: string;
  linkedin: string;
  motivation: string;
  position: string;
};

const REQUIRED_FIELDS: Array<keyof ApplicationPayload> = [
  "name",
  "email",
  "linkedin",
  "motivation",
  "position",
];

const APPLICATION_RECIPIENT = "ortwin@actarion.com";
const resendApiKey = process.env.RESEND_API_KEY;
const resendFromEmail = process.env.RESEND_FROM_EMAIL ?? "ActARion Careers <careers@actarion.com>";
const resend = resendApiKey ? new Resend(resendApiKey) : null;

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

function isValidLinkedIn(link: string) {
  try {
    const url = new URL(link);
    return url.hostname.toLowerCase().includes("linkedin.com");
  } catch {
    return false;
  }
}

function buildEmailBody(payload: ApplicationPayload) {
  const lines = [
    `Position: ${payload.position}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "Not provided"}`,
    `LinkedIn: ${payload.linkedin}`,
    "",
    "Motivation:",
    payload.motivation,
  ];

  return lines.join("\n");
}

function buildEmailHtml(payload: ApplicationPayload) {
  return `
    <h2>New job application received</h2>
    <ul>
      <li><strong>Position:</strong> ${payload.position}</li>
      <li><strong>Name:</strong> ${payload.name}</li>
      <li><strong>Email:</strong> ${payload.email}</li>
      <li><strong>Phone:</strong> ${payload.phone || "Not provided"}</li>
      <li><strong>LinkedIn:</strong> <a href="${payload.linkedin}">${payload.linkedin}</a></li>
    </ul>
    <h3>Motivation</h3>
    <p>${payload.motivation.replace(/\n/g, "<br />")}</p>
  `;
}

async function sendApplicationEmail(payload: ApplicationPayload) {
  if (!resend) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const { error } = await resend.emails.send({
    from: resendFromEmail,
    to: APPLICATION_RECIPIENT,
    subject: `New job application: ${payload.position} - ${payload.name}`,
    text: buildEmailBody(payload),
    html: buildEmailHtml(payload),
    replyTo: payload.email,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload: ApplicationPayload = {
      name: body?.name?.trim() ?? "",
      email: body?.email?.trim() ?? "",
      phone: body?.phone?.trim() ?? "",
      linkedin: body?.linkedin?.trim() ?? "",
      motivation: body?.motivation?.trim() ?? "",
      position: body?.position?.trim() ?? "",
    };

    const missing = REQUIRED_FIELDS.filter((field) => !payload[field]);
    if (missing.length > 0) {
      return NextResponse.json(
        {
          error: `Missing required fields: ${missing.join(", ")}`,
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(payload.email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!isValidLinkedIn(payload.linkedin)) {
      return NextResponse.json(
        { error: "Please provide a valid LinkedIn URL." },
        { status: 400 }
      );
    }

    await sendApplicationEmail(payload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Apply API error:", error);
    return NextResponse.json(
      { error: "Unable to submit application right now." },
      { status: 500 }
    );
  }
}

