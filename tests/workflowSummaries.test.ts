/// <reference types="bun-types" />

import { describe, expect, it } from "bun:test";
import { extractWorkflowContentSummary } from "@/lib/workflowSummaries";

describe("extractWorkflowContentSummary", () => {
  it("extracts goal and expected output plus counts", () => {
    const markdown = `
## Goal

Ship a merge-ready feature from a vague request.

<WorkflowStep step={1} title="Spec" />
<WorkflowStep step={2} title="Build" />
<PromptBlock agent="USER">Ask model for test plan</PromptBlock>

## Expected Output

A tested implementation with clean PR notes.
`;

    const summary = extractWorkflowContentSummary(markdown);

    expect(summary.bestFor).toBe("Ship a merge-ready feature from a vague request.");
    expect(summary.expectedOutput).toBe("A tested implementation with clean PR notes.");
    expect(summary.stepCount).toBe(2);
    expect(summary.promptCount).toBe(1);
  });

  it("supports alternate expected-output headings and bullet summaries", () => {
    const markdown = `
## Why This Approach

- Teams that need faster weekly shipping
- Engineers who want better risk checks before merge

## What You'll Ship

- Merge-ready PR with tests
- Better reviewer context
`;

    const summary = extractWorkflowContentSummary(markdown);

    expect(summary.bestFor).toBe("Teams that need faster weekly shipping; Engineers who want better risk checks before merge");
    expect(summary.expectedOutput).toBe("Merge-ready PR with tests; Better reviewer context");
  });

  it("returns undefined when sections are absent", () => {
    const markdown = `
## Intro

No matching section labels here.
`;

    const summary = extractWorkflowContentSummary(markdown);

    expect(summary.bestFor).toBeUndefined();
    expect(summary.expectedOutput).toBeUndefined();
    expect(summary.stepCount).toBe(0);
    expect(summary.promptCount).toBe(0);
  });
});
