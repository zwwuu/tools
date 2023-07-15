"use client";

import { useState } from "react";
import { Noto_Color_Emoji } from "next/font/google";
import { IconCurrentLocation } from "@tabler/icons-react";
import ReactCountryFlag from "react-country-flag";
import { useQuery } from "react-query";

import CurrentWeather from "~/app/(base)/t/weather/components/CurrentWeather";
import ForecastWeather from "~/app/(base)/t/weather/components/ForecastWeather";
import { POPULAR_LOCATIONS, Unit, unitLabels, UNITS, useWeatherStore } from "~/app/(base)/t/weather/data";
import { ErrorResponse } from "~/app/api/types";
import { Coord } from "~/app/api/weather/types/openweathermap/Coord";
import { GeoResponse, WeatherResponse } from "~/app/api/weather/types/weather-response";
import Button from "~/components/Button";
import { Card, CardBody } from "~/components/Card";
import Input from "~/components/Form/Input";
import { InputGroup } from "~/components/Form/InputGroup";
import { RadioGroup, RadioGroupItem } from "~/components/RadioGroup";
import { useToast } from "~/hooks/useToast";

const emoji = Noto_Color_Emoji({
  weight: "400",
  subsets: ["emoji"],
});

export default function Weather() {
  const { toast } = useToast();
  const { unit, setUnit } = useWeatherStore((state) => ({
    unit: state.unit,
    setUnit: state.setUnit,
  }));
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState<Coord | undefined>(undefined);
  const { data: weather } = useQuery({
    queryKey: ["weather", coords],
    queryFn: async () => {
      if (!coords) return;
      const { dismiss } = toast({
        title: "Loading",
        description: "Fetching weather data from server...",
      });
      try {
        const res = await fetch(`/api/weather?lat=${coords.lat}&lon=${coords.lon}`, {
          method: "GET",
        });
        const resData: WeatherResponse | ErrorResponse = await res.json();
        if (resData.success) {
          return resData.data;
        } else {
          return Promise.reject(new Error(resData.message));
        }
      } catch (error) {
        if (error instanceof SyntaxError) {
          return Promise.reject(new Error("Failed to parse response from server."));
        }
        return Promise.reject("Failed to fetch weather data from server.");
      } finally {
        dismiss();
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        variant: "error",
        description: error instanceof Error ? error.message : "Failed to fetch weather data from server.",
      });
    },
    enabled: coords !== undefined,
  });
  const { error: geocodingError, refetch } = useQuery({
    queryKey: ["geo", city],
    queryFn: async () => {
      const { dismiss } = toast({
        title: "Loading",
        description: "Fetching geocoding data from server...",
      });
      try {
        const res = await fetch(`/api/weather/geo?name=${city}`, {
          method: "GET",
        });
        const resData: GeoResponse | ErrorResponse = await res.json();
        if (resData.success) {
          if (resData.data.length) {
            return resData.data;
          } else {
            return Promise.reject(new Error("No results found."));
          }
        } else {
          return Promise.reject(new Error(resData.message));
        }
      } catch (error) {
        if (error instanceof SyntaxError) {
          return Promise.reject(new Error("Failed to parse response from server."));
        }
        return Promise.reject("Failed to fetch geocoding data from server.");
      } finally {
        dismiss();
      }
    },
    onSuccess: (data) => {
      setCoords({ lat: data[0].lat, lon: data[0].lon });
    },
    onError: (error) => {
      toast({
        title: "Error",
        variant: "error",
        description: error instanceof Error ? error.message : "Failed to fetch geocoding data from server.",
      });
    },
    enabled: city.length > 0,
  });
  const randomCity = POPULAR_LOCATIONS[Math.floor(Math.random() * POPULAR_LOCATIONS.length)];

  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query.length === 0) return;

    const [cityOrLat, countryOrLon] = query.split(",");
    let lat = parseFloat(cityOrLat);
    let lon = parseFloat(countryOrLon);

    if (isNaN(lat) && isNaN(lon)) {
      setCity(query);
      if (geocodingError) {
        await refetch();
      }
    } else {
      setCoords({ lat, lon });
    }
  };

  return (
    <>
      <Card>
        <CardBody className={"space-y-4"}>
          <form onSubmit={handleSearch}>
            <InputGroup>
              <Button
                border={null}
                elevation={null}
                size={"lg"}
                title={"Locate me"}
                type={"button"}
                variant={"icon"}
                onClick={() => {
                  navigator.geolocation.getCurrentPosition(async (position) => {
                    setSearchQuery(`${position.coords.latitude}, ${position.coords.longitude}`);
                  });
                }}
              >
                <IconCurrentLocation size={"1em"} aria-hidden />
              </Button>
              <Input
                aria-invalid={geocodingError === undefined ? undefined : true}
                aria-label={"Search by city or coordinates"}
                className={"block w-full"}
                min={2}
                placeholder={`${randomCity.city}, ${randomCity.code} or ${randomCity.lat}, ${randomCity.lon}`}
                type={"search"}
                value={searchQuery}
                required
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button border={null} elevation={null} type={"submit"}>
                Search
              </Button>
            </InputGroup>
          </form>

          <RadioGroup
            className={"-m-2 flex flex-wrap justify-center text-center text-sm"}
            onValueChange={(value) => {
              const location = POPULAR_LOCATIONS.find((location) => location.city === value);
              if (location) {
                setSearchQuery(`${location.lat}, ${location.lon}`);
                setCoords({ lat: location.lat, lon: location.lon });
              }
            }}
          >
            {POPULAR_LOCATIONS.map((location) => (
              <RadioGroupItem
                className={'m-2 h-full text-sm data-[state="checked"]:shadow-none'}
                key={location.city}
                value={location.city}
                asChild
              >
                <Button>
                  <ReactCountryFlag
                    aria-label={location.code}
                    className={`${emoji.className} mr-1 drop-shadow-lg`}
                    countryCode={location.code}
                  />
                  <span>{location.city}</span>
                </Button>
              </RadioGroupItem>
            ))}
          </RadioGroup>
        </CardBody>
      </Card>
      {weather && (
        <Card>
          <CardBody className={"space-y-4"}>
            <div className={"flex flex-col items-end"}>
              <RadioGroup
                className={"flex divide-x-sm border-sm text-sm shadow-sm"}
                defaultValue={unit}
                onValueChange={(value: Unit) => {
                  setUnit(value);
                }}
              >
                {UNITS.map((unit) => {
                  return (
                    <RadioGroupItem className={"px-4 py-2"} key={unit} value={unit}>
                      {unitLabels[unit]}
                    </RadioGroupItem>
                  );
                })}
              </RadioGroup>
            </div>
            <CurrentWeather weather={weather.current} />
          </CardBody>

          <ForecastWeather forecasts={weather.forecast.list} />
        </Card>
      )}
    </>
  );
}
