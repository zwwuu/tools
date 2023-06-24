"use client";

import { useEffect, useRef, useState } from "react";
import { IconThumbUp } from "@tabler/icons-react";
import clsx from "clsx";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";

import Button from "~/components/Button";
import useDebounce from "~/hooks/useDebounce";
import useSound from "~/hooks/useSound";
import { MAX_LIKES } from "~/lib/constants";
import { db } from "~/lib/firebase";
import { useUser } from "~/providers/UserProvider";

const likeAnimation = {
  initial: { y: 0, rotate: 0 },
  jump: { y: -4, rotate: -10 },
  grow: { scale: 1.1 },
};
const floatingTextAnimation = {
  initial: { x: 0, y: 0, opacity: 0, transition: { duration: 3 } },
  jump: { x: 12, y: -4, opacity: 1 },
};
const MotionIconThumbUp = motion(IconThumbUp);
const MotionButton = motion(Button);
export default function LikeButton({ slug }: { slug: string }) {
  const { addLike, isLiked, getLikes } = useUser();
  const [totalLikes, setTotalLikes] = useState(0);
  const likes = useRef(0);
  const debouncedLikes = useDebounce(likes.current, 500);
  const { play, stop } = useSound("/sounds/ui/tap_01.wav");

  useEffect(() => {
    (async () => {
      const toolDocRef = doc(db, "tools", slug);
      await getDoc(toolDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setTotalLikes(docSnap.data()?.totalLikes ?? 0);
          }
        })
        .catch((err) => console.error(err));
    })();
  }, [slug]);

  useEffect(() => {
    if (debouncedLikes <= 0) return;

    (async () => {
      const likeToSend = Math.min(debouncedLikes, MAX_LIKES);
      await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: likeToSend,
          slug: slug,
        }),
      }).catch((err) => console.error(err));
      window.gtag("event", "like", {
        event_category: "engagement",
        event_label: slug,
        value: likeToSend,
      });
      likes.current = 0;
    })();
  }, [debouncedLikes, slug]);

  return (
    <MotionButton
      animate={"initial"}
      border={null}
      className={"group flex items-center font-bold leading-none transition hover:text-red-500 focus:text-red-500"}
      elevation={null}
      initial={"initial"}
      title={"Like this tool"}
      type={"button"}
      variant={null}
      whileFocus={"grow"}
      whileHover={"grow"}
      whileTap={"jump"}
      onClick={async () => {
        if (likes.current < MAX_LIKES && getLikes(slug) < MAX_LIKES) {
          await stop();
          likes.current += 1;
          setTotalLikes(totalLikes + 1);
          addLike(slug);
          void play();
        }
      }}
    >
      <MotionIconThumbUp
        className={clsx("mr-1", isLiked(slug) && "text-red-500")}
        variants={likeAnimation}
        aria-hidden
      />
      <span className={"relative transition group-hover:text-red-500 group-focus:text-red-500"}>
        {Intl.NumberFormat("en", { notation: "compact" }).format(totalLikes)}
        <motion.span
          className={"pointer-events-none absolute left-full top-0 block text-red-500 text-xs"}
          variants={floatingTextAnimation}
        >
          {likes.current < MAX_LIKES && getLikes(slug) < MAX_LIKES ? `+${likes.current}` : "MAX"}
        </motion.span>
      </span>
    </MotionButton>
  );
}
