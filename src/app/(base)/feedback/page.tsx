import { Metadata } from "next";

import FeedbackForm from "~/app/(base)/feedback/components/FeedbackForm";
import FormWrapper from "~/app/(base)/feedback/components/FormWrapper";
import { Hero, HeroTitle } from "~/components/Hero";
import MessageBoard from "~/components/MessageBoard";
import seo from "~/lib/seo";

export const metadata: Metadata = {
  title: "Feedback",
  description: "Leave a message or request a new tool. You can also send me a private message.",
  alternates: { canonical: "/feedback" },
  openGraph: {
    ...seo.openGraph,
    title: "Feedback",
    description: "Leave a message or request a new tool. You can also send me a private message.",
    url: "/feedback",
  },
};

export default function FeedbackPage() {
  return (
    <>
      <Hero>
        <HeroTitle>Feedback</HeroTitle>
        <p>Leave a message or request a new tool. You can also send me a private message.</p>
      </Hero>
      <div className={"container"}>
        <div className={"-m-4 flex flex-wrap"}>
          <div className={"w-full p-4 lg:w-7/12"}>
            <MessageBoard mapping={"number"} term={"1"} />
          </div>
          <div className={"w-full p-4 lg:w-5/12"}>
            <FormWrapper>
              <FeedbackForm />
            </FormWrapper>
          </div>
        </div>
      </div>
    </>
  );
}
