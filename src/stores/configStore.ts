import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type Theme = "light" | "dark";

export type ConfigState = {
  theme?: Theme;
  sound: boolean;
  setTheme: (theme: Theme) => void;
  toggleSound: () => void;
};

export const useConfigStore = create<ConfigState>()(
  persist(
    immer(
      devtools(
        (set) => ({
          theme: undefined,
          sound: false,
          setTheme: (theme: Theme) => set({ theme }, false, { type: "setTheme", theme }),
          toggleSound: () =>
            set(
              (state) => {
                state.sound = !state.sound;
              },
              false,
              "toggleSound",
            ),
        }),
        { name: "config" },
      ),
    ),
    {
      name: "config",
      version: 0,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
