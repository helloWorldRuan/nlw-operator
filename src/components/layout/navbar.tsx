import Link from "next/link";
import { cn } from "@/lib/cn";

export interface NavbarProps {
  className?: string;
}

function Navbar({ className }: NavbarProps) {
  return (
    <nav
      className={cn(
        "flex items-center justify-between border-b border-border px-10",
        "h-14 bg-page",
        className,
      )}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 font-mono text-lg">
        <span className="text-accent-green font-bold">{">"}</span>
        <span className="text-primary font-medium">devroast</span>
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6">
        <Link
          href="/leaderboard"
          className="font-mono text-[13px] text-secondary hover:text-primary transition-colors"
        >
          leaderboard
        </Link>
      </div>
    </nav>
  );
}

export { Navbar };
