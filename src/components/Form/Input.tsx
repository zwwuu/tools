import { ComponentPropsWithRef, forwardRef, ReactNode, useLayoutEffect, useRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";

const input = cva("bg-input", {
  variants: {
    border: {
      sm: "border-sm",
      md: "border-md",
      lg: "border-lg",
    },
    left: {
      true: "pr-2",
    },
    right: {
      true: "pl-2",
    },
  },
  compoundVariants: [
    {
      left: undefined,
      right: undefined,
      className: "px-2",
    },
  ],
  defaultVariants: {
    border: "sm",
  },
});

type InputProps = {
  className?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
} & ComponentPropsWithRef<"input"> &
  VariantProps<typeof input>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftElement, rightElement, border, className, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const leftElementRef = useRef<HTMLDivElement>(null);
    const rightElementRef = useRef<HTMLDivElement>(null);
    const _addonClassname = "pointer-events-none absolute inset-y-0 flex items-center justify-center px-2";

    useLayoutEffect(() => {
      if (inputRef.current) {
        if (leftElementRef.current) {
          const leftElementWidth = leftElementRef.current.clientWidth;
          inputRef.current.style.paddingLeft = `${leftElementWidth}px`;
        }

        if (rightElementRef.current) {
          const rightElementWidth = rightElementRef.current.clientWidth;
          inputRef.current.style.paddingRight = `${rightElementWidth}px`;
        }
      }
    }, []);

    if (leftElement || rightElement) {
      return (
        <div className={"relative isolate"}>
          {leftElement && (
            <div className={clsx(_addonClassname, "left-0")} ref={leftElementRef}>
              {leftElement}
            </div>
          )}
          <input
            className={input({
              border,
              left: leftElement !== undefined,
              right: rightElement !== undefined,
              className,
            })}
            ref={(node) => {
              inputRef.current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            {...props}
          />
          {rightElement && (
            <div className={clsx(_addonClassname, "right-0")} ref={rightElementRef}>
              {rightElement}
            </div>
          )}
        </div>
      );
    }

    return <input className={input({ border, className })} {...props} ref={ref} />;
  },
);
Input.displayName = "Input";

export default Input;
