import { ComponentPropsWithRef, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";

const select = cva("bg-input", {
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

type SelectProps = {
  className?: string;
  data: { label: string | number; value: string | number }[];
} & ComponentPropsWithRef<"select"> &
  VariantProps<typeof select>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, border, data, ...props }, ref) => (
  <select className={select({ border, className })} {...props} ref={ref}>
    {data.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
));
Select.displayName = "Select";

export default Select;
