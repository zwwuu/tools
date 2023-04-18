import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const MIN_VALUE = 0;
export const SCALES = [
  [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24],
  [28, 32, 36, 40, 44, 48, 56, 64, 72, 80, 96, 112],
  [128, 144, 160, 320, 480, 640, 800, 960, 1120, 1280, 1440, 1600],
];

type State = {
  base: string;
  left: string;
  right: string;
  isPxToRem: boolean;
};

type Actions = {
  toggleDirection: () => void;
  setBase: (base: string) => void;
  setLeft: (left: string) => void;
  setRight: (right: string) => void;
};

export const usePxConvertorStore = create<State & Actions>()(
  immer(
    devtools(
      (set) => ({
        base: "16",
        left: "16",
        right: "1",
        isPxToRem: true,
        toggleDirection: () =>
          set(
            (state) => {
              state.isPxToRem = !state.isPxToRem;
            },
            false,
            "toggleDirection",
          ),
        setBase: (base) => set({ base }, false, { type: "setBase", base }),
        setLeft: (left) => set({ left }, false, { type: "setLeft", left }),
        setRight: (right) => set({ right }, false, { type: "setRight", right }),
      }),
      { name: "px-convertor" },
    ),
  ),
);
