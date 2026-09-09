import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

type CodeProps = ComponentPropsWithRef<"code">;
const Code = forwardRef<HTMLElement, CodeProps>(
  ({ className, ...props }, ref) => (
    <code
      className={clsx("bg-base-300 p-2 font-mono", className)}
      ref={ref}
      {...props}
    />
  ),
);
Code.displayName = "Code";

export default Code;
