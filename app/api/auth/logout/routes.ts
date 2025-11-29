import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();   // ← FIXED
  cookieStore.delete("token");           // now works

  return NextResponse.json({ success: true });
}
