"use client";

import Main from "~/app/(base)/t/components/Main";
import Weather from "~/app/(base)/t/weather/components/Weather";
import { useWeatherStore } from "~/app/(base)/t/weather/data";

export default function WeatherPage() {
  return (
    <Main stores={[useWeatherStore]}>
      <Weather />
    </Main>
  );
}
