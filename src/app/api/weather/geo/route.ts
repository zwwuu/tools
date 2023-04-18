import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { API_KEY, API_URL } from "~/app/api/weather/data";

const getSchema = z.object({
  name: z.string().trim().min(2),
});

export async function GET(req: NextRequest) {
  const data = getSchema.safeParse(Object.fromEntries(req.nextUrl.searchParams));

  if (!data.success) {
    return NextResponse.json({ success: false, message: "Bad Request" }, { status: 400 });
  }

  const { name } = data.data;
  const response = await fetch(`${API_URL}/geo/1.0/direct?q=${name}&limit=1&appid=${API_KEY}`, {
    next: { revalidate: 60 },
  });
  if (!response.ok) {
    return NextResponse.json({ success: false, message: response.statusText }, { status: 400 });
  }

  try {
    const data = await response.json();
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ success: false, message: "Bad Request" }, { status: 400 });
  }
}
