import { IconArrowRight } from "@tabler/icons-react";

import { Forecast } from "~/app/api/weather/types/openweathermap/DailyForecastResponse";
import Detail from "~/app/t/weather/components/Detail";
import WeatherIcon from "~/app/t/weather/components/WeatherIcon";
import { convertFn, unitLabels, useWeatherStore } from "~/app/t/weather/data";
import { Accordion, AccordionContent, AccordionHeader, AccordionItem, AccordionTrigger } from "~/components/Accordion";
import { CardHeader } from "~/components/Card";
import Heading from "~/components/Typography/Heading";

export default function ForecastWeather({ forecasts }: { forecasts: Forecast[] }) {
  const { unit } = useWeatherStore((state) => ({
    unit: state.unit,
  }));

  return (
    <div>
      <CardHeader>
        <Heading as={"h2"}>{forecasts.length}-day forecast</Heading>
      </CardHeader>
      <Accordion type={"multiple"}>
        {forecasts.map((weather) => (
          <AccordionItem key={weather.dt} value={`time-${weather.dt}`}>
            <AccordionHeader>
              <AccordionTrigger className={"flex w-full items-center justify-between"}>
                <span>
                  {new Intl.DateTimeFormat(undefined, {
                    month: "long",
                    day: "numeric",
                  }).format(weather.dt * 1000)}
                </span>
                <span className={"inline-flex items-center"}>
                  <WeatherIcon
                    alt={weather.weather[0].description}
                    className={"mr-2"}
                    icon={weather.weather[0].icon}
                    size={32}
                  />
                  {weather.weather[0].main}
                </span>
                <span>{`${convertFn[unit](weather.temp.day)} ${unitLabels[unit]}`}</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className={"relative"}>
                  <span
                    className={
                      "pointer-events-none absolute right-0 top-0 block select-none font-mono font-bold uppercase opacity-10 text-8xl"
                    }
                  >
                    {new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(weather.dt * 1000)}
                  </span>
                  <div className={"flex flex-col items-center space-y-4 md:space-y-8 "}>
                    <div className={"flex flex-1 items-end space-x-8"}>
                      <div className={"flex flex-col items-center text-center"}>
                        <p className={"text-lg"}>{weather.weather[0].description}</p>
                        <WeatherIcon alt={weather.weather[0].description} icon={weather.weather[0].icon} size={64} />
                      </div>
                      <div>
                        <div className={"font-bold text-2xl"}>{`${convertFn[unit](weather.temp.day)} ${
                          unitLabels[unit]
                        }`}</div>
                        <div>{`Feels like ${convertFn[unit](weather.feels_like.day)} ${unitLabels[unit]}`}</div>
                      </div>
                    </div>

                    <div className={"flex flex-wrap items-center gap-x-12 gap-y-2 [&>*]:flex-1"}>
                      <Detail label={"High"} value={`${convertFn[unit](weather.temp.max)} ${unitLabels[unit]}`} />
                      <Detail label={"Low"} value={`${convertFn[unit](weather.temp.min)} ${unitLabels[unit]}`} />
                      <Detail label={"Precipitation"} value={`${(weather.pop * 100).toFixed(0)}%`} />
                      <Detail
                        label={"Wind"}
                        value={
                          <div className={"flex items-center"}>
                            <IconArrowRight size={"1em"} style={{ rotate: `${weather.deg}deg` }} aria-hidden />
                            {`${weather.speed} m/s`}
                          </div>
                        }
                      />
                      <Detail label={"Humidity"} value={`${weather.humidity}%`} />
                      <Detail label={"Pressure"} value={`${weather.pressure} hPa`} />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionHeader>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
