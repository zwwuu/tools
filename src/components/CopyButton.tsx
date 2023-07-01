import { IconCheck, IconCopy } from "@tabler/icons-react";

import Button, { ButtonProps } from "~/components/Button";
import useClipboard from "~/hooks/useClipboard";

type CopyButtonProps = {
  value?: string | number | string[] | readonly string[];
  onCopy?: () => void;
} & ButtonProps;
const CopyButton = ({ value, onCopy, children, ...props }: CopyButtonProps) => {
  const { copied, copy } = useClipboard();

  return (
    <Button
      title={copied ? "Copied" : "Copy"}
      {...props}
      onClick={() => {
        if (!value) return;

        copy(value.toString());
        onCopy?.();
      }}
    >
      {children}
      {copied ? <IconCheck size={"1em"} aria-hidden /> : <IconCopy size={"1em"} aria-hidden />}
    </Button>
  );
};

export default CopyButton;
