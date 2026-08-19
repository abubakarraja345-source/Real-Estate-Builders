import { NextResponse } from "next/server";

// TODO: insert into the Supabase `leads` table once it exists in
// supabase/migrations/.
export async function POST() {
  return NextResponse.json(
    { error: "Not implemented" },
    { status: 501 },
  );
}
