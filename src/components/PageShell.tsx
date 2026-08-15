import type { ReactNode } from "react";

export function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <main className="relative z-10 mx-auto w-full max-w-5xl px-4 py-14">
      <h1 className="ember-text text-center text-lg sm:text-xl">{title}</h1>
      {subtitle && (
        <p className="mt-3 text-center text-muted-foreground">{subtitle}</p>
      )}
      <div className="mt-10">{children}</div>
    </main>
  );
}
