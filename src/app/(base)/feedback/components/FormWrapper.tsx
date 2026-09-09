"use client";

import { FormspreeProvider } from "@formspree/react";
import type { ReactNode } from "react";

export default function FormWrapper({ children }: { children: ReactNode }) {
  return (
    <FormspreeProvider project={process.env.NEXT_PUBLIC_FORMSPREE_PROJECT}>
      {children}
    </FormspreeProvider>
  );
}
