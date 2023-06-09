"use client";

import Main from "~/app/t/components/Main";
import Weather from "~/app/t/weather/components/Weather";
import { useWeatherStore } from "~/app/t/weather/data";

export default function WeatherPage() {
  return (
    <Main stores={[useWeatherStore]}>
      <Weather />
    </Main>
  );
}
