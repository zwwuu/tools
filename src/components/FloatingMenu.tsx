import { ReactNode } from "react";

export default function FloatingMenu({ children }: { children?: ReactNode }) {
  return (
    <div className={"fixed bottom-0 right-0 flex animate-fadeInUp flex-col items-center space-y-2 p-4"}>{children}</div>
  );
}
