import { ReactNode } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { IconPointer } from "@tabler/icons-react";
import clsx from "clsx";

import { ENGINES } from "~/app/r/lmstfy/data";
import Anchor from "~/components/Anchor";
import Heading from "~/components/Typography/Heading";
import { tools } from "~/data/tools/base";
import seo from "~/lib/seo";

const tool = tools["lmstfy"];
export const metadata = {
  title: tool.title,
  description: tool.description,
  keywords: tool.keywords,
  alternates: { canonical: `/r/${tool.slug}` },
  openGraph: {
    ...seo.openGraph,
    title: tool.title,
    description: tool.description,
    url: `/r/${tool.slug}`,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
