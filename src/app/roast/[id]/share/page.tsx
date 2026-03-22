import { getScoreColorHex } from "@/lib/score";

interface SharePageProps {
  params: Promise<{ id: string }>;
}

export default async function SharePage({ params }: SharePageProps) {
  const { id: _id } = await params;

  const mockData = {
    score: 3.5,
    verdict: "needs_serious_help",
    roastMessage: "this code was written during a power outage...",
    language: "javascript",
    lines: 7,
  };

  const scoreColor = getScoreColorHex(mockData.score);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-7"
      style={{ backgroundColor: "#0C0C0C", padding: "64px" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span
          className="font-mono text-2xl font-bold"
          style={{ color: "#10B981" }}
        >
          {">"}
        </span>
        <span
          className="font-mono text-xl font-medium"
          style={{ color: "#E5E5E5" }}
        >
          devroast
        </span>
      </div>

      {/* Score */}
      <div className="flex items-end gap-1">
        <span
          className="font-mono font-black leading-none"
          style={{ color: scoreColor, fontSize: "160px" }}
        >
          {mockData.score.toFixed(1)}
        </span>
        <span
          className="font-mono"
          style={{ color: "#737373", fontSize: "56px" }}
        >
          /10
        </span>
      </div>

      {/* Verdict */}
      <div className="flex items-center gap-2">
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: scoreColor }}
        />
        <span className="font-mono text-xl" style={{ color: scoreColor }}>
          {mockData.verdict}
        </span>
      </div>

      {/* Meta Info */}
      <span className="font-mono text-base" style={{ color: "#737373" }}>
        lang: {mockData.language} · {mockData.lines} lines
      </span>

      {/* Quote */}
      <p
        className="w-full text-center"
        style={{
          color: "#E5E5E5",
          fontSize: "22px",
          fontFamily: "IBM Plex Mono, monospace",
          lineHeight: 1.5,
        }}
      >
        &quot;{mockData.roastMessage}&quot;
      </p>
    </div>
  );
}
