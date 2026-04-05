interface WorkflowContentSummary {
  bestFor?: string;
  expectedOutput?: string;
  stepCount: number;
  promptCount: number;
}

const BEST_FOR_HEADINGS = ["goal", "why this approach", "best for", "who it's for"];
const EXPECTED_OUTPUT_HEADINGS = [
  "expected output",
  "what you'll ship",
  "what you'll have",
  "deliverables",
  "outcome",
];

function normalizeHeading(value: string): string {
  return value.trim().toLowerCase();
}

function sanitizeMarkdown(input: string): string {
  const withoutCode = input.replace(/```[\s\S]*?```/g, " ");
  const withoutJsx = withoutCode
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      return !(trimmed.startsWith("<") && trimmed.endsWith(">"));
    })
    .join("\n");

  return withoutJsx
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1");
}

function compactWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function toSingleLineSummary(rawSection: string): string | undefined {
  const cleaned = sanitizeMarkdown(rawSection);
  const lines = cleaned
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith("**Time**"));

  if (lines.length === 0) {
    return undefined;
  }

  const bulletLines = lines
    .filter((line) => /^[-*]\s+/.test(line))
    .map((line) => line.replace(/^[-*]\s+/, "").trim())
    .filter(Boolean);

  if (bulletLines.length > 0) {
    return compactWhitespace(bulletLines.slice(0, 2).join("; ")).slice(0, 200);
  }

  return compactWhitespace(lines[0]).slice(0, 200);
}

function extractSection(markdown: string, targetHeadings: string[]): string | undefined {
  const lines = markdown.split("\n");

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();

    if (!line.startsWith("## ")) {
      continue;
    }

    const heading = normalizeHeading(line.replace(/^##\s+/, ""));

    if (!targetHeadings.includes(heading)) {
      continue;
    }

    const sectionLines: string[] = [];

    for (let j = i + 1; j < lines.length; j += 1) {
      const candidate = lines[j];
      if (candidate.trim().startsWith("## ")) {
        break;
      }
      sectionLines.push(candidate);
    }

    const summary = toSingleLineSummary(sectionLines.join("\n"));
    if (summary) {
      return summary;
    }
  }

  return undefined;
}

export function extractWorkflowContentSummary(markdown: string): WorkflowContentSummary {
  return {
    bestFor: extractSection(markdown, BEST_FOR_HEADINGS),
    expectedOutput: extractSection(markdown, EXPECTED_OUTPUT_HEADINGS),
    stepCount: (markdown.match(/<WorkflowStep\b/g) ?? []).length,
    promptCount: (markdown.match(/<PromptBlock\b/g) ?? []).length,
  };
}
