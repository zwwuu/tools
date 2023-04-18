import { useCallback, useEffect, useState } from "react";

export default function useClipboard() {
  const [copied, setCopied] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);

  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimer(window.setTimeout(() => setCopied(false), 1500));
    });
  }, []);

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  return { copied, copy };
}
