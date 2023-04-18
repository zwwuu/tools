import { ComponentPropsWithRef, forwardRef } from "react";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import clsx from "clsx";

import Anchor from "~/components/Anchor";

type NavLinkProps = ComponentPropsWithRef<typeof Link> & ComponentPropsWithRef<typeof NavigationMenu.Link>;
export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ children, className, href, ...props }, forwardedRef) => (
    <NavigationMenu.Link
      className={clsx(
        "flex items-center p-4 font-bold transition hover:opacity-80 focus:opacity-80 data-[active]:opacity-80",
        className,
      )}
      asChild
      {...props}
      ref={forwardedRef}
    >
      <Anchor href={href} variant={null}>
        {children}
      </Anchor>
    </NavigationMenu.Link>
  ),
);
NavLink.displayName = "NavLink";
