import { Coord } from "~/app/api/weather/types/openweathermap/Coord";
import { Weather } from "~/app/api/weather/types/openweathermap/Weather";

export type CurrentWeatherResponse = {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  rain?: Precipitation;
  snow?: Precipitation;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type Clouds = {
  all: number;
};

export type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

export type Precipitation = {
  "1h"?: number;
  "3h"?: number;
};

export type Sys = {
  type?: number;
  id?: number;
  message?: number;
  country: string;
  sunrise: number;
  sunset: number;
};

export type Wind = {
  speed: number;
  deg: number;
  gust?: number;
};
