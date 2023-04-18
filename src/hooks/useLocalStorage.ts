import { SetStateAction, useCallback, useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const localStorageValue = localStorage.getItem(key);
      if (localStorageValue) {
        return JSON.parse(localStorageValue);
      } else {
        initialValue && localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    setState(() => {
      try {
        const localStorageValue = localStorage.getItem(key);
        if (localStorageValue !== null) {
          return JSON.parse(localStorageValue);
        } else {
          initialValue && localStorage.setItem(key, JSON.stringify(initialValue));
          return initialValue;
        }
      } catch {
        return initialValue;
      }
    });
  }, [initialValue, key]);

  const set = useCallback(
    (valOrFunc: SetStateAction<T>) => {
      try {
        const newState = valOrFunc instanceof Function ? valOrFunc(state) : valOrFunc;
        let value = JSON.stringify(newState);
        localStorage.setItem(key, value);
        setState(JSON.parse(value));
      } catch (error) {
        console.error(error);
      }
    },
    [key, state],
  );

  return [state, set] as const;
}
