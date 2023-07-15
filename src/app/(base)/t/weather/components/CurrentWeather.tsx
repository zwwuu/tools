import { IconArrowDown } from "@tabler/icons-react";

import Detail from "~/app/(base)/t/weather/components/Detail";
import WeatherIcon from "~/app/(base)/t/weather/components/WeatherIcon";
import { convertFn, unitLabels, useWeatherStore } from "~/app/(base)/t/weather/data";
import { CurrentWeatherResponse } from "~/app/api/weather/types/openweathermap/CurrentWeatherResponse";
import Heading from "~/components/Typography/Heading";

export default function CurrentWeather({ weather }: { weather: CurrentWeatherResponse }) {
  const { unit } = useWeatherStore((state) => ({
    unit: state.unit,
  }));

  return (
    <div className={"flex flex-col items-center space-y-4"}>
      <div>
        <p className={"text-xs opacity-80"}>
          {"Updated at "}
          <time dateTime={new Date(weather.dt * 1000).toISOString()}>
            {new Date(weather.dt * 1000).toLocaleString()}
          </time>
        </p>
        <Heading
          as={"h2"}
          className={"whitespace-break-spaces break-all"}
        >{`${weather.name}, ${weather.sys.country}`}</Heading>
      </div>
      <div className={"flex items-end space-x-8"}>
        <div className={"flex flex-1 flex-col items-center text-center"}>
          <p className={"text-lg"}>{weather.weather[0].description}</p>
          <WeatherIcon alt={weather.weather[0].description} icon={weather.weather[0].icon} size={64} />
        </div>
        <div>
          <div className={"text-2xl font-bold"}>{`${convertFn[unit](weather.main.temp)} ${unitLabels[unit]}`}</div>
          <div>{`Feels like ${convertFn[unit](weather.main.feels_like)} ${unitLabels[unit]}`}</div>
        </div>
      </div>
      <div className={"flex flex-wrap items-center gap-x-12 gap-y-2 [&>*]:flex-1"}>
        <Detail label={"High"} value={`${convertFn[unit](weather.main.temp_max)} ${unitLabels[unit]}`} />
        <Detail label={"Low"} value={`${convertFn[unit](weather.main.temp_min)} ${unitLabels[unit]}`} />
        <Detail
          label={"Wind"}
          value={
            <div className={"flex items-center"}>
              <IconArrowDown size={"1em"} style={{ rotate: `${weather.wind.deg}deg` }} aria-hidden />
              {`${weather.wind.speed} m/s`}
            </div>
          }
        />
        <Detail label={"Humidity"} value={`${weather.main.humidity}%`} />
        <Detail label={"Pressure"} value={`${weather.main.pressure} hPa`} />
      </div>
    </div>
  );
}
