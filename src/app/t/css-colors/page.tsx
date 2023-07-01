"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import tinycolor from "tinycolor2";

import ColorCopyButton from "~/app/t/components/ColorCopyButton";
import Main from "~/app/t/components/Main";
import { cssColors } from "~/app/t/css-colors/data";
import { Card, CardBody } from "~/components/Card";
import Input from "~/components/Form/Input";
import Heading from "~/components/Typography/Heading";

export default function CSSColorsPage() {
  const [query, setQuery] = useState("");
  const [filteredColors, setFilteredColors] = useState(cssColors);
  const [selectedColor, setSelectedColor] = useState<(typeof cssColors)[number] | null>(null);

  useEffect(() => {
    if (window.location.hash.slice(1)) {
      const found = cssColors.find(
        (color) => `${color.name}-${color.hex.replace("#", "")}` === window.location.hash.slice(1),
      );
      if (found) {
        setSelectedColor(found);
        const elem = document.querySelector(`[data-id="${found.name}-${found.hex.replace("#", "")}"]`);
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
                const filtered = cssColors.filter((color) => color.name.includes(event.target.value.toLowerCase()));
                setFilteredColors(filtered);
              }}
            />
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardBody className={"space-y-4"}>
          {filteredColors.length > 0 ? (
            <div className={"grid grid-cols-12 gap-2"}>
              {filteredColors.map((color) => {
                return (
                  <Card
                    className={clsx(
                      "col-span-6 transition hover:z-1 hover:scale-105 md:col-span-3",
                      selectedColor === color && "scale-105",
                    )}
                    data-id={`${color.name}-${color.hex.replace("#", "")}`}
                    elevation={null}
                    key={color.name}
                    style={{
                      backgroundColor: color.hex,
                      boxShadow: selectedColor === color && `0 0 50px -12px ${selectedColor.hex}`,
                      zIndex: selectedColor === color && 1,
                    }}
                    onClick={() => {
                      setSelectedColor(color);
                      history.replaceState("", document.title, `#${color.name}-${color.hex.replace("#", "")}`);
                    }}
                  >
                    <CardBody>
                      <div className={clsx("break-words", tinycolor(color.hex).isDark() ? "text-white" : "text-black")}>
                        <Heading as={"h3"} className={"mb-2"}>
                          {color.name}
                        </Heading>
                      </div>
                      <ColorCopyButton color={color.hex} value={color.hex}>
                        <span>{color.hex}</span>
                      </ColorCopyButton>
                      <ColorCopyButton color={color.hex} value={`rgb(${color.rgb.join(",")})`}>
                        <span className={"lg:hidden"}>rgb</span>
                        <span className={"mr-1 hidden lg:inline-block"}>{`rgb(${color.rgb.join(",")})`}</span>
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
