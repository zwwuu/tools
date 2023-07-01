import { ComponentPropsWithoutRef, forwardRef } from "react";
import clsx from "clsx";

const Table = forwardRef<HTMLTableElement, ComponentPropsWithoutRef<"table">>(({ className, ...props }, ref) => {
  return <table className={clsx("w-full border", className)} ref={ref} {...props} />;
});
Table.displayName = "Table";

const TableHeader = forwardRef<HTMLTableSectionElement, ComponentPropsWithoutRef<"thead">>(
  ({ className, ...props }, ref) => {
    return <thead className={clsx("border-b", className)} ref={ref} {...props} />;
  },
);
TableHeader.displayName = "TableHeader";

const TableBody = forwardRef<HTMLTableSectionElement, ComponentPropsWithoutRef<"tbody">>(
  ({ className, ...props }, ref) => {
    return (
      <tbody className={clsx("w-full [&_tr:hover]:bg-base-focus [&_tr]:transition", className)} ref={ref} {...props} />
    );
  },
);
TableBody.displayName = "TableBody";

const TableFooter = forwardRef<HTMLTableSectionElement, ComponentPropsWithoutRef<"tfoot">>(
  ({ className, ...props }, ref) => <tfoot className={clsx("border-t", className)} ref={ref} {...props} />,
);
TableFooter.displayName = "TableFooter";

const TableHead = forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<"th">>(({ className, ...props }, ref) => (
  <th className={clsx("p-2 align-middle font-medium", className)} ref={ref} {...props} />
));
TableHead.displayName = "TableHead";

const TableCell = forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<"td">>(({ className, ...props }, ref) => (
  <td className={clsx("p-2 align-middle", className)} ref={ref} {...props} />
));
TableCell.displayName = "TableCell";

const TableCaption = forwardRef<HTMLTableCaptionElement, ComponentPropsWithoutRef<"caption">>(
  ({ className, ...props }, ref) => {
    return <caption className={clsx("opacity-80 text-xs", className)} ref={ref} {...props} />;
  },
);
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableCell, TableCaption };
