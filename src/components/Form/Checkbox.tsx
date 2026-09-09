import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

type CheckboxProps = {
  className?: string;
} & ComponentPropsWithRef<"input">;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <input
      className={clsx("border-black border-sm text-primary", className)}
      type={"checkbox"}
      {...props}
      ref={ref}
    />
  ),
);
Checkbox.displayName = "Checkbox";

export default Checkbox;
