import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

type InputGroupProps = ComponentPropsWithRef<"div">;
const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={clsx(
          "relative flex shadow-sm [&>*:first-child]:border-l [&>*:focus]:z-2 [&>*:last-child]:border-r [&>*]:relative [&>*]:border-x-[1px] [&>*]:border-y",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
InputGroup.displayName = "InputGroup";

export { InputGroup };
