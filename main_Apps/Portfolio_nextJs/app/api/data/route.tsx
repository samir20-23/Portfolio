// File: app/api/data/route.ts

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// point this at your public/data.json
const dataFilePath = path.join(process.cwd(), "public", "data.json");

export async function GET() {
  // read raw file text
  const text = fs.readFileSync(dataFilePath, "utf-8");
  return new NextResponse(text, {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  // take raw body text (no JSON.parse)
  const newText = await request.text();
  fs.writeFileSync(dataFilePath, newText, "utf-8");
  return NextResponse.json({ success: true });
}
