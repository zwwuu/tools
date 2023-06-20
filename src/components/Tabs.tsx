import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import clsx from "clsx";

const Tabs = TabsPrimitive.Tabs;

const TabsList = forwardRef<ElementRef<typeof TabsPrimitive.List>, ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.List className={clsx("flex items-center overflow-x-auto pb-1", className)} ref={ref} {...props} />
  ),
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    className={clsx(
      "inline-flex items-center justify-center whitespace-nowrap border-b border-base-100 px-2 py-1 transition data-[state=active]:border-black",
      className,
    )}
    ref={ref}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => <TabsPrimitive.Content className={clsx("mt-2", className)} ref={ref} {...props} />);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
