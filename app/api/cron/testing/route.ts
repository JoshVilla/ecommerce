import { NextResponse } from "next/server";

export async function GET() {
  console.log("🕒 Cron called at:", new Date().toISOString());

  return NextResponse.json({
    success: true,
    time: new Date().toISOString(),
  });
}