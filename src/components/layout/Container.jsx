import { cn } from "@/lib/cn";

// DESIGN.md §6.2 — 1800px max-width, 24px mobile / 40px desktop gutter.
export function Container({ className, children, as: Comp = "div", ...props }) {
  return (
    <Comp className={cn("mx-auto max-w-[1800px] px-6 md:px-10 lg:px-18", className)} {...props}>
      {children}
    </Comp>
  );
}
