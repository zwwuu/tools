import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

type PreProps = ComponentPropsWithRef<"pre">;
const Pre = forwardRef<HTMLPreElement, PreProps>(
  ({ className, ...props }, ref) => (
    <pre
      className={clsx("overflow-auto bg-base-300 p-2 font-mono", className)}
      ref={ref}
      {...props}
    />
  ),
);
Pre.displayName = "Pre";

export default Pre;
