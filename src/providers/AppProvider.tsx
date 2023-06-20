"use client";

import { ReactNode } from "react";

import Loader from "~/components/Loader";
import PersistentGate from "~/components/PersistentGate";
import { ConfigProvider } from "~/providers/ConfigProvider";
import { UserProvider } from "~/providers/UserProvider";
import { useConfigStore } from "~/stores/configStore";
import { useUserStore } from "~/stores/userStore";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <PersistentGate
      loader={
        <div className={"flex h-screen items-center justify-center"}>
          <Loader size={"lg"} variant={"spinner"} />
        </div>
      }
      stores={[useConfigStore, useUserStore]}
    >
      {process.env.NODE_ENV === "development" ? (
        <ConfigProvider>{children}</ConfigProvider>
      ) : (
        <ConfigProvider>
          <UserProvider>{children}</UserProvider>
        </ConfigProvider>
      )}
    </PersistentGate>
  );
}
