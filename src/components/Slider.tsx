import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import clsx from "clsx";

type SliderProps = ComponentPropsWithoutRef<typeof SliderPrimitive.Root>;
const Slider = forwardRef<ElementRef<typeof SliderPrimitive.Root>, SliderProps>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    className={clsx("relative flex w-full touch-none select-none items-center", className)}
    ref={ref}
    {...props}
  >
    <SliderPrimitive.Track className={"relative h-2 w-full grow overflow-hidden border bg-base-300"}>
      <SliderPrimitive.Range className={"absolute h-full bg-primary"} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={
        "block h-5 w-5 border bg-primary focus:outline-dashed focus:outline-2 focus:outline-offset-2 focus:outline-current"
      }
    ></SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
