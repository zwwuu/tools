"use client";

import { ReactNode } from "react";
import { FormspreeProvider } from "@formspree/react";

export default function FormWrapper({ children }: { children: ReactNode }) {
  return <FormspreeProvider project={process.env.NEXT_PUBLIC_FORMSPREE_PROJECT}>{children}</FormspreeProvider>;
}
