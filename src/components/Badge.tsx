import { ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva("inline-flex font-normal items-center border p-1 text-xs", {
  variants: {
    variant: {
      default: "bg-primary/80",
      destructive: "bg-red-600 text-red-50",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BadgeProps = ComponentPropsWithoutRef<"span"> & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={badgeVariants({ variant, className })} {...props} />;
}

export { Badge };
