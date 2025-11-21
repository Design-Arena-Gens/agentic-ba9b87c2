import { ReactNode } from "react";

type GridCardProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
};

export function GridCard({ title, eyebrow, children }: GridCardProps) {
  return (
    <div className="flex h-full flex-col gap-3 rounded-2xl border border-zinc-200 bg-gradient-to-b from-white/90 to-white/60 p-6 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.65)] dark:border-zinc-800 dark:from-zinc-900/80 dark:to-zinc-900/40">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-500">
          {eyebrow}
        </p>
      ) : null}
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>
      <div className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </div>
  );
}
