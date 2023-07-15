"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { IconQuestionMark } from "@tabler/icons-react";
import clsx from "clsx";

import Main from "~/app/(base)/t/components/Main";
import {
  MAX_LENGTH,
  MIN_LENGTH,
  Options,
  OPTIONS,
  Password,
  SCORE_STYLES,
  usePasswordGeneratorStore,
} from "~/app/(base)/t/password-generator/data";
import Anchor from "~/components/Anchor";
import Button from "~/components/Button";
import { Card, CardBody } from "~/components/Card";
import Checkbox from "~/components/Form/Checkbox";
import Input from "~/components/Form/Input";
import Textarea from "~/components/Form/Textarea";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/Popover";
import { Slider } from "~/components/Slider";
import Code from "~/components/Typography/Code";

export default function PasswordGeneratorPage() {
  const worker = useRef<Worker | null>(null);
  const { options, length, toggleOption, setLength } = usePasswordGeneratorStore((state) => ({
    options: state.options,
    length: state.length,
    toggleOption: state.toggleOption,
    setLength: state.setLength,
  }));
  const [password, setPassword] = useState<Password>({
    value: "",
    crackTimes: "",
    score: 0,
  });
  const [uncommittedLength, setUncommittedLength] = useState(length);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleLengthChange = (event: ChangeEvent<HTMLInputElement>) => {
    let length = parseInt(event.target.value, 10);
    if (!isNaN(length)) {
      setLength(length);
      setUncommittedLength(length);
    }
  };

  const generatePassword = useCallback((options: { [key in Options]: boolean }, length: number) => {
    setIsGenerating(true);
    worker.current?.postMessage({ options, length });
  }, []);

  useEffect(() => {
    const handleWorkerMessage = (message: MessageEvent<Password>) => {
      setPassword(message.data);
      setIsGenerating(false);
    };

    worker.current = new Worker(new URL("./worker", import.meta.url));
    worker.current.addEventListener("message", handleWorkerMessage);

    return () => {
      worker.current?.terminate();
      worker.current?.removeEventListener("message", handleWorkerMessage);
    };
  }, []);

  useEffect(() => {
    generatePassword(options, length);
  }, [options, length, generatePassword]);

  return (
    <Main>
      <Card>
        <CardBody className={"flex flex-col space-y-8 md:flex-row md:space-x-8 md:space-y-0"}>
          <div className={"flex-1 space-y-4"}>
            <Textarea
              aria-label={"Generated password"}
              className={"block w-full resize-none break-all font-mono text-lg"}
              id={"password"}
              loading={isGenerating}
              value={password.value}
              readOnly
              withCopy
            />

            <div>
              <div className={clsx("mb-2 h-1 transition-size", SCORE_STYLES[password.score].bar)} />
              <div>
                <p className={"mr-1 inline"}>
                  <span className={clsx("font-bold transition", SCORE_STYLES[password.score].color)}>
                    {SCORE_STYLES[password.score].label}
                  </span>
                  , it will take ~{password.crackTimes} to crack.
                </p>
                <Popover>
                  <PopoverTrigger aria-label={"How is this calculated?"} size={"sm"} variant={"icon"}>
                    <IconQuestionMark size={"1em"} aria-hidden />
                  </PopoverTrigger>
                  <PopoverContent className={"max-w-sm text-sm"}>
                    <p>
                      Uses{" "}
                      <Anchor href={"https://github.com/dropbox/zxcvbn#readme"} prefetch={false} isExternal>
                        zxcvbn
                      </Anchor>{" "}
                      to calculate the strength of the password with{" "}
                      <Code className={"break-normal"}>offline_slow_hashing_1e4_per_second</Code> scenario.
                    </p>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <div className={"flex-1 space-y-4"}>
            <fieldset>
              <legend>Length</legend>
              <div className={"space-y-4"}>
                <Input
                  className={"block w-full text-center"}
                  max={MAX_LENGTH}
                  min={MIN_LENGTH}
                  step={1}
                  type={"number"}
                  value={uncommittedLength}
                  onChange={handleLengthChange}
                />
                <Slider
                  max={MAX_LENGTH}
                  min={MIN_LENGTH}
                  step={1}
                  value={[uncommittedLength]}
                  onValueChange={([value]) => setUncommittedLength(value)}
                  onValueCommit={([value]) => setLength(value)}
                />
              </div>
            </fieldset>

            <div className={"space-y-4"}>
              {OPTIONS.map((option) => {
                return (
                  <label className={"flex items-center"} key={option.name}>
                    <Checkbox
                      checked={options[option.name]}
                      className={"mr-2"}
                      name={option.name}
                      onChange={() => toggleOption(option.name)}
                    />
                    {option.label}
                  </label>
                );
              })}
            </div>
            <Button className={"w-full"} onClick={async () => await generatePassword(options, length)}>
              Generate
            </Button>
          </div>
        </CardBody>
      </Card>
    </Main>
  );
}
