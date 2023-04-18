import { useEffect, useRef, useState } from "react";

export default function useTitle() {
  const titleRef = useRef<string>("");
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    titleRef.current = document.title;
  }, []);

  useEffect(() => {
    const originalTitle = titleRef.current;
    if (title) {
      document.title = title;
    } else {
      document.title = originalTitle;
    }
    return () => {
      document.title = originalTitle;
    };
  }, [title]);

  return [title, setTitle] as const;
}
