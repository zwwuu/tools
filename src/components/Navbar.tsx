"use client";

import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { IconMenu, IconMoon, IconMusic, IconMusicOff, IconSun } from "@tabler/icons-react";
import clsx from "clsx";

import Button from "~/components/Button";
import { NavLink } from "~/components/NavLink";
import { useConfig } from "~/providers/ConfigProvider";

const navLinks = [
  { href: "/", label: "Home", hideOnMobile: false },
  { href: "/feedback", label: "Feedback", hideOnMobile: true },
  { href: "/changelog", label: "Changelog", hideOnMobile: true },
];
export default function Navbar() {
  const pathname = usePathname();
  const { theme, onThemeToggle, sound, onSoundToggle } = useConfig();

  return (
    <div className={"sticky top-0 z-100 flex items-center border-b bg-base-100"}>
      <NavigationMenu.Root delayDuration={0}>
        <NavigationMenu.List className={"flex space-x-2"}>
          <NavigationMenu.Item className={"md:hidden"}>
            <NavigationMenu.Trigger
              aria-label={"Menu"}
              className={"flex h-full items-center border-r p-4 transition hover:opacity-80 focus:opacity-80"}
            >
              <IconMenu aria-hidden />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content asChild>
              <div
                className={
                  "absolute left-0 top-full mt-4 border-md bg-base-300 data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn data-[state=closed]:animate-faster data-[state=open]:animate-faster"
                }
              >
                <ul>
                  {navLinks.map(({ href, label }) => (
                    <NavigationMenu.Item key={href}>
                      <NavLink active={pathname === href} href={href}>
                        {label}
                      </NavLink>
                    </NavigationMenu.Item>
                  ))}
                </ul>
              </div>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          {navLinks.map(({ href, label, hideOnMobile }) => (
            <NavigationMenu.Item className={clsx(hideOnMobile && "hidden md:block")} key={href}>
              <NavLink active={pathname === href} href={href}>
                {label}
              </NavLink>
            </NavigationMenu.Item>
          ))}

          <NavigationMenu.Indicator className={"group absolute left-0 top-full flex justify-center"} forceMount>
            <div
              className={"w-2 bg-black transition-size group-data-[state=hidden]:h-0 group-data-[state=visible]:h-4"}
            />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>
      </NavigationMenu.Root>
      <div className={"ml-auto flex items-center space-x-4 px-4"}>
        <Button title={"Toggle mode"} type={"button"} variant={"icon"} onClick={onThemeToggle}>
          {theme === "dark" ? <IconMoon aria-hidden /> : <IconSun aria-hidden />}
        </Button>
        <Button title={"Toggle sound"} type={"button"} variant={"icon"} onClick={onSoundToggle}>
          {sound ? <IconMusic aria-hidden /> : <IconMusicOff aria-hidden />}
        </Button>
      </div>
    </div>
  );
}
