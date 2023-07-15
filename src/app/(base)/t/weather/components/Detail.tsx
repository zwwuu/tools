import { ReactNode } from "react";

type DetailProps = {
  label: string;
  value: ReactNode;
  className?: string;
};

export default function Detail({ label, value }: DetailProps) {
  return (
    <div>
      <div>{label}</div>
      <div className={"whitespace-nowrap font-bold"}>{value}</div>
    </div>
  );
}
