import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { API_KEY, API_URL } from "~/app/api/weather/data";

const getSchema = z.object({
  lat: z.coerce.number(),
  lon: z.coerce.number(),
});

export async function GET(req: NextRequest) {
  const data = getSchema.safeParse(Object.fromEntries(req.nextUrl.searchParams));
  if (!data.success) {
    return NextResponse.json({ success: false, message: "Bad Request" }, { status: 400 });
  }

  const { lat, lon } = data.data;
  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`${API_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`),
      fetch(`${API_URL}/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=8&appid=${API_KEY}`),
    ]);

    if (!currentRes.ok || !forecastRes.ok) {
      return NextResponse.json({ success: false, message: "Bad Request" }, { status: 400 });
    }
    const [current, forecast] = await Promise.all([currentRes.json(), forecastRes.json()]);

    return NextResponse.json({ success: true, data: { current, forecast } }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ success: false, message: "Bad Request" }, { status: 400 });
  }
}
