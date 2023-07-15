import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ZXCVBNScore } from "zxcvbn";

export const CHARACTERS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number: "0123456789",
  symbol: "!@#$%^&*()_+-=[]{};':\"\\|,.<>/?`~",
};
export const MAX_LENGTH = 128;
export const MIN_LENGTH = 5;
export const SCORE_STYLES = {
  0: {
    label: "Very Weak",
    color: "text-pink-500",
    bar: "bg-pink-500 w-1/5",
  },
  1: {
    label: "Weak",
    color: "text-red-500",
    bar: "bg-red-500 w-2/5",
  },
  2: {
    label: "Fair",
    color: "text-yellow-500",
    bar: "bg-yellow-500 w-3/5",
  },
  3: {
    label: "Good",
    color: "text-blue-500",
    bar: "bg-blue-500 w-4/5",
  },
  4: {
    label: "Strong",
    color: "text-green-500",
    bar: "bg-green-500 w-full",
  },
};
export const OPTIONS = [
  {
    label: "Include lowercase letters",
    name: "includeLowercase",
  },
  {
    label: "Include uppercase letters",
    name: "includeUppercase",
  },
  {
    label: "Include numbers",
    name: "includeNumber",
  },
  {
    label: "Include symbols",
    name: "includeSymbol",
  },
] as const;

export type Options = (typeof OPTIONS)[number]["name"];

export type Password = {
  value: string;
  crackTimes: string;
  score: ZXCVBNScore;
};

type State = {
  options: {
    [key in Options]: boolean;
  };
  length: number;
};

type Actions = {
  toggleOption: (option: Options) => void;
  setLength: (length: number) => void;
};

export const usePasswordGeneratorStore = create<State & Actions>()(
  persist(
    immer(
      devtools(
        (set) => ({
          options: {
            includeLowercase: true,
            includeUppercase: true,
            includeNumber: true,
            includeSymbol: true,
          },
          length: 16,
          toggleOption: (option) =>
            set(
              (state) => {
                state.options[option] = !state.options[option];
              },
              false,
              { type: "toggleOption", option },
            ),
          setLength: (length) =>
            set({ length }, false, {
              type: "setLength",
              length,
            }),
        }),
        { name: "password-generator" },
      ),
    ),
    {
      name: "password-generator",
      storage: createJSONStorage(() => localStorage),
      version: 0,
    },
  ),
);
