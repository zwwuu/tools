"use client";

import { useEffect, useState } from "react";
import cronParser from "cron-parser";
import cronstrue from "cronstrue";

import Main from "~/app/t/components/Main";
import { CRON_FIELDS } from "~/app/t/crontab-editor/data";
import { Card, CardBody } from "~/components/Card";
import Input from "~/components/Form/Input";
import { Table, TableBody, TableCell } from "~/components/Table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/Tabs";
import Heading from "~/components/Typography/Heading";

export default function CrontabEditorPage() {
  const [expression, setExpression] = useState("* * * * *");
  const [nextDates, setNextDates] = useState<string[]>([]);
  const [readableExpression, setReadableExpression] = useState("");

  useEffect(() => {
    try {
      const interval = cronParser.parseExpression(expression);
      setReadableExpression(cronstrue.toString(expression));
      setNextDates(() => {
        const dates: string[] = [];
        for (let i = 0; i < 5; i++) {
          dates.push(interval.next().toString());
        }
        return dates;
      });
    } catch (e) {
      setReadableExpression("");
      setNextDates([]);
    }
  }, [expression]);

  return (
    <Main>
      <Card>
        <CardBody>
          <Input
            className={"mb-4 block w-full"}
            id={"expression"}
            type={"text"}
            value={expression}
            onChange={(event) => {
              setExpression(event.target.value);
            }}
          />
          <Tabs defaultValue={CRON_FIELDS[0].name}>
            <TabsList>
              {CRON_FIELDS.map((field) => (
                <TabsTrigger key={field.name} value={field.name}>
                  {field.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {CRON_FIELDS.map((field) => (
              <TabsContent key={field.name} value={field.name}>
                <Table>
                  <TableBody>
                    {field.allowed.map((allow) => (
                      <tr className={"w-full"} key={allow.name}>
                        <TableCell>{allow.name}</TableCell>
                        <TableCell className={"break-words"}>{allow.value}</TableCell>
                      </tr>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </CardBody>
      </Card>

      {readableExpression && nextDates.length > 0 && (
        <Card>
          <CardBody className={"space-y-4"}>
            <div>
              <Heading as={"h2"}>Readable expression</Heading>
              <p>{readableExpression}</p>
            </div>
            <div>
              <Heading as={"h2"}>Next scheduled dates</Heading>
              <ol>
                {nextDates.map((date) => (
                  <li key={date}>{date}</li>
                ))}
              </ol>
            </div>
          </CardBody>
        </Card>
      )}
    </Main>
  );
}
