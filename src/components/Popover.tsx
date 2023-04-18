import { ComponentProps, forwardRef, ReactNode } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import clsx from "clsx";

import Button, { ButtonProps } from "~/components/Button";
import { Card, CardBody } from "~/components/Card";

export const Popover = PopoverPrimitive.Root;
type PopoverTriggerProps = {
  children: ReactNode;
  className?: string;
} & ComponentProps<typeof PopoverPrimitive.Trigger> &
  ButtonProps;

export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <PopoverPrimitive.Trigger className={className} {...props} ref={forwardedRef} asChild>
      <Button>{children}</Button>
    </PopoverPrimitive.Trigger>
  ),
);
PopoverTrigger.displayName = "PopoverTrigger";

type PopoverContentProps = {
  children: ReactNode;
  className?: string;
} & ComponentProps<typeof PopoverPrimitive.Content>;

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content collisionPadding={8} side={"bottom"} sideOffset={8} {...props} ref={forwardedRef}>
        <Card
          className={clsx(
            "overflow-x-auto data-[state=open]:animate-fadeIn data-[state=open]:animate-faster",
            className,
          )}
          elevation={null}
        >
          <CardBody size={"sm"}>{children}</CardBody>
        </Card>
        <PopoverPrimitive.Arrow className={"fill-border"} />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  ),
);
PopoverContent.displayName = "PopoverContent";
