import { ButtonHTMLAttributes, ComponentPropsWithRef, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";

const button = cva("inline-flex items-center", {
  variants: {
    elevation: {
      1: "shadow-sm hover:shadow-none focus:shadow-none",
      2: "shadow-md hover:shadow-none focus:shadow-none",
      3: "shadow-lg hover:shadow-none focus:shadow-none",
    },
    size: {
      sm: "",
      lg: "",
    },
    border: {
      sm: "border-sm",
      md: "border-md",
      lg: "border-lg",
    },
    variant: {
      primary: "bg-base-100 font-medium px-4 py-3 hover:bg-primary focus:bg-primary transition justify-center",
      warning: "bg-red-500 font-medium px-4 py-3 transition justify-center",
      icon: "bg-base-100 hover:bg-primary focus:bg-primary transition justify-center",
    },
  },
  compoundVariants: [
    {
      variant: "icon",
      size: "sm",
      className: "p-2 text-lg",
    },
    {
      variant: "icon",
      size: "lg",
      className: "p-4 text-xl",
    },
  ],
  defaultVariants: {
    variant: "primary",
    size: "sm",
    border: "sm",
    elevation: 2,
  },
});

export type ButtonProps = {
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  isLoading?: boolean;
} & ComponentPropsWithRef<"button"> &
  VariantProps<typeof button>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, border, elevation, size, type = "button", isLoading = false, ...props }, ref) => (
    <button className={button({ variant, size, elevation, border, className })} ref={ref} type={type} {...props} />
  ),
);
Button.displayName = "Button";

export default Button;
