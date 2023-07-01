import { ComponentPropsWithRef, forwardRef, useCallback, useEffect, useRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";

import CopyButton from "~/components/CopyButton";
import Loader from "~/components/Loader";

const textarea = cva("bg-input p-2", {
  variants: {
    border: {
      sm: "border-sm",
      md: "border-md",
      lg: "border-lg",
    },
  },
  defaultVariants: {
    border: "sm",
  },
});

type TextareaProps = {
  autoSize?: boolean;
  withCopy?: boolean;
  loading?: boolean;
} & ComponentPropsWithRef<"textarea"> &
  VariantProps<typeof textarea>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ autoSize = true, withCopy = false, loading = false, value, className, border, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const adjustHeight = useCallback(() => {
      if (textareaRef.current && autoSize) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${
          textareaRef.current.scrollHeight + textareaRef.current.offsetHeight - textareaRef.current.clientHeight
        }px`;
      }
    }, [textareaRef, autoSize]);

    useEffect(() => {
      if (textareaRef.current && autoSize) {
        window.addEventListener("resize", adjustHeight);
        return () => window.removeEventListener("resize", adjustHeight);
      }
    }, [adjustHeight, autoSize]);

    useEffect(() => {
      adjustHeight();
    }, [value, adjustHeight]);

    return (
      <div className={"relative isolate"}>
        {loading && (
          <div className={"absolute inset-0 z-2"}>
            <div className={"flex h-full items-center justify-center"}>
              <Loader size={"sm"} variant={"spinner"} />
            </div>
          </div>
        )}
        <textarea
          className={clsx(textarea({ border, className }), withCopy && "peer", loading && "opacity-50")}
          ref={(node) => {
            textareaRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          value={value}
          {...props}
        />
        {!loading && withCopy && (
          <CopyButton
            className={
              "absolute right-2 top-2 opacity-10 hover:opacity-100 focus:opacity-100 peer-hover:opacity-100 peer-focus:opacity-100"
            }
            elevation={null}
            value={value}
            variant={"icon"}
            onCopy={() => {
              textareaRef.current?.select();
            }}
          />
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export default Textarea;
