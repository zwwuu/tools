import { cva, VariantProps } from "class-variance-authority";

const loader = cva("animate-twSpin rounded-full border-lg border-r-transparent animate-infinite", {
  variants: {
    size: {
      sm: "h-8 w-8",
      lg: "h-32 w-32",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});
type LoaderProps = {
  className?: string;
  variant: "spinner" | "dots";
} & VariantProps<typeof loader>;
export default function Loader({ variant, size, className }: LoaderProps) {
  if (variant === "spinner") {
    return <div className={loader({ size, className })} />;
  }

  return (
    <span aria-hidden>
      <span className={"animate-fadeIn animate-delay-100"}>.</span>
      <span className={"animate-fadeIn animate-delay-200"}>.</span>
      <span className={"animate-fadeIn animate-infinite animate-ease-linear animate-delay-300"}>.</span>
    </span>
  );
}
