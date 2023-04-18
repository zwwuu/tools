"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IconArrowUp } from "@tabler/icons-react";
import clsx from "clsx";
import { motion } from "framer-motion";

import Button from "~/components/Button";
import useSound from "~/hooks/useSound";
import { useConfig } from "~/providers/ConfigProvider";

const MotionButton = motion(Button);

export default function TopButton() {
  const [isShow, setIsShow] = useState(false);
  const { play } = useSound("/sounds/ui/swipe.wav");
  const { sound } = useConfig();
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsShow(!entry.isIntersecting);
    });
    observer.observe(document.querySelector("#hero") as Element);

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <MotionButton
      className={clsx(
        "hover:-translate-y-0.5 focus:-translate-y-0.5",
        isShow ? "visible animate-fadeInUp animate-faster" : "invisible",
      )}
      title={"Scroll to top"}
      variant={"icon"}
      whileTap={{ y: -16 }}
      onClick={() => {
        if (sound) {
          void play();
        }
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }}
    >
      <IconArrowUp size={"1em"} aria-hidden />
    </MotionButton>
  );
}
