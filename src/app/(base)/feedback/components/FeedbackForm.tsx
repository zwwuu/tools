"use client";

import Script from "next/script";
import { useForm, ValidationError } from "@formspree/react";

import Anchor from "~/components/Anchor";
import Button from "~/components/Button";
import { Card, CardBody } from "~/components/Card";
import Input from "~/components/Form/Input";
import Textarea from "~/components/Form/Textarea";
import Loader from "~/components/Loader";
import Heading from "~/components/Typography/Heading";

export default function FeedbackForm() {
  const [state, handleSubmit, reset] = useForm(`${process.env.NEXT_PUBLIC_PRIVATE_MESSAGE_FORM}`, {
    data: {
      "g-recaptcha-response": async () => {
        let recaptchaToken = "";
        await window.grecaptcha
          .execute(`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`, { action: "message" })
          .then((token) => {
            recaptchaToken = token;
          });

        return recaptchaToken;
      },
    },
  });

  return (
    <>
      <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} />
      <Card>
        <CardBody size={"lg"}>
          <Heading as={"h2"} className={"mb-2"}>
            Private message
          </Heading>
          <form className={"relative space-y-4"} onSubmit={handleSubmit}>
            {state.submitting && (
              <div className={"absolute inset-0 z-50 flex animate-fadeIn items-center justify-center"} role={"alert"}>
                <div className={"absolute inset-0 animate-fadeIn bg-base-200 opacity-80"} />
                <Card className={"z-50 animate-fadeIn"} role={"alert"}>
                  <CardBody>
                    <p className={"text-center"}>
                      Submitting
                      <Loader variant={"dots"} />
                    </p>
                  </CardBody>
                </Card>
              </div>
            )}

            {state.succeeded && (
              <div className={"absolute inset-0 z-50 flex animate-fadeIn items-center justify-center"} role={"alert"}>
                <div className={"absolute inset-0 animate-fadeIn bg-base-200 opacity-80"} />
                <Card className={"z-50 animate-fadeIn"} role={"alert"}>
                  <CardBody className={"animate-fadeIn space-y-2"}>
                    <p>Thanks for your message! I&apos;ll get back to you as soon as possible.</p>
                    <div className={"flex justify-end"}>
                      <Button type={"reset"} onClick={reset}>
                        Okay
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}

            <div>
              <label htmlFor={"name"}>Name</label>
              <Input
                autoComplete={"name"}
                className={"block w-full"}
                id={"name"}
                minLength={2}
                name={"name"}
                type={"text"}
                required
              />
              <ValidationError
                className={"text-sm text-red-500"}
                errors={state.errors}
                field={"name"}
                prefix={"Name"}
              />
            </div>
            <div>
              <label htmlFor={"email"}>Email</label>
              <Input
                autoComplete={"email"}
                className={"block w-full"}
                id={"email"}
                name={"email"}
                type={"email"}
                required
              />
              <ValidationError
                className={"text-sm text-red-500"}
                errors={state.errors}
                field={"email"}
                prefix={"Email"}
              />
            </div>
            <div>
              <label htmlFor={"message"}>Message</label>
              <Textarea className={"block w-full"} id={"message"} minLength={2} name={"message"} required />
              <ValidationError
                className={"text-sm text-red-500"}
                errors={state.errors}
                field={"message"}
                prefix={"Message"}
              />
            </div>
            <ValidationError className={"text-sm text-red-500"} errors={state.errors} />
            <p className={"text-xs"}>
              This site is protected by reCAPTCHA and the Google{" "}
              <Anchor href={"https://policies.google.com/privacy"} prefetch={false} isExternal>
                Privacy Policy
              </Anchor>
              {" and "}
              <Anchor href={"https://policies.google.com/terms"} prefetch={false} isExternal>
                Terms of Service
              </Anchor>{" "}
              apply.
            </p>

            <Button className={"w-full"} disabled={state.submitting} type={"submit"}>
              Send
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
}
