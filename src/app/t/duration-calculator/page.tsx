"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import prettyMilliseconds from "pretty-ms";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Main from "~/app/t/components/Main";
import Button from "~/components/Button";
import { Card, CardBody } from "~/components/Card";
import Input from "~/components/Form/Input";
import { InputGroup } from "~/components/Form/InputGroup";
import Heading from "~/components/Typography/Heading";

const durationSchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  startTime: z.string().regex(/^\d{2}:\d{2}:?\d{2}$/, "Invalid time format"),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  endTime: z.string().regex(/^\d{2}:\d{2}:?\d{2}$/, "Invalid time format"),
});

type FormInput = z.infer<typeof durationSchema>;

type Result = {
  duration: string;
  seconds: number;
  minutes: number;
  hours: number;
};
export default function DurationCalculatorPage() {
  const [result, setResult] = useState<Result | null>(null);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(durationSchema),
    defaultValues: {
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
    },
  });

  const calculate = ({ startDate, startTime, endDate, endTime }: FormInput) => {
    const start = dayjs(`${startDate}T${startTime}`);
    const end = dayjs(`${endDate}T${endTime}`);
    const diff = Math.abs(end.diff(start, "millisecond"));
    return {
      duration: prettyMilliseconds(diff, { verbose: true }),
      seconds: diff / 1000,
      minutes: diff / 60000,
      hours: diff / 3600000,
    };
  };

  return (
    <Main>
      <Card>
        <CardBody>
          <form
            className={"space-y-4"}
            id={"duration-form"}
            onSubmit={handleSubmit((data) => {
              setResult(calculate(data));
            })}
          >
            <fieldset>
              <legend>Start time</legend>
              <InputGroup>
                <Input
                  aria-invalid={errors.startDate ? "true" : "false"}
                  aria-label={"Start date"}
                  className={"block w-full"}
                  type={"date"}
                  required
                  {...register("startDate", { required: true })}
                />
                <Input
                  aria-invalid={errors.startTime ? "true" : "false"}
                  aria-label={"Start time"}
                  className={"block w-full"}
                  step={"1"}
                  type={"time"}
                  required
                  {...register("startTime", { required: true })}
                />
                <Button
                  border={null}
                  elevation={null}
                  type={"button"}
                  onClick={() => {
                    const now = new Date(Date.now());
                    const date = now.toISOString().split("T")[0];
                    const time = now.toTimeString().split(" ")[0];
                    setValue("startDate", date);
                    setValue("startTime", time);
                  }}
                >
                  Now
                </Button>
              </InputGroup>
              {errors.startDate && (
                <div className={"text-red-500 text-sm"} role={"alert"}>
                  {errors.startDate.message}
                </div>
              )}
              {errors.startTime && (
                <div className={"text-red-500 text-sm"} role={"alert"}>
                  {errors.startTime.message}
                </div>
              )}
            </fieldset>
            <fieldset>
              <legend>End time</legend>
              <InputGroup>
                <Input
                  aria-invalid={errors.endDate ? "true" : "false"}
                  aria-label={"End date"}
                  className={"block w-full"}
                  type={"date"}
                  required
                  {...register("endDate", { required: true })}
                />
                <Input
                  aria-invalid={errors.endTime ? "true" : "false"}
                  aria-label={"End time"}
                  className={"block w-full"}
                  step={"1"}
                  type={"time"}
                  required
                  {...register("endTime", { required: true })}
                />

                <Button
                  border={null}
                  elevation={null}
                  type={"button"}
                  onClick={() => {
                    const now = new Date(Date.now());
                    const date = now.toISOString().split("T")[0];
                    const time = now.toTimeString().split(" ")[0];
                    setValue("endDate", date);
                    setValue("endTime", time);
                  }}
                >
                  Now
                </Button>
              </InputGroup>
              {errors.endDate && (
                <div className={"text-red-500 text-sm"} role={"alert"}>
                  {errors.endDate.message}
                </div>
              )}
              {errors.endTime && (
                <div className={"text-red-500 text-sm"} role={"alert"}>
                  {errors.endTime.message}
                </div>
              )}
            </fieldset>
            <Button type={"submit"}>Calculate</Button>
          </form>
        </CardBody>
      </Card>

      {result && (
        <Card>
          <CardBody>
            <output className={"block space-y-2"} form={"duration-form"}>
              <Heading as={"h2"}>Result</Heading>
              <p>
                The duration between{" "}
                <span className={"font-bold"}>
                  {getValues("startDate")} {getValues("startTime")}
                </span>
                {" and "}
                <span className={"font-bold"}>
                  {getValues("endDate")} {getValues("endTime")}
                </span>{" "}
                is
              </p>
              <div>
                <label htmlFor={"duration"}>Duration</label>
                <Input className={"block w-full"} value={result.duration} readOnly />
              </div>
              <div>
                <label htmlFor={"hours"}>In hours</label>
                <Input className={"block w-full"} id={"hours"} value={result.hours} readOnly />
              </div>
              <div>
                <label htmlFor={"minutes"}>In minutes</label>
                <Input className={"block w-full"} id={"minutes"} value={result.minutes} readOnly />
              </div>
              <div>
                <label htmlFor={"seconds"}>In seconds</label>
                <Input className={"block w-full"} id={"seconds"} value={result.seconds} readOnly />
              </div>
            </output>
          </CardBody>
        </Card>
      )}
    </Main>
  );
}
