import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import clsx from "clsx";

const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    className={clsx("relative flex w-full touch-none select-none items-center", className)}
    ref={ref}
    {...props}
  >
    <SliderPrimitive.Track className={"relative h-2 w-full grow overflow-hidden bg-primary-200"}>
      <SliderPrimitive.Range className={"absolute h-full bg-primary-600"} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={
        "block h-6 w-6 border bg-primary focus:outline-dashed focus:outline-2 focus:outline-offset-2 focus:outline-current"
      }
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
