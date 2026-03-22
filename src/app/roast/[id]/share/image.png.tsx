import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

function getScoreColor(score: number) {
  if (score < 4) return "#EF4444";
  if (score < 7) return "#F59E0B";
  return "#10B981";
}

function getVerdictText(score: number) {
  if (score < 2) return "catastrophic_failure";
  if (score < 4) return "needs_serious_help";
  if (score < 6) return "room_for_improvement";
  if (score < 8) return "decent_effort";
  return "surprisingly_decent";
}

interface ShareImageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ShareImage({ params }: ShareImageProps) {
  const { id: _id } = await params;

  const score = 3.5;
  const language = "javascript";
  const lines = 7;
  const roast = "this code was written during a power outage...";

  const scoreColor = getScoreColor(score);
  const verdictText = getVerdictText(score);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0C0C0C",
        padding: "64px",
        gap: "28px",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          position: "absolute",
          top: "60px",
          left: "80px",
        }}
      >
        <span
          style={{
            color: "#10B981",
            fontSize: "24px",
            fontWeight: 700,
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          {">"}
        </span>
        <span
          style={{
            color: "#FAFAFA",
            fontSize: "20px",
            fontWeight: 500,
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          devroast
        </span>
      </div>

      {/* Score */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <span
          style={{
            color: scoreColor,
            fontSize: "160px",
            fontWeight: 900,
            fontFamily: "JetBrains Mono, monospace",
            lineHeight: 1,
          }}
        >
          {score.toFixed(1)}
        </span>
        <span
          style={{
            color: "#737373",
            fontSize: "56px",
            fontWeight: 400,
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          /10
        </span>
      </div>

      {/* Verdict */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: scoreColor,
          }}
        />
        <span
          style={{
            color: scoreColor,
            fontSize: "20px",
            fontWeight: 400,
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          {verdictText}
        </span>
      </div>

      {/* Meta Info */}
      <span
        style={{
          color: "#737373",
          fontSize: "16px",
          fontFamily: "JetBrains Mono, monospace",
        }}
      >
        lang: {language} · {lines} lines
      </span>

      {/* Roast Message */}
      <span
        style={{
          color: "#FAFAFA",
          fontSize: "22px",
          fontFamily: "IBM Plex Mono, monospace",
          textAlign: "center",
          maxWidth: "1072px",
          lineHeight: 1.5,
        }}
      >
        "{roast}"
      </span>
    </div>,
    {
      ...size,
    },
  );
}
