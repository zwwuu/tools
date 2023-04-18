"use client";

import { createContext, ReactNode, useContext, useEffect } from "react";

import useSound from "~/hooks/useSound";
import { Theme, useConfigStore } from "~/stores/configStore";

interface ConfigContextProps {
  theme?: Theme;
  sound: boolean;
  onThemeToggle: () => void;
  onSoundToggle: () => void;
}

export const StoreContext = createContext<ConfigContextProps>({
  theme: undefined,
  sound: false,
  onThemeToggle: () => undefined,
  onSoundToggle: () => undefined,
});

export const ConfigProvider = ({ children }: { children?: ReactNode }) => {
  const { theme, sound, setTheme, toggleSound } = useConfigStore((state) => ({
    theme: state.theme,
    setTheme: state.setTheme,
    sound: state.sound,
    toggleSound: state.toggleSound,
  }));
  const { play } = useSound("/sounds/ui/toggle_on.wav");

  useEffect(() => {
    if (!theme) {
      const prefTheme = window && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setTheme(prefTheme);
    }
  }, [setTheme, theme]);

  useEffect(() => {
    if (theme && theme === "dark") {
      document.documentElement.classList.add("dark");
      return;
    }

    document.documentElement.classList.remove("dark");
  }, [theme]);

  const onThemeToggle = () => {
    if (sound) {
      void play();
    }
    setTheme(theme === "light" ? "dark" : "light");
  };

  const onSoundToggle = () => {
    if (!sound) {
      void play();
    }
    toggleSound();
  };

  return (
    <StoreContext.Provider value={{ theme, sound, onThemeToggle, onSoundToggle }}>{children}</StoreContext.Provider>
  );
};

export const useConfig = () => useContext(StoreContext);
