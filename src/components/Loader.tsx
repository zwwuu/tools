import { cva, type VariantProps } from "class-variance-authority";

const loader = cva(
  "animate-twSpin rounded-full border-lg border-r-transparent animate-infinite",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        lg: "h-32 w-32",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);
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
      <span className={"animate-delay-100 animate-fadeIn"}>.</span>
      <span className={"animate-delay-200 animate-fadeIn"}>.</span>
      <span
        className={
          "animate-delay-300 animate-ease-linear animate-fadeIn animate-infinite"
        }
      >
        .
      </span>
    </span>
  );
}
