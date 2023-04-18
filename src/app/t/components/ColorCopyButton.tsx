import { ReactNode, useState } from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import clsx from "clsx";
import tinycolor from "tinycolor2";

import Button from "~/components/Button";
import useClipboard from "~/hooks/useClipboard";

type ColorCopyButtonProps = {
  children?: ReactNode;
  value: string;
  color: string;
};
export default function ColorCopyButton({ value, children, color }: ColorCopyButtonProps) {
  const { copied, copy } = useClipboard();
  const [hovered, setHovered] = useState(false);
  const isDark = tinycolor(color).isDark();
  const hoverColor = isDark ? tinycolor(color).lighten(5).toString() : tinycolor(color).darken(5).toString();

  return (
    <Button
      border={null}
      className={clsx("font-xs w-full flex-wrap p-1 transition", isDark ? "text-white" : "text-black")}
      elevation={null}
      style={{ backgroundColor: hovered ? hoverColor : undefined }}
      title={copied ? "Copied" : "Copy"}
      variant={null}
      onBlur={() => setHovered(false)}
      onClick={() => copy(value)}
      onFocus={() => setHovered(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      {copied ? (
        <IconCheck className={"ml-1"} size={"1em"} aria-hidden />
      ) : (
        <IconCopy className={"ml-1"} size={"1em"} aria-hidden />
      )}
    </Button>
  );
}
