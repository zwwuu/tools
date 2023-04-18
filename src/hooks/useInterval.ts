import { useEffect, useRef } from "react";

export default function useInterval(onTick: Function, paused: boolean, interval: number = 1000) {
  const savedCallback = useRef<Function>(() => {});

  useEffect(() => {
    savedCallback.current = onTick;
  }, [onTick]);

  useEffect(() => {
    if (paused) {
      const intervalId = setInterval(() => savedCallback.current(), interval);
      return () => {
        clearInterval(intervalId);
      };
    }

    return undefined;
  }, [paused, interval]);
}
