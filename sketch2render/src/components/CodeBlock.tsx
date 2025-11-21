import { ReactNode } from "react";
import clsx from "clsx";

type CodeBlockProps = {
  language?: string;
  children: ReactNode;
};

export function CodeBlock({ language, children }: CodeBlockProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950/95 shadow-inner shadow-black/30 dark:border-zinc-800">
      <div className="flex items-center justify-between border-b border-white/10 bg-zinc-900/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-zinc-400">
        <span>{language ?? "code"}</span>
        <div className="flex gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
      </div>
      <pre
        className={clsx(
          "overflow-x-auto whitespace-pre-wrap bg-transparent p-4 text-sm leading-6 text-zinc-100",
        )}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}
