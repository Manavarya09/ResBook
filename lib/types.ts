export interface ToolFrontmatter {
  title: string;
  slug: string;
  description: string;
  category: "LLM" | "Agent" | "IDE" | "CLI";
  pricing: "Free" | "Freemium" | "Paid";
  worthIt: boolean;
  dateAdded: string;
}

export interface WorkflowFrontmatter {
  title: string;
  slug: string;
  description: string;
  author: string;
  complexity: "Beginner" | "Intermediate" | "Advanced";
  toolsUsed: string[];
  dateAdded: string;
}

export interface DotfileFrontmatter {
  title: string;
  slug: string;
  description: string;
  author: string;
  kind: "Prompt Pack" | "Config" | "Template";
  toolsUsed: string[];
  dateAdded: string;
}

export interface ToolContent {
  frontmatter: ToolFrontmatter;
  content: string;
}

export interface WorkflowContent {
  frontmatter: WorkflowFrontmatter;
  content: string;
}

export interface DotfileContent {
  frontmatter: DotfileFrontmatter;
  content: string;
}
