"use client";

import { IconCheck, IconShare } from "@tabler/icons-react";

import Button from "~/components/Button";
import useClipboard from "~/hooks/useClipboard";

type ShareButtonProps = {
  text: string;
};
export default function ShareButton({ text }: ShareButtonProps) {
  const { copied, copy } = useClipboard();

  return (
    <Button
      border={null}
      className={"hover:text-cyan-500 focus:text-cyan-500"}
      elevation={null}
      title={copied ? "Copied" : "Share"}
      type={"button"}
      variant={null}
      onClick={() => {
        copy(text);
      }}
    >
      {copied ? <IconCheck aria-hidden /> : <IconShare aria-hidden />}
    </Button>
  );
}
