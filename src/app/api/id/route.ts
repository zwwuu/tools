import { NextRequest, NextResponse } from "next/server";

import { getHashedIpAddress } from "~/lib/utils";

export async function POST(req: NextRequest) {
  const ipAddress = getHashedIpAddress(req.headers.get("x-real-ip"));
  return NextResponse.json({ success: true, id: ipAddress }, { status: 200 });
}
