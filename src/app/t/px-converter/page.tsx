"use client";

import { IconQuestionMark, IconSwitchHorizontal } from "@tabler/icons-react";
import clsx from "clsx";

import Main from "~/app/t/components/Main";
import { MIN_VALUE, SCALES, usePxConvertorStore } from "~/app/t/px-converter/data";
import Button from "~/components/Button";
import { Card, CardBody, CardHeader } from "~/components/Card";
import Input from "~/components/Form/Input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/Popover";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader } from "~/components/Table";
import Heading from "~/components/Typography/Heading";

const calculatePx = (rem: number, base: number) => {
  return rem * base;
};

const calculateRem = (px: number, base: number) => {
  return px / base;
};
export default function PxConvertorPage() {
  const { base, left, right, isPxToRem, setBase, setLeft, setRight, toggleDirection } = usePxConvertorStore(
    (state) => ({
      base: state.base,
      left: state.left,
      right: state.right,
      isPxToRem: state.isPxToRem,
      setBase: state.setBase,
      setLeft: state.setLeft,
      setRight: state.setRight,
      toggleDirection: state.toggleDirection,
    }),
  );

  return (
    <Main>
      <Card>
        <CardBody className={"space-y-8"}>
          <div className={"flex items-center justify-center"}>
            <div>
              <label className={"mr-1"}>
                {"Based on "}
                <Input
                  className={"max-w-[12rem] text-center text-sm"}
                  min={MIN_VALUE}
                  type={"number"}
                  value={base}
                  onChange={(event) => {
                    setBase(event.target.value);
                    const baseAsNum = parseFloat(event.target.value);
                    const leftAsNum = parseFloat(left);
                    if (!isNaN(baseAsNum) && !isNaN(leftAsNum)) {
                      setRight(
                        String(isPxToRem ? calculateRem(leftAsNum, baseAsNum) : calculatePx(leftAsNum, baseAsNum)),
                      );
                    }
                  }}
                />
                {" pixels."}
              </label>
              <Popover>
                <PopoverTrigger aria-label={"What is REM?"} size={"sm"} variant={"icon"}>
                  <IconQuestionMark size={"1em"} />
                </PopoverTrigger>
                <PopoverContent className={"max-w-xs p-2 text-sm"}>
                  <p>Font size of the root element. Most browser defaults to 16px.</p>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className={"flex flex-col items-center sm:flex-row sm:items-end"}>
            <div className={"w-full"}>
              <label className={"block font-bold"} htmlFor={"left"}>
                {isPxToRem ? "Pixels" : "REM"}
              </label>
              <Input
                className={"block w-full text-center"}
                id={"left"}
                min={MIN_VALUE}
                type={"number"}
                value={left}
                onChange={(event) => {
                  setLeft(event.target.value);
                  const leftAsNum = parseFloat(event.target.value);
                  const baseAsNum = parseFloat(base);
                  if (!isNaN(leftAsNum) && !isNaN(baseAsNum)) {
                    setRight(
                      String(isPxToRem ? calculateRem(leftAsNum, baseAsNum) : calculatePx(leftAsNum, baseAsNum)),
                    );
                  }
                }}
              />
            </div>
            <div className={"my-4 sm:mx-4 sm:my-0"}>
              <Button
                size={"lg"}
                title={"Swap"}
                variant={"icon"}
                onClick={() => {
                  const leftAsNum = parseFloat(left);
                  const baseAsNum = parseFloat(base);
                  if (!isNaN(leftAsNum) && !isNaN(baseAsNum)) {
                    setRight(
                      String(isPxToRem ? calculatePx(leftAsNum, baseAsNum) : calculateRem(leftAsNum, baseAsNum)),
                    );
                  }
                  toggleDirection();
                }}
              >
                <IconSwitchHorizontal
                  className={clsx("transition", isPxToRem ? "rotate-90 sm:rotate-0" : "-rotate-90 sm:rotate-180")}
                  aria-hidden
                />
              </Button>
            </div>
            <div className={"w-full"}>
              <label className={"block font-bold"} htmlFor={"right"}>
                {isPxToRem ? "REM" : "Pixels"}
              </label>
              <Input
                className={"block w-full text-center"}
                id={"right"}
                min={MIN_VALUE}
                type={"number"}
                value={right}
                onChange={(event) => {
                  setRight(event.target.value);
                  const rightAsNum = parseFloat(event.target.value);
                  const baseAsNum = parseFloat(base);
                  if (!isNaN(rightAsNum)) {
                    setLeft(
                      String(isPxToRem ? calculatePx(rightAsNum, baseAsNum) : calculateRem(rightAsNum, baseAsNum)),
                    );
                  }
                }}
              />
            </div>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <Heading as={"h2"} className={"text-center"}>
            Pixels ↔︎ REM Conversion Table
          </Heading>
        </CardHeader>
        <CardBody>
          <div className={"-my-2 flex flex-wrap"}>
            {SCALES.map((bucket, rowIndex) => {
              return (
                <div className={"my-2 w-full flex-1 basis-64 overflow-auto"} key={`bucket-${rowIndex}`}>
                  <Table className={"text-center font-mono"}>
                    <TableCaption>
                      from <span className={"underline"}>{bucket[0]}px</span> to{" "}
                      <span className={"underline"}>{bucket[bucket.length - 1]}px</span>
                    </TableCaption>
                    <TableHeader className={"border-b"}>
                      <tr>
                        <TableHead>px</TableHead>
                        <TableHead>rem</TableHead>
                      </tr>
                    </TableHeader>
                    <TableBody>
                      {bucket.map((value) => {
                        return (
                          <tr key={value}>
                            <TableCell>
                              {value}
                              <span className={"opacity-80"}>px</span>
                            </TableCell>
                            <TableCell>
                              {parseFloat(calculateRem(value, parseFloat(base)).toFixed(4))}
                              <span className={"opacity-80"}>rem</span>
                            </TableCell>
                          </tr>
                        );
                      })}
                    </TableBody>
                    <TableFooter>
                      <tr>
                        <TableHead>px</TableHead>
                        <TableHead>rem</TableHead>
                      </tr>
                    </TableFooter>
                  </Table>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </Main>
  );
}
