import type { ReactNode } from "react";

export function CTAButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}) {
  return (
    <a href={href} className={`btn btn-${variant}`}>
      {children}
    </a>
  );
}
