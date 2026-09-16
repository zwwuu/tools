import { IconCheck, IconCopy } from "@tabler/icons-react";
import Button, { type ButtonProps } from "~/components/Button";
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
      {copied ? (
        <IconCheck aria-hidden size={"1em"} />
      ) : (
        <IconCopy aria-hidden size={"1em"} />
      )}
    </Button>
  );
};

export default CopyButton;
