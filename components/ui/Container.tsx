import { cn } from "@/lib/utils";

export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
}) {
  return <Tag className={cn("mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12", className)}>{children}</Tag>;
}
