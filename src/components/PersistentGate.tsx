import { ReactNode } from "react";
import { UseBoundStore } from "zustand";

import useHydration from "~/hooks/useHydration";

type PersistentGateProps = {
  children: ReactNode;
  stores: UseBoundStore<any>[];
  loader?: ReactNode;
};
export default function PersistentGate({ children, stores, loader }: PersistentGateProps) {
  const hydrated = useHydration(stores);

  if (!hydrated) {
    return <>{loader}</>;
  }

  return <>{children}</>;
}
