import { ComponentPropsWithoutRef, forwardRef, useCallback, useEffect, useRef } from "react";
import { cva, VariantProps } from "class-variance-authority";

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
} & ComponentPropsWithoutRef<"textarea"> &
  VariantProps<typeof textarea>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ autoSize = true, value, className, border, ...props }, ref) => {
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
      <textarea
        className={textarea({ border, className })}
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
    );
  },
);
Textarea.displayName = "Textarea";

export default Textarea;
