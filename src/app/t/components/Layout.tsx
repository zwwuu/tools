"use client";

import { ComponentPropsWithoutRef, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconMessage } from "@tabler/icons-react";

import LikeButton from "~/app/t/components/LikeButton";
import ShareButton from "~/app/t/components/ShareButton";
import Hero, { HeroTitle } from "~/components/Hero";
import MessageBoard from "~/components/MessageBoard";
import { Tool } from "~/types/Tool";

type LayoutProps = {
  children: ReactNode;
  tool: Tool;
} & ComponentPropsWithoutRef<"div">;

export default function Layout({ children, tool, ...props }: LayoutProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero>
        <HeroTitle className={"before:opacity-60 before:content-['/t/']"}>{tool.title}</HeroTitle>
        <p className={"mb-4"}>{tool.description}</p>
        <div className={"flex items-center space-x-8"}>
          <ShareButton text={`${process.env.NEXT_PUBLIC_APP_URL}/t/${tool.slug}`} />
          <a
            className={"transition hover:text-green-500 focus:text-green-500"}
            href={"#message-board"}
            title={"Report bug or suggest feature"}
          >
            <IconMessage aria-hidden />
          </a>
          <LikeButton slug={tool.slug} />
        </div>
      </Hero>
      <div className={"mx-auto max-w-screen-lg space-y-8 px-5"} {...props}>
        {children}
        <MessageBoard mapping={"specific"} strict={"1"} term={tool.title} />
      </div>
    </>
  );
}
