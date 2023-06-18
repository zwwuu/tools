import { ComponentPropsWithRef, forwardRef } from "react";
import clsx from "clsx";

type CheckboxProps = {
  className?: string;
} & ComponentPropsWithRef<"input">;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => (
  <input className={clsx("border-sm border-black text-primary", className)} type={"checkbox"} {...props} ref={ref} />
));
Checkbox.displayName = "Checkbox";

export default Checkbox;
