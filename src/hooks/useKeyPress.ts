import { useEffect, useState } from "react";

type useKeyPressProps = {
  onKeyDown?: { fn: (event: KeyboardEvent) => void; options?: boolean | AddEventListenerOptions };
  onKeyUp?: { fn: (event: KeyboardEvent) => void; options?: boolean | AddEventListenerOptions };
};

export default function useKeyPress(targetKeys: string[], { onKeyDown, onKeyUp }: useKeyPressProps) {
  const [keyPressed, setKeyPressed] = useState<Record<string, boolean>>(
    targetKeys.reduce((acc: Record<string, boolean>, key) => {
      acc[key] = false;
      return acc;
    }, {}),
  );

  useEffect(() => {
    const downHandler = (event: KeyboardEvent) => {
      if (targetKeys.includes(event.key)) {
        setKeyPressed((prevKeyState) => ({ ...prevKeyState, [event.key]: true }));
        onKeyDown?.fn(event);
      }
    };

    const upHandler = (event: KeyboardEvent) => {
      if (targetKeys.includes(event.key)) {
        setKeyPressed((prevKeyState) => ({ ...prevKeyState, [event.key]: false }));
        onKeyUp?.fn(event);
      }
    };

    window.addEventListener("keydown", downHandler, onKeyUp?.options);
    window.addEventListener("keyup", upHandler, onKeyUp?.options);

    return () => {
      window.removeEventListener("keydown", downHandler, onKeyDown?.options);
      window.removeEventListener("keyup", upHandler, onKeyUp?.options);
    };
  }, [onKeyDown, onKeyUp, targetKeys]);

  return keyPressed;
}
