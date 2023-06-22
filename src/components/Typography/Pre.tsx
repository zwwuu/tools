import { ComponentPropsWithRef, forwardRef } from "react";
import clsx from "clsx";

type PreProps = ComponentPropsWithRef<"pre">;
const Pre = forwardRef<HTMLPreElement, PreProps>(({ className, ...props }, ref) => (
  <pre className={clsx("overflow-auto bg-base-300 p-2 font-mono", className)} ref={ref} {...props} />
));
Pre.displayName = "Pre";

export default Pre;
