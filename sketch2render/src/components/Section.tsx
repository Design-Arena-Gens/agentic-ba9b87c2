import { ReactNode } from "react";
import clsx from "clsx";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        "rounded-3xl border border-zinc-200 bg-white/80 p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-900/70",
        className,
      )}
    >
      <div className="space-y-3">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>
        {description ? (
          <p className="max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        ) : null}
      </div>
      {children ? <div className="mt-6 space-y-4">{children}</div> : null}
    </section>
  );
}
