import { SuccessResponse } from "~/app/api/types";
import { CurrentWeatherResponse } from "~/app/api/weather/types/openweathermap/CurrentWeatherResponse";
import { DailyForecastResponse } from "~/app/api/weather/types/openweathermap/DailyForecastResponse";
import { GeocodingResponse } from "~/app/api/weather/types/openweathermap/GeocodingResponse";

export type WeatherResponse = SuccessResponse<{
  current: CurrentWeatherResponse;
  forecast: DailyForecastResponse;
}>;

export type GeoResponse = SuccessResponse<GeocodingResponse[]>;
