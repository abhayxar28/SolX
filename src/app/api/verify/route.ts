import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  const secretKey = process.env.TURNSTILE_SECRET_KEY!;
  const ip = req.headers.get("x-forwarded-for");

  const response = await fetch(`${process.env.NEXT_PUBLIC_TURNSTILE_SITE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}&remoteip=${encodeURIComponent(ip ?? "")}`,
  });

  const data = await response.json();

  return NextResponse.json(data);
}
