"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Main from "~/app/(base)/t/components/Main";
import { ENGINES, EngineValues } from "~/app/(base)/t/lmstfy/data";
import Anchor from "~/components/Anchor";
import Button from "~/components/Button";
import { Card, CardBody } from "~/components/Card";
import Checkbox from "~/components/Form/Checkbox";
import Input from "~/components/Form/Input";
import Select from "~/components/Form/Select";
import Textarea from "~/components/Form/Textarea";
import Heading from "~/components/Typography/Heading";

const generateSchema = z.object({
  query: z.string(),
  message: z.string(),
  redirect: z.boolean(),
  engine: z.enum(EngineValues),
});

type FormInput = z.infer<typeof generateSchema>;

export default function LmstfyPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(generateSchema),
    defaultValues: {
      query: "",
      message: "",
      redirect: true,
      engine: "google",
    },
  });
  const [result, setResult] = useState<string | null>(null);

  return (
    <Main>
      <Card>
        <CardBody>
          <form
            className={"space-y-4"}
            onSubmit={handleSubmit((data) => {
              const params = {
                q: data.query,
                m: data.message.length > 0 ? data.message : undefined,
                redirect: data.redirect,
                engine: data.engine,
              };
              const searchParams = new URLSearchParams();
              const url = new URL("r/lmstfy", process.env.NEXT_PUBLIC_APP_URL);

              const base64 = Buffer.from(JSON.stringify(params), "utf-8").toString("base64");
              searchParams.append("q", base64);

              url.search = searchParams.toString();
              setResult(url.toString());
            })}
          >
            <div>
              <label htmlFor={"query"}>Query</label>
              <Input
                aria-invalid={errors.query ? "true" : "false"}
                className={"block w-full"}
                id={"query"}
                type={"text"}
                required
                {...register("query")}
              />
              {errors.query && (
                <span className={"text-sm text-red-500"} role={"alert"}>
                  {errors.query.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor={"engine"}>Search engine</label>
              <Select
                aria-invalid={errors.engine ? "true" : "false"}
                className={"block w-full"}
                data={ENGINES}
                id={"engine"}
                required
                {...register("engine")}
              />
              {errors.engine && (
                <span className={"text-sm text-red-500"} role={"alert"}>
                  {errors.engine.message}
                </span>
              )}
            </div>

            <div>
              <label className={"flex items-center"}>
                <Checkbox
                  aria-invalid={errors.redirect ? "true" : "false"}
                  className={"mr-2"}
                  {...register("redirect")}
                />
                Auto Redirect
              </label>
              {errors.redirect && (
                <span className={"text-sm text-red-500"} role={"alert"}>
                  {errors.redirect.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor={"message"}>Message</label>
              <Textarea
                aria-invalid={errors.message ? "true" : "false"}
                className={"block w-full"}
                id={"message"}
                {...register("message")}
              />
              {errors.message && (
                <span className={"text-sm text-red-500"} role={"alert"}>
                  {errors.message.message}
                </span>
              )}
            </div>
            <Button type={"submit"}>Generate</Button>
          </form>
        </CardBody>
      </Card>

      {result && (
        <Card>
          <CardBody>
            <Heading as={"h2"} className={"mb-2"}>
              Result
            </Heading>
            <output className={"block space-y-4"}>
              <Textarea className={"block w-full resize-none break-all"} value={result} readOnly withCopy />
              <Anchor href={result} variant={"button"}>
                Visit
              </Anchor>
            </output>
          </CardBody>
        </Card>
      )}
    </Main>
  );
}
