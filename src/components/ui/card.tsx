import { cn } from "@/lib/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-none border border-border bg-surface p-5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {children}
    </div>
  );
}

function CardTitle({ className, children, ...props }: CardProps) {
  return (
    <p
      className={cn(
        "font-mono text-[13px] font-normal text-primary",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

function CardDescription({ className, children, ...props }: CardProps) {
  return (
    <p
      className={cn(
        "font-sans text-[12px] font-normal text-secondary leading-relaxed",
        className,
      )}
      style={{ lineHeight: 1.5 }}
      {...props}
    >
      {children}
    </p>
  );
}

function CardContent({ className, children, ...props }: CardProps) {
  return (
    <div className={cn("mt-3", className)} {...props}>
      {children}
    </div>
  );
}

export { Card, CardContent, CardDescription, CardHeader, CardTitle };
