import { ComponentPropsWithRef, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";

const heading = cva("font-bold", {
  variants: {
    as: {
      h1: "text-4xl",
      h2: "text-3xl",
      h3: "text-2xl",
      h4: "text-xl",
      h5: "text-lg",
      h6: "text-base",
    },
  },
  defaultVariants: {
    as: "h1",
  },
});
type Headings = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingProps = {
  as: Headings;
} & ComponentPropsWithRef<Headings> &
  VariantProps<typeof heading>;

export default forwardRef<HTMLDivElement, HeadingProps>(function Heading({ as, className, ...props }, ref) {
  const Component = as;

  return <Component className={heading({ as, className })} ref={ref} {...props} />;
});
