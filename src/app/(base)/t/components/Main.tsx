"use client";

import { ComponentPropsWithoutRef, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { UseBoundStore } from "zustand";

import Loader from "~/components/Loader";
import PersistentGate from "~/components/PersistentGate";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 300000, // 5 minutes
    },
  },
});

type MainProps = {
  children: ReactNode;
  stores?: UseBoundStore<any>[];
} & ComponentPropsWithoutRef<"div">;

export default function Main({ children, stores }: MainProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {stores ? (
        <PersistentGate
          loader={
            <div className={"flex h-screen items-center justify-center"}>
              <Loader size={"lg"} variant={"spinner"} />
            </div>
          }
          stores={stores}
        >
          {children}
        </PersistentGate>
      ) : (
        children
      )}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
