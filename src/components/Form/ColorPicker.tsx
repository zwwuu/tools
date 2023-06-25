import { ComponentPropsWithRef, forwardRef } from "react";
import clsx from "clsx";

type ColorPickerProps = {
  className?: string;
} & ComponentPropsWithRef<"input">;

const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(({ className, ...props }, ref) => (
  <input className={clsx("cursor-pointer border-sm", className)} type={"color"} {...props} ref={ref} />
));
ColorPicker.displayName = "ColorPicker";

export default ColorPicker;
