import { NextResponse } from "next/server";

type Payload = {
  email: string;
  firstName?: string;
  role?: string;
  source?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    const email = (body.email || "").trim().toLowerCase();
    const firstName = (body.firstName || "").trim();
    const role = (body.role || "").trim();
    const source = (body.source || "newsletter_popup").trim();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    const apiKey = process.env.LOOPS_API_KEY;
    const newslettersListId = process.env.LOOPS_NEWSLETTERS_LIST_ID;

    if (!apiKey || !newslettersListId) {
      return NextResponse.json(
        { ok: false, error: "Missing Loops configuration" },
        { status: 500 }
      );
    }

    // Loops: POST /api/v1/contacts/create
    // mailingLists must be an object: { [listId]: true } to subscribe.
    const res = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        firstName: firstName || undefined,
        source: source || undefined,
        // Put optional fields into userGroup for segmentation
        userGroup: role || undefined,
        mailingLists: {
          [newslettersListId]: true,
        },
      }),
    });

    // If contact already exists, try to update instead
    if (!res.ok) {
      const errorText = await res.text().catch(() => "");
      
      // Check if the error is because contact already exists
      if (errorText.includes("already exists") || res.status === 409) {
        // Try to update the existing contact
        const updateRes = await fetch("https://app.loops.so/api/v1/contacts/update", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            firstName: firstName || undefined,
            source: source || undefined,
            userGroup: role || undefined,
            mailingLists: {
              [newslettersListId]: true,
            },
          }),
        });

        if (!updateRes.ok) {
          const updateError = await updateRes.text().catch(() => "");
          return NextResponse.json(
            { ok: false, error: "Failed to update contact", details: updateError },
            { status: 502 }
          );
        }

        return NextResponse.json({ ok: true, updated: true });
      }

      return NextResponse.json(
        { ok: false, error: "Loops request failed", details: errorText },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}
