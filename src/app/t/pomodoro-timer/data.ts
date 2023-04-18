import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const MIN_MINUTES = 0;
export const INTERVAL_STYLES = {
  work: {
    label: "Work",
    shadow: "before:shadow-primary",
    bar: "bg-primary-500",
    track: "bg-primary-200",
  },
  shortBreak: {
    label: "Short Break",
    shadow: "before:shadow-sky-900",
    bar: "bg-sky-500",
    track: "bg-sky-200",
  },
  longBreak: {
    label: "Long Break",
    shadow: "before:shadow-cyan-900",
    bar: "bg-cyan-500",
    track: "bg-cyan-200",
  },
};

export type Intervals = keyof typeof INTERVAL_STYLES;

type State = {
  round: number;
  durations: {
    work: number;
    shortBreak: number;
    longBreak: number;
  };
  currentInterval: Intervals;
  timeLeft: number;
  isActive: boolean;
  isRunning: boolean;
  isMuted: boolean;
};

type Actions = {
  tick: () => void;
  start: () => void;
  reset: () => void;
  toggle: () => void;
  next: () => void;
  setDuration: (interval: Intervals, duration: number) => void;
  setTimeLeft: (seconds: number) => void;
  setCurrentInterval: (currentInterval: Intervals) => void;
  toggleAlarm: () => void;
};

export const usePomodoroTimerStore = create<State & Actions>()(
  persist(
    immer(
      devtools(
        (set) => ({
          round: 1,
          durations: {
            work: 1500,
            longBreak: 900,
            shortBreak: 300,
          },
          currentInterval: "work",
          timeLeft: 1500,
          isActive: false,
          isRunning: false,
          isMuted: false,
          setTimeLeft: (timeLeft) =>
            set({ timeLeft }, false, {
              type: "setTimeLeft",
              timeLeft,
            }),
          setCurrentInterval: (currentInterval: Intervals) =>
            set({ currentInterval }, false, {
              type: "setCurrentInterval",
              currentInterval,
            }),
          setDuration: (interval, seconds) =>
            set(
              (state) => {
                state.durations[interval] = seconds;
              },
              false,
              { type: "setDuration", interval, seconds },
            ),
          next: () =>
            set(
              (state) => {
                state.round = state.round + 1;
              },
              false,
              "next",
            ),
          tick: () =>
            set(
              (state) => {
                state.timeLeft = state.timeLeft - 1;
              },
              false,
              "tick",
            ),
          start: () =>
            set(
              (state) => {
                state.isRunning = true;
                state.isActive = true;
              },
              false,
              "start",
            ),
          reset: () =>
            set(
              (state) => {
                state.isRunning = false;
                state.isActive = false;
                state.round = 1;
                state.currentInterval = "work";
                state.timeLeft = state.durations.work;
              },
              false,
              "reset",
            ),
          toggle: () =>
            set(
              (state) => {
                state.isRunning = !state.isRunning;
              },
              false,
              "toggleTimer",
            ),
          toggleAlarm: () =>
            set(
              (state) => {
                state.isMuted = !state.isMuted;
              },
              false,
              "toggleAlarm",
            ),
        }),
        { name: "pomodoro-timer" },
      ),
    ),
    {
      name: "pomodoro-timer",
      version: 0,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ durations: state.durations, isMuted: state.isMuted }),
    },
  ),
);
