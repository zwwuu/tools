import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Anchor from "~/components/Anchor";
import { Badge } from "~/components/Badge";
import { Card, CardBody } from "~/components/Card";
import { Hero, HeroTitle } from "~/components/Hero";
import { Timeline, TimelineContent, TimelineItem } from "~/components/Timeline";
import Code from "~/components/Typography/Code";
import Heading from "~/components/Typography/Heading";
import { getAllChangelogs } from "~/lib/api";
import seo from "~/lib/seo";

export const metadata: Metadata = {
  title: "Changelog",
  description: "A timeline of changes made to the site.",
  alternates: { canonical: "/changelog" },
  openGraph: {
    ...seo.openGraph,
    title: "Changelog",
    description: "A timeline of changes made to the site.",
    url: "/changelog",
  },
};

export default function ChangelogPage() {
  const changelogs = getAllChangelogs();

  return (
    <>
      <Hero>
        <HeroTitle>Changelog</HeroTitle>
        <p>A timeline of changes made to the site.</p>
      </Hero>
      <div className={"container"}>
        {changelogs.length === 0 ? (
          <Card>
            <CardBody>
              <p>There are no changes to the site yet.</p>
            </CardBody>
          </Card>
        ) : (
          <Timeline>
            {changelogs.map((changelog, index) => (
              <TimelineItem key={changelog.version}>
                <TimelineContent>
                  <div className={"mb-2"}>
                    <Heading as={"h2"} className={"flex items-center"}>
                      {changelog.version}
                      {index === 0 && <Badge className={"ml-2"}>Current</Badge>}
                    </Heading>
                    <time className={"text-sm"} dateTime={changelog.date}>
                      {changelog.date}
                    </time>
                  </div>
                  <ReactMarkdown
                    className={"text-base"}
                    components={{
                      h1({ node, children, ...props }) {
                        return (
                          <Heading as={"h1"} className={"mb-2"} {...props}>
                            {children}
                          </Heading>
                        );
                      },
                      h2({ node, children, ...props }) {
                        return (
                          <Heading as={"h2"} className={"mb-2"} {...props}>
                            {children}
                          </Heading>
                        );
                      },
                      h3({ node, children, ...props }) {
                        return (
                          <Heading as={"h3"} className={"mb-2"} {...props}>
                            {children}
                          </Heading>
                        );
                      },
                      h4({ node, children, ...props }) {
                        return (
                          <Heading as={"h4"} className={"mb-2"} {...props}>
                            {children}
                          </Heading>
                        );
                      },
                      h5({ node, children, ...props }) {
                        return (
                          <Heading as={"h5"} className={"mb-2"} {...props}>
                            {children}
                          </Heading>
                        );
                      },
                      h6({ node, children, ...props }) {
                        return (
                          <Heading as={"h6"} className={"mb-2"} {...props}>
                            {children}
                          </Heading>
                        );
                      },
                      a({ node, href, children, ...props }) {
                        return (
                          <Anchor
                            href={href ?? "#"}
                            {...props}
                            isExternal={href?.startsWith("http")}
                            prefetch={!href?.startsWith("http")}
                          >
                            {children}
                          </Anchor>
                        );
                      },
                      code({ node, children, ...props }) {
                        return <Code {...props}>{children}</Code>;
                      },
                      ul({ ordered, node, children, ...props }) {
                        return (
                          <ul className={"list-inside list-disc pl-4"} {...props}>
                            {children}
                          </ul>
                        );
                      },
                      ol({ ordered, node, children, ...props }) {
                        return (
                          <ol className={"list-inside list-decimal pl-4"} {...props}>
                            {children}
                          </ol>
                        );
                      },
                    }}
                    remarkPlugins={[remarkGfm]}
                  >
                    {changelog.content}
                  </ReactMarkdown>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}
      </div>
    </>
  );
}
