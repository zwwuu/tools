import clsx from "clsx";
import type { ReactNode } from "react";

import Heading from "~/components/Typography/Heading";

export function Hero({ children }: { children: ReactNode }) {
  return (
    <section className={"border-b bg-black px-6 py-8 text-white"} id={"hero"}>
      <div className={"mx-auto max-w-screen-lg"}>
        <div className={"flex flex-col items-center"}>{children}</div>
      </div>
    </section>
  );
}

export function HeroTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Heading as={"h1"} className={clsx("mb-2", className)}>
      {children}
    </Heading>
  );
}
