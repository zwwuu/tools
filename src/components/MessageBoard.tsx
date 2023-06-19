"use client";

import Giscus, { GiscusProps, Repo } from "@giscus/react";

import { Card, CardBody } from "~/components/Card";
import Heading from "~/components/Typography/Heading";
import { useConfig } from "~/providers/ConfigProvider";

type MessageBoardProps = Pick<GiscusProps, "mapping" | "term" | "strict">;
export default function MessageBoard({ mapping, term, strict }: MessageBoardProps) {
  const { theme } = useConfig();

  return (
    <Card id={"message-board"}>
      <CardBody size={"lg"}>
        <Heading as={"h2"} className={"mb-2"}>
          Message Board
        </Heading>
        <div>
          <Giscus
            emitMetadata={"0"}
            inputPosition={"top"}
            lang={"en"}
            loading={"lazy"}
            mapping={mapping}
            reactionsEnabled={"1"}
            repo={`${process.env.NEXT_PUBLIC_APP_GISCUS_REPO as Repo}`}
            repoId={`${process.env.NEXT_PUBLIC_APP_GISCUS_REPO_ID}`}
            strict={strict}
            term={term}
            theme={theme}
          />
        </div>
      </CardBody>
    </Card>
  );
}
