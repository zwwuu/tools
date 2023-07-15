import Image from "next/image";
import clsx from "clsx";

type WeatherIconProps = {
  alt: string;
  icon: string;
  className?: string;
  size?: number;
};
export default function WeatherIcon({ icon, alt, size = 32, className }: WeatherIconProps) {
  return (
    <Image
      alt={alt}
      className={clsx("drop-shadow-visible", className)}
      height={size}
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      width={size}
    />
  );
}
