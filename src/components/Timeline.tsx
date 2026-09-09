import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Card, CardBody } from "~/components/Card";

type TimelineProps = ComponentPropsWithRef<"ul">;
const Timeline = forwardRef<HTMLUListElement, TimelineProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <ul
        className={clsx("relative flex flex-col space-y-2", className)}
        ref={ref}
        {...props}
      >
        {children}
      </ul>
    );
  },
);
Timeline.displayName = "Timeline";

const timelineItem = cva("", {
  variants: {},
  defaultVariants: {},
});
type TimelineItemProps = ComponentPropsWithRef<"li"> &
  VariantProps<typeof timelineItem>;
const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <li
        className={clsx("group flex md:even:flex-row-reverse", className)}
        ref={ref}
        {...props}
      >
        <div
          className={
            "hidden flex-1 md:block md:group-even:ml-4 md:group-odd:mr-4"
          }
        />
        <div className={"flex flex-0 flex-col items-center justify-center"}>
          <div className={"mb-2 h-6 w-6 border bg-primary"} />
          <div className={"w-1 flex-grow bg-base-content"} />
        </div>
        <div
          className={
            "flex-1 pb-4 group-odd:ml-4 group-even:ml-4 md:group-even:mr-4 md:group-even:ml-0"
          }
        >
          {children}
        </div>
      </li>
    );
  },
);
TimelineItem.displayName = "TimelineItem";

type TimelineContentProps = ComponentPropsWithRef<"div">;
const TimelineContent = forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div className={"flex md:group-even:justify-end"}>
        <Card ref={ref} {...props} elevation={null}>
          <CardBody>{children}</CardBody>
        </Card>
      </div>
    );
  },
);
TimelineContent.displayName = "TimelineContent";

export { Timeline, TimelineContent, TimelineItem };
