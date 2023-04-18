import { useEffect, useState } from "react";
import { UseBoundStore } from "zustand";

export default function useHydration(stores: UseBoundStore<any>[]) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (stores.every((store) => store.persist.hasHydrated())) {
      setHydrated(true);
    } else {
      const timeout = window.setTimeout(() => {
        setHydrated(true);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [hydrated, stores]);

  return hydrated;
}
