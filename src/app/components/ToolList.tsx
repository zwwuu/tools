"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { IconSearch, IconThumbUp } from "@tabler/icons-react";
import clsx from "clsx";
import { collection, getDocs } from "firebase/firestore";

import Anchor from "~/components/Anchor";
import { Card, CardBody, CardHeader } from "~/components/Card";
import Input from "~/components/Form/Input";
import Heading from "~/components/Typography/Heading";
import { db } from "~/lib/firebase";
import { useUser } from "~/providers/UserProvider";
import { Tool } from "~/types/Tool";

export default function ToolList({ tools }: { tools: Tool[] }) {
  const [toolLikes, setToolLikes] = useState<{ [k: string]: number }>({});
  const { isLiked, likedTools } = useUser();
  const [search, setSearch] = useState<string>("");
  const [filteredTools, setFilteredTools] = useState<Tool[]>(tools);

  useEffect(() => {
    (async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tools"));
        const toolLikes: { [k: string]: number } = {};
        querySnapshot.forEach((doc) => {
          const toolData = doc.data();
          toolLikes[doc.id] = toolData.totalLikes;
        });
        setToolLikes(toolLikes);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    const filteredTools = tools.filter((tool) => {
      return (
        tool.title.toLowerCase().includes(event.target.value.toLowerCase()) ||
        tool.keywords.some((keyword) => keyword.toLowerCase().includes(event.target.value.toLowerCase()))
      );
    });
    setFilteredTools(filteredTools);
  };

  return (
    <div>
      <Card className={"relative mb-8"}>
        <CardBody size={"lg"}>
          <Heading as={"h2"} className={"mb-2"}>
            Browse
          </Heading>
          <form>
            <Input
              aria-label={"Search"}
              className={"block w-full text-base"}
              leftElement={<IconSearch className={"text-base-content"} size={"2rem"} aria-hidden />}
              placeholder={"Search"}
              type={"search"}
              value={search}
              onChange={handleSearch}
            />
          </form>
          <div className={"absolute inset-x-0 top-full"}>
            <div className={clsx("ml-8 w-2 bg-black transition-size", search.length ? "h-9" : "h-0")} />
          </div>
        </CardBody>
      </Card>
      {filteredTools.length === 0 ? (
        <Card>
          <CardBody size={"lg"}>
            <Heading as={"h2"} className={"mb-2"}>
              No tools found
            </Heading>
            <p>Try searching for something else.</p>
          </CardBody>
        </Card>
      ) : (
        <ul className={"-m-4 flex flex-wrap"}>
          {filteredTools.map((tool) => {
            return (
              <li className={"m-4 flex-1 basis-64"} key={tool.slug}>
                <Anchor
                  className={"group block h-full transition hover:-translate-y-1 focus:-translate-y-1"}
                  href={`/t/${tool.slug}`}
                  variant={null}
                  onClick={() => {
                    window.gtag("event", "select_content", {
                      content_type: "tool",
                      item_id: tool.slug,
                    });
                  }}
                >
                  <Card className={"h-full"}>
                    <CardHeader className={"border-b"}>
                      <Heading as={"h3"}>{tool.title}</Heading>
                    </CardHeader>
                    <CardBody>
                      <p className={"line-clamp-3"}>{tool.description}</p>
                      <div
                        className={
                          "flex items-center justify-end transition text-xs group-hover:text-red-500 group-focus:text-red-500"
                        }
                      >
                        <IconThumbUp className={clsx("mr-1", isLiked(tool.slug) && "text-red-500")} />
                        <span className={"font-bold"}>
                          {Intl.NumberFormat("en", { notation: "compact" }).format(
                            toolLikes[tool.slug] || likedTools[tool.slug] || 0,
                          )}
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                </Anchor>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
