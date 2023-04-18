"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import tinycolor from "tinycolor2";

import { chineseColors } from "~/app/t/chinese-colors/data";
import ColorCopyButton from "~/app/t/components/ColorCopyButton";
import Main from "~/app/t/components/Main";
import { Card, CardBody } from "~/components/Card";
import Input from "~/components/Form/Input";
import { RadioGroup, RadioGroupItem } from "~/components/RadioGroup";
import Heading from "~/components/Typography/Heading";

export default function ChineseColorsPage() {
  const [query, setQuery] = useState("");
  const [filteredColors, setFilteredColors] = useState(chineseColors);
  const [selectedColor, setSelectedColor] = useState<(typeof chineseColors)[number] | null>(null);
  const [character, setCharacter] = useState<"tc" | "sc">("tc");

  useEffect(() => {
    if (window.location.hash.slice(1)) {
      const found = chineseColors.find(
        (color) => `${color.pinyin}-${color.hex.replace("#", "")}` === window.location.hash.slice(1),
      );
      if (found) {
        setSelectedColor(found);
        const elem = document.querySelector(`[data-id="${found.pinyin}-${found.hex.replace("#", "")}"]`);
        if (elem) {
          elem.scrollIntoView({ block: "center" });
        }
      }
    }
  }, []);

  return (
    <Main>
      <Card>
        <CardBody>
          <form>
            <label htmlFor={"query"}>Search</label>
            <Input
              className={"block w-full"}
              id={"query"}
              type={"search"}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                const filtered = chineseColors.filter((color) => {
                  return (
                    color.sc.includes(event.target.value) ||
                    color.tc.includes(event.target.value) ||
                    color.pinyin.toLowerCase().includes(event.target.value.toLowerCase())
                  );
                });
                setFilteredColors(filtered);
              }}
            />
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardBody className={"relative space-y-4"}>
          <div className={"sticky top-16 z-50 flex flex-col items-end"}>
            <RadioGroup
              className={"flex divide-x-sm border-sm shadow-sm text-sm"}
              defaultValue={"tc"}
              onValueChange={(value: "tc" | "sc") => {
                setCharacter(value);
              }}
            >
              <RadioGroupItem className={"px-4 py-2"} value={"tc"}>
                繁
              </RadioGroupItem>
              <RadioGroupItem className={"px-4 py-2"} value={"sc"}>
                简
              </RadioGroupItem>
            </RadioGroup>
          </div>
          {filteredColors.length > 0 ? (
            <div className={"grid grid-cols-12 gap-2"}>
              {filteredColors.map((color) => {
                return (
                  <Card
                    className={clsx(
                      "relative col-span-6 transition hover:z-1 hover:scale-105 md:col-span-3",
                      selectedColor === color && "scale-105",
                    )}
                    data-id={`${color.pinyin}-${color.hex.replace("#", "")}`}
                    elevation={null}
                    key={color.sc}
                    style={{
                      backgroundColor: color.hex,
                      boxShadow: selectedColor === color && `0 0 50px -12px ${selectedColor.hex}`,
                      zIndex: selectedColor === color && 1,
                    }}
                    onClick={() => {
                      setSelectedColor(color);
                      history.replaceState("", document.title, `#${color.pinyin}-${color.hex.replace("#", "")}`);
                    }}
                  >
                    <CardBody>
                      <div className={clsx("break-words", tinycolor(color.hex).isDark() ? "text-white" : "text-black")}>
                        <p className={"text-xs"}>{color.pinyin}</p>
                        <Heading as={"h3"} className={"mb-2"}>
                          {character === "sc" ? color.sc : color.tc}
                        </Heading>
                      </div>
                      <ColorCopyButton color={color.hex} value={color.hex}>
                        <span>{color.hex}</span>
                      </ColorCopyButton>
                      <ColorCopyButton color={color.hex} value={`rgb(${color.rgb.join(",")})`}>
                        <span className={"lg:hidden"}>rgb</span>
                        <span className={"hidden lg:inline-block"}>{`rgb(${color.rgb.join(",")})`}</span>
                      </ColorCopyButton>
                      <ColorCopyButton color={color.hex} value={`cmyk(${color.cmyk.join(",")})`}>
                        <span className={"lg:hidden"}>cmyk</span>
                        <span className={"hidden lg:inline-block"}>{`cmyk(${color.cmyk.join(",")})`}</span>
                      </ColorCopyButton>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          ) : (
            <p>No results found.</p>
          )}
        </CardBody>
      </Card>
    </Main>
  );
}
