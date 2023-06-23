import { Tool } from "~/types/Tool";

export const tools: Record<string, Tool> = {
  "px-converter": {
    title: "Pixels to REM Converter",
    slug: "px-converter",
    description: "Convert pixels to REMs and vice versa.",
    keywords: ["px converter", "rem converter", "px", "pixel", "rem", "root em", "converter", "px to rem", "rem to px"],
    isPublic: true,
  },
  "password-generator": {
    title: "Password Generator",
    slug: "password-generator",
    description: "Generate a random password.",
    keywords: [
      "password generator",
      "password",
      "generator",
      "random",
      "secure",
      "cryptographic",
      "password generator",
    ],
    isPublic: true,
  },
  "pomodoro-timer": {
    title: "Pomodoro Timer",
    slug: "pomodoro-timer",
    description: "Work in intervals with breaks in between using the Pomodoro Technique.",
    keywords: ["pomodoro timer", "pomodoro", "timer", "work", "break", "intervals", "clock"],
    isPublic: true,
  },
  weather: {
    title: "Weather",
    slug: "weather",
    description: "Get the current weather and forecast.",
    keywords: ["weather", "forecast", "temperature", "humidity", "wind", "pressure", "openweathermap"],
    isPublic: true,
  },
  "ua-parser": {
    title: "User Agent Parser",
    slug: "ua-parser",
    description: "Parse user agent string.",
    keywords: ["user agent parser", "ua parser", "user agent", "ua", "parser"],
    isPublic: true,
  },
  "japanese-colors": {
    title: "Traditional Japanese colors",
    slug: "japanese-colors",
    description: "The traditional colors of Nippon (Japan).",
    keywords: [
      "japanese colors",
      "japan",
      "japanese",
      "color",
      "traditional",
      "nippon",
      "palette",
      "RGB",
      "HEX",
      "CMYK",
    ],
    isPublic: true,
  },
  "chinese-colors": {
    title: "Traditional Chinese colors",
    slug: "chinese-colors",
    description: "The traditional colors of China.",
    keywords: ["chinese colors", "chinese", "color", "traditional", "china", "palette", "RGB", "HEX", "CMYK"],
    isPublic: true,
  },
  "css-colors": {
    title: "CSS Colors",
    slug: "css-colors",
    description: "List of CSS named colors.",
    keywords: ["css colors", "named colors", "html colors", "color", "palette", "RGB", "HEX"],
    isPublic: true,
  },
  "random-number": {
    title: "Random Number Generator",
    slug: "random-number",
    description: "Generate a random number between two numbers.",
    keywords: ["random number", "random", "number", "generator", "random number generator", "randomizer"],
    isPublic: true,
  },
  "crontab-editor": {
    title: "Crontab Editor",
    slug: "crontab-editor",
    description: "A quick and simple crontab editor.",
    keywords: [
      "crontab editor",
      "editor",
      "crontab",
      "cron",
      "cron job",
      "cron table",
      "crontab parser",
      "parser",
      "schedule",
    ],
    isPublic: true,
  },
  "exif-viewer": {
    title: "EXIF Viewer",
    slug: "exif-viewer",
    description:
      "View EXIF metadata recorded in the photo. Date, time, camera settings, geolocation coordinates, and many more.",
    keywords: ["exif viewer", "exif", "viewer", "exif reader"],
    isPublic: true,
  },
  "base-convertor": {
    title: "Base Convertor",
    slug: "base-convertor",
    description: "Convert between binary, octal, decimal, hexadecimal, and many more.",
    keywords: [
      "base convertor",
      "base",
      "convertor",
      "binary",
      "octal",
      "decimal",
      "hexadecimal",
      "base 2",
      "base 8",
      "base 10",
      "base 16",
    ],
    isPublic: true,
  },
};
