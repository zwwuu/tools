"use client";

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "~/components/Toast";
import { useToast } from "~/hooks/useToast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider swipeDirection={"down"}>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className={"clear-both"}>
            <ToastClose />
            <ToastTitle>{title}</ToastTitle>
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
