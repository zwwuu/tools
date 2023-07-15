import { ReactNode } from "react";

import Layout from "~/app/(base)/t/components/Layout";
import { tools } from "~/data/tools/base";
import seo from "~/lib/seo";

const tool = tools["duration-calculator"];
export const metadata = {
  title: tool.title,
  description: tool.description,
  keywords: tool.keywords,
  alternates: { canonical: `/t/${tool.slug}` },
  openGraph: {
    ...seo.openGraph,
    title: tool.title,
    description: tool.description,
    url: `/t/${tool.slug}`,
  },
};

export default function Root({ children }: { children: ReactNode }) {
  return <Layout tool={tool}>{children}</Layout>;
}
