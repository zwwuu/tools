import { ComponentPropsWithRef, forwardRef } from "react";
import Link from "next/link";
import { IconExternalLink } from "@tabler/icons-react";
import { cva, VariantProps } from "class-variance-authority";

const anchor = cva("", {
  variants: {
    variant: {
      primary:
        "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-current after:transition-size hover:after:h-1 focus:after:h-1",
    },
    isExternal: {
      true: "inline-flex items-center",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      isExternal: true,
      className: "inline-flex items-center",
    },
    {
      variant: "primary",
      isExternal: false,
      className: "inline-block",
    },
  ],
  defaultVariants: { variant: "primary", isExternal: false },
});

export type AnchorProps = {
  isExternal?: boolean;
} & ComponentPropsWithRef<typeof Link> &
  VariantProps<typeof anchor>;
export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ children, className, variant, isExternal = false, href, ...props }, ref) => {
    return (
      <Link
        href={href}
        rel={isExternal ? "noopener noreferrer" : undefined}
        target={isExternal ? "_blank" : undefined}
        {...props}
        className={anchor({ variant, isExternal, className })}
        ref={ref}
      >
        {children}
        {isExternal && (
          <>
            <IconExternalLink className={"ml-1"} size={"1em"} aria-hidden />
            <span className={"sr-only"}>opens in a new tab</span>
          </>
        )}
      </Link>
    );
  },
);
Anchor.displayName = "Anchor";

export default Anchor;
