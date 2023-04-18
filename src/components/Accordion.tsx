import { forwardRef } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { IconChevronDown } from "@tabler/icons-react";
import clsx from "clsx";

import { Card, CardBody } from "~/components/Card";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = forwardRef<HTMLDivElement, AccordionPrimitive.AccordionItemProps>(
  ({ className, children, ...props }, forwardedRef) => {
    return (
      <AccordionPrimitive.Item className={clsx("overflow-hidden border-t-md", className)} {...props} ref={forwardedRef}>
        {children}
      </AccordionPrimitive.Item>
    );
  },
);
AccordionItem.displayName = "AccordionItem";

export const AccordionHeader = AccordionPrimitive.Header;

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionPrimitive.AccordionTriggerProps>(
  ({ className, children, ...props }, forwardedRef) => {
    return (
      <AccordionPrimitive.Trigger
        className={clsx(
          "group p-4 leading-none hover:bg-primary focus:bg-primary data-[state='open']:bg-primary",
          className,
        )}
        ref={forwardedRef}
        {...props}
      >
        {children}
        <IconChevronDown
          className={
            "opacity-80 transition group-hover:opacity-100 group-focus:opacity-100 group-data-[state='open']:rotate-180"
          }
          aria-hidden
        />
      </AccordionPrimitive.Trigger>
    );
  },
);
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = forwardRef<HTMLDivElement, AccordionPrimitive.AccordionContentProps>(
  ({ className, children, ...props }, forwardedRef) => {
    return (
      <AccordionPrimitive.Content ref={forwardedRef} asChild {...props}>
        <Card
          border={null}
          className={clsx(
            "overflow-hidden border-t-sm data-[state='closed']:animate-accordion-close data-[state='open']:animate-accordion-open",
            className,
          )}
          elevation={null}
        >
          <CardBody>{children}</CardBody>
        </Card>
      </AccordionPrimitive.Content>
    );
  },
);
AccordionContent.displayName = "AccordionContent";
