import type { ReactNode } from "react";

export default function FloatingMenu({ children }: { children?: ReactNode }) {
  return (
    <div
      className={
        "fixed right-0 bottom-0 flex animate-fadeInUp flex-col items-end space-y-2 p-4"
      }
    >
      {children}
    </div>
  );
}
