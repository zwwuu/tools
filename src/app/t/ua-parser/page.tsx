"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import UAParser from "ua-parser-js";

import Main from "~/app/t/components/Main";
import Button from "~/components/Button";
import { Card, CardBody } from "~/components/Card";
import Textarea from "~/components/Form/Textarea";
import { Table, TableBody, TableCell } from "~/components/Table";
import useClipboard from "~/hooks/useClipboard";

export default function UAParserPage() {
  const [ua, setUA] = useState("");
  const [result, setResult] = useState<UAParser.IResult | null>(null);
  const parser = useRef<UAParser.UAParserInstance | null>(null);
  const outputAreaRef = useRef<HTMLTextAreaElement>(null);
  const { copied, copy } = useClipboard();

  useEffect(() => {
    setUA(window.navigator.userAgent);
    parser.current = new UAParser();
    parser.current.setUA(window.navigator.userAgent);
  }, []);

  useEffect(() => {
    if (parser.current) {
      parser.current.setUA(ua);
      setResult(parser.current.getResult());
    }
  }, [ua]);

  const parse = (event: FormEvent) => {
    event.preventDefault();
    if (parser.current) {
      parser.current.setUA(ua);
      setResult(parser.current.getResult());
    }
  };

  const reset = () => {
    setUA(window.navigator.userAgent);
  };

  return (
    <Main>
      <Card>
        <CardBody>
          <form className={"relative"} onSubmit={parse}>
            <label htmlFor={"ua"}>User Agent</label>
            <Textarea
              className={"block w-full font-mono"}
              value={ua}
              onChange={(event) => {
                setUA(event.target.value);
              }}
            />
            <div className={"flex flex-wrap justify-center"}>
              <Button className={"m-2"} type={"button"} onClick={reset}>
                Reset
              </Button>
              <Button className={"m-2"} type={"submit"}>
                Parse
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
      {result && result.ua.length > 0 && (
        <Card>
          <CardBody>
            <output className={"relative block"} form={"ua-form"} htmlFor={"ua"}>
              <Textarea
                aria-label={"User Agent"}
                className={"peer mb-4 block w-full resize-none font-mono"}
                ref={outputAreaRef}
                value={result.ua}
                readOnly
              />
              <Button
                className={
                  "absolute right-2 top-2 opacity-10 hover:opacity-100 focus:opacity-100 peer-hover:opacity-100 peer-focus:opacity-100"
                }
                elevation={null}
                size={"sm"}
                title={copied ? "Copied" : "Copy"}
                variant={"icon"}
                onClick={() => {
                  copy(result.ua);
                  if (outputAreaRef.current) {
                    outputAreaRef.current.select();
                  }
                }}
              >
                {copied ? <IconCheck size={"1em"} aria-hidden /> : <IconCopy size={"1em"} aria-hidden />}
              </Button>
              <Table>
                <TableBody>
                  {Object.entries({
                    Browser: result.browser,
                    Device: result.device,
                    Engine: result.engine,
                    OS: result.os,
                    CPU: result.cpu,
                  }).map((entry) => {
                    return (
                      <tr key={entry[0]}>
                        <TableCell className={"font-bold"}>{entry[0]}</TableCell>
                        <TableCell>{Object.values(entry[1]).join(" ")}</TableCell>
                      </tr>
                    );
                  })}
                </TableBody>
              </Table>
            </output>
          </CardBody>
        </Card>
      )}
    </Main>
  );
}
