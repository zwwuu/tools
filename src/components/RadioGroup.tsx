"use client";

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { IconCircle } from "@tabler/icons-react";
import clsx from "clsx";

const RadioGroup = RadioGroupPrimitive.Root;

const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      className={clsx(
        "relative bg-base-300 font-medium transition hover:bg-primary focus:z-2 focus:bg-primary data-[state='checked']:bg-primary",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

const RadioGroupIndicator = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Indicator>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Indicator>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Indicator className={"flex items-center justify-center"} {...props} ref={ref}>
      <IconCircle className={"h-2.5 w-2.5 text-current"} aria-hidden />
    </RadioGroupPrimitive.Indicator>
  );
});
RadioGroupIndicator.displayName = RadioGroupPrimitive.Indicator.displayName;

export { RadioGroup, RadioGroupItem, RadioGroupIndicator };
