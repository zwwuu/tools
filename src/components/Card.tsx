import { ComponentPropsWithRef, ElementType, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";

const card = cva("bg-base-200", {
  variants: {
    elevation: {
      1: "shadow-sm md:shadow-md",
      2: "shadow-md md:shadow-lg",
      3: "shadow-lg md:shadow-xl",
    },
    border: {
      sm: "border-sm",
      md: "border-md",
      lg: "border-lg",
    },
  },
  defaultVariants: {
    elevation: 3,
    border: "md",
  },
});

type CardProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithRef<ElementType> &
  VariantProps<typeof card>;

const Card = forwardRef<HTMLDivElement, CardProps<ElementType>>(
  ({ as = "div", elevation, border, children, className, ...props }, ref) => {
    const Component = as;

    return (
      <Component className={card({ elevation, border, className })} ref={ref} {...props}>
        {children}
      </Component>
    );
  },
);
Card.displayName = "Card";

const cardHeader = cva("", {
  variants: {
    size: {
      sm: ["px-4 pt-4 pb-2"],
      lg: ["px-4 pt-4 pb-2", "md:px-6 md:pt-6 md:pb-4"],
    },
  },
  defaultVariants: {
    size: "sm",
  },
});
type CardHeaderProps = ComponentPropsWithRef<"div"> & VariantProps<typeof cardHeader>;

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({ children, size, className, ...props }, ref) => {
  return (
    <div className={cardHeader({ size, className })} ref={ref} {...props}>
      {children}
    </div>
  );
});
CardHeader.displayName = "CardHeader";

const cardBody = cva("", {
  variants: {
    size: {
      sm: "p-4",
      lg: "p-4 md:p-6",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

type CardBodyProps = ComponentPropsWithRef<"div"> & VariantProps<typeof cardBody>;

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(({ children, size, className, ...props }, ref) => {
  return (
    <div className={cardBody({ size, className })} ref={ref} {...props}>
      {children}
    </div>
  );
});
CardBody.displayName = "CardBody";

export { Card, CardHeader, CardBody };
