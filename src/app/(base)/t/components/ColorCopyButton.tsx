import { ReactNode, useState } from "react";
import clsx from "clsx";
import tinycolor from "tinycolor2";

import CopyButton from "~/components/CopyButton";

type ColorCopyButtonProps = {
  children?: ReactNode;
  value: string;
  color: string;
};
export default function ColorCopyButton({ value, children, color }: ColorCopyButtonProps) {
  const [hovered, setHovered] = useState(false);
  const isDark = tinycolor(color).isDark();
  const hoverColor = isDark ? tinycolor(color).lighten(5).toString() : tinycolor(color).darken(5).toString();

  return (
    <CopyButton
      border={null}
      className={clsx("font-xs w-full flex-wrap p-1 transition", isDark ? "text-white" : "text-black")}
      elevation={null}
      style={{ backgroundColor: hovered ? hoverColor : undefined }}
      value={value}
      variant={null}
      onBlur={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </CopyButton>
  );
}
