"use client";

import { useMemo, useState } from "react";

import { BASES } from "~/app/t/base-convertor/data";
import Main from "~/app/t/components/Main";
import { Card, CardBody } from "~/components/Card";
import Input from "~/components/Form/Input";
import { InputGroup } from "~/components/Form/InputGroup";
import Select from "~/components/Form/Select";

export default function BaseConvertorPage() {
  const [input, setInput] = useState("");
  const [selectedBase, setSelectedBase] = useState<number>(10);
  const value = useMemo(() => {
    return parseInt(input, selectedBase);
  }, [input, selectedBase]);

  return (
    <Main>
      <Card>
        <CardBody>
          <form>
            <label htmlFor={"value"}>Value</label>
            <InputGroup>
              <Input
                className={"block w-full"}
                id={"value"}
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                }}
              />
              <label className={"sr-only"} htmlFor={"base"}>
                Base
              </label>
              <Select
                data={BASES}
                id={"base"}
                value={selectedBase}
                onChange={(event) => {
                  const parsedBase = parseInt(event.target.value, 10);
                  if (!isNaN(parsedBase)) {
                    setSelectedBase(parsedBase);
                  }
                }}
              />
            </InputGroup>
          </form>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <output className={"block space-y-4"} form={"value-form"} htmlFor={"value"}>
            {BASES.filter((base) => base.value !== selectedBase).map((base) => (
              <div key={base.value}>
                <label>
                  {base.label}
                  <Input className={"block w-full"} value={value.toString(base.value)} readOnly />
                </label>
              </div>
            ))}
          </output>
        </CardBody>
      </Card>
    </Main>
  );
}
