import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

type CheckboxProps = {
  className?: string;
} & ComponentPropsWithoutRef<"input">;

export default function Checkbox({ className, ...props }: CheckboxProps) {
  return <input className={clsx("border-sm border-black text-primary", className)} type={"checkbox"} {...props} />;
}
