import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Location = {
  city: string;
  code: string;
  lat: number;
  lon: number;
};

export const POPULAR_LOCATIONS: Location[] = [
  { city: "Beijing", code: "CN", lat: 39.9075, lon: 116.3972 },
  { city: "Berlin", code: "DE", lat: 52.5244, lon: 13.4105 },
  { city: "Cape Town", code: "ZA", lat: -33.9258, lon: 18.4232 },
  { city: "London", code: "GB", lat: 51.5085, lon: -0.1257 },
  { city: "Los Angeles", code: "US", lat: 34.0522, lon: -118.2437 },
  { city: "Madrid", code: "ES", lat: 40.4291, lon: -3.7011 },
  { city: "Mexico City", code: "MX", lat: 19.4285, lon: -99.1277 },
  { city: "Moscow", code: "RU", lat: 55.7522, lon: 37.6156 },
  { city: "Mumbai", code: "IN", lat: 19.0144, lon: 72.8479 },
  { city: "New York", code: "US", lat: 40.7143, lon: -74.006 },
  { city: "Paris", code: "FR", lat: 48.8534, lon: 2.3488 },
  { city: "São Paulo", code: "BR", lat: -23.5475, lon: -46.6361 },
  { city: "Sydney", code: "AU", lat: -33.8679, lon: 151.2073 },
  { city: "Tokyo", code: "JP", lat: 35.6895, lon: 139.6917 },
  { city: "Toronto", code: "CA", lat: 43.7001, lon: -79.4163 },
];

export enum Unit {
  Celsius = "celsius",
  Fahrenheit = "fahrenheit",
  Kelvin = "kelvin",
}

export const convertFn = {
  [Unit.Celsius]: (kelvin: number) => Math.round(kelvin - 273.15),
  [Unit.Fahrenheit]: (kelvin: number) => Math.round((kelvin - 273.15) * 1.8 + 32),
  [Unit.Kelvin]: (kelvin: number) => kelvin,
} as const;

export const unitLabels = {
  [Unit.Celsius]: "°C",
  [Unit.Fahrenheit]: "°F",
  [Unit.Kelvin]: "K",
} as const;

export const UNITS = [Unit.Celsius, Unit.Fahrenheit, Unit.Kelvin] as const;

type State = {
  city?: Location;
  unit: Unit;
};

type Actions = {
  setUnit: (unit: Unit) => void;
  setCity: (city: Location) => void;
};

export const useWeatherStore = create<State & Actions>()(
  persist(
    immer(
      devtools(
        (set) => ({
          city: undefined,
          unit: Unit.Celsius,
          setUnit: (unit: Unit) => set({ unit }, false, { type: "setUnit", unit }),
          setCity: (city: Location) => set({ city }, false, { type: "setCity", city }),
        }),
        { name: "weather" },
      ),
    ),
    {
      name: "weather",
      version: 0,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
