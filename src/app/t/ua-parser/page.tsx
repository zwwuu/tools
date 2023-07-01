"use client";

import { FormEvent, useState } from "react";
import UAParser from "ua-parser-js";

import Main from "~/app/t/components/Main";
import Button from "~/components/Button";
import { Card, CardBody } from "~/components/Card";
import Textarea from "~/components/Form/Textarea";
import { Table, TableBody, TableCell } from "~/components/Table";

export default function UAParserPage() {
  const [ua, setUA] = useState("");
  const [result, setResult] = useState<UAParser.IResult | null>(null);
  const parser = new UAParser();

  const parse = (event: FormEvent) => {
    event.preventDefault();
    parser.setUA(ua);
    setResult(parser.getResult());
  };

  const reset = () => {
    setUA(window.navigator.userAgent);
  };

  return (
    <Main>
      <Card>
        <CardBody>
          <form className={"space-y-4"} onSubmit={parse}>
            <div>
              <label htmlFor={"ua"}>User Agent</label>
              <Textarea
                className={"block w-full font-mono"}
                id={"ua"}
                value={ua}
                onChange={(event) => {
                  setUA(event.target.value);
                }}
              />
            </div>
            <div>
              <div className={"-m-4 flex flex-wrap"}>
                <Button className={"m-4"} type={"submit"}>
                  Parse
                </Button>
                <Button className={"m-4"} type={"button"} variant={"warning"} onClick={reset}>
                  Current UA
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
      {result && result.ua.length > 0 && (
        <Card>
          <CardBody>
            <output className={"block"} form={"ua-form"} htmlFor={"ua"}>
              <Textarea
                aria-label={"User Agent"}
                className={"peer mb-4 block w-full resize-none font-mono"}
                value={result.ua}
                readOnly
                withCopy
              />
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
