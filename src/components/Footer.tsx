import Anchor from "~/components/Anchor";
import { Card, CardBody } from "~/components/Card";
import { getAllTools } from "~/lib/api";

export default function Footer() {
  const numTools = getAllTools().length;

  return (
    <footer className={"container py-4 text-sm"}>
      <div className={"flex flex-col items-end"}>
        <Card>
          <CardBody className={"space-y-2"} size={"sm"}>
            <div className={"font-mono text-xs"}>
              <p>Current version: {process.env.NEXT_PUBLIC_APP_VERSION}</p>
              <p>Number of tools: {numTools}</p>
            </div>
            <p>
              All tools are free to use and{" "}
              <Anchor href={`${process.env.NEXT_PUBLIC_APP_REPO}`} prefetch={false} isExternal>
                open source
              </Anchor>
              .
            </p>
            <p>
              {`© ${new Date().getFullYear()} `}
              <Anchor href={`${process.env.NEXT_PUBLIC_APP_AUTHOR_URL}`} isExternal>
                {process.env.NEXT_PUBLIC_APP_AUTHOR}
              </Anchor>
            </p>
          </CardBody>
        </Card>
      </div>
    </footer>
  );
}
