import type { SuccessResponse } from "~/app/api/types";
import type { CurrentWeatherResponse } from "~/app/api/weather/types/openweathermap/CurrentWeatherResponse";
import type { DailyForecastResponse } from "~/app/api/weather/types/openweathermap/DailyForecastResponse";
import type { GeocodingResponse } from "~/app/api/weather/types/openweathermap/GeocodingResponse";

export type WeatherResponse = SuccessResponse<{
  current: CurrentWeatherResponse;
  forecast: DailyForecastResponse;
}>;

export type GeoResponse = SuccessResponse<GeocodingResponse[]>;
