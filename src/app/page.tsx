import ToolList from "~/app/components/ToolList";
import Anchor from "~/components/Anchor";
import Hero, { HeroTitle } from "~/components/Hero";
import { getAllTools } from "~/lib/api";

export default function HomePage() {
  const tools = getAllTools();

  return (
    <>
      <Hero>
        <HeroTitle>{process.env.NEXT_PUBLIC_APP_TITLE}</HeroTitle>
        <p>
          {"A collection of tools for everyday use. If you have any suggestions or questions, you can leave a message "}
          <Anchor href={"/feedback"}>here</Anchor>. All tools are open source and can be found on{" "}
          <Anchor href={`${process.env.NEXT_PUBLIC_APP_REPO}`} prefetch={false} isExternal>
            GitHub
          </Anchor>
          .
        </p>
      </Hero>
      <div className={"container"}>
        <ToolList tools={tools} />
      </div>
    </>
  );
}
