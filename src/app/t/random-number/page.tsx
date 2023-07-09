"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Main from "~/app/t/components/Main";
import Button from "~/components/Button";
import { Card, CardBody } from "~/components/Card";
import Checkbox from "~/components/Form/Checkbox";
import Input from "~/components/Form/Input";
import Textarea from "~/components/Form/Textarea";
import Loader from "~/components/Loader";

const generateSchema = z
  .object({
    min: z.number().int(),
    max: z.number().int(),
    quantity: z.number().int().min(1),
    duplicate: z.boolean(),
    separator: z.string(),
  })
  .refine(
    (schema) => {
      if (schema.duplicate) return true;

      const range = schema.max - schema.min + 1;
      return schema.quantity <= range;
    },
    (schema) => {
      const range = schema.max - schema.min + 1;
      return {
        message: `Quantity must be less than or equal to ${range} when duplicates is disabled`,
        path: ["quantity"],
      };
    },
  )
  .refine((schema) => schema.min <= schema.max, { message: "Min must be less than or equal to max", path: ["min"] });
type FormInput = z.infer<typeof generateSchema>;

export default function RandomNumberPage() {
  const [result, setResult] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const worker = useRef<Worker | null>(null);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(generateSchema),
    defaultValues: {
      duplicate: true,
      separator: " ",
      quantity: 1,
    },
  });

  const generateRandomNumber = useCallback((min: number, max: number, quantity: number, duplicate: boolean) => {
    setIsGenerating(true);
    worker.current?.postMessage({ min, max, quantity, duplicate });
  }, []);

  useEffect(() => {
    const handleWorkerMessage = (message: MessageEvent<number[]>) => {
      setResult(message.data);
      setIsGenerating(false);
    };

    worker.current = new Worker(new URL("./worker", import.meta.url));
    worker.current.addEventListener("message", handleWorkerMessage);

    return () => {
      worker.current?.terminate();
      worker.current?.removeEventListener("message", handleWorkerMessage);
    };
  }, []);

  return (
    <Main>
      <Card>
        <CardBody>
          <form
            className={"space-y-4"}
            onSubmit={handleSubmit((data) => {
              generateRandomNumber(data.min, data.max, data.quantity, data.duplicate);
            })}
          >
            <div>
              <label htmlFor={"min"}>Min number (inclusive)</label>
              <Input
                aria-invalid={errors.min ? "true" : "false"}
                className={"block w-full"}
                id={"min"}
                type={"number"}
                {...register("min", { valueAsNumber: true })}
              />
              {errors.min && (
                <span className={"text-red-500 text-sm"} role={"alert"}>
                  {errors.min.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor={"max"}>Max number (inclusive)</label>
              <Input
                aria-invalid={errors.max ? "true" : "false"}
                className={"block w-full"}
                id={"max"}
                type={"number"}
                required
                {...register("max", { valueAsNumber: true })}
              />
              {errors.max && (
                <span className={"text-red-500 text-sm"} role={"alert"}>
                  {errors.max.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor={"quantity"}>Quantity</label>
              <Input
                aria-invalid={errors.quantity ? "true" : "false"}
                className={"block w-full"}
                id={"quantity"}
                min={1}
                type={"number"}
                required
                {...register("quantity", { valueAsNumber: true })}
              />
              {errors.quantity && (
                <span className={"text-red-500 text-sm"} role={"alert"}>
                  {errors.quantity.message}
                </span>
              )}
            </div>

            <div>
              <label className={"flex items-center"}>
                <Checkbox className={"mr-2"} id={"duplicate"} {...register("duplicate")} />
                Allow duplicates
              </label>
            </div>

            <div>
              <label htmlFor={"separator"}>Separator</label>
              <Input className={"block w-full"} type={"text"} {...register("separator")} id={"separator"} />
            </div>
            <Button disabled={isGenerating} type={"submit"}>
              Generate {isGenerating && <Loader variant={"dots"} />}
            </Button>
          </form>
        </CardBody>
      </Card>

      {result.length > 0 && (
        <Card>
          <CardBody>
            <output className={"block"}>
              <Textarea
                className={"block w-full resize-none break-all text-lg"}
                loading={isGenerating}
                value={result.join(getValues("separator"))}
                readOnly
                withCopy
              />
            </output>
          </CardBody>
        </Card>
      )}
    </Main>
  );
}
