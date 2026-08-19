import { NextResponse } from "next/server";

// TODO: revalidate the relevant paths/tags once content sources (Supabase,
// admin CMS) are connected.
export async function POST() {
  return NextResponse.json(
    { error: "Not implemented" },
    { status: 501 },
  );
}
