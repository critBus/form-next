import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Simular procesamiento
  await new Promise((res) => setTimeout(res, 500));
  return NextResponse.json({ ok: true });
}
