import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-black dark:border-white">
      <Container className="py-6">
        <div className="flex flex-col items-center justify-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <p>© {new Date().getFullYear()} ResBook. All rights reserved.</p>
          <p>A markdown-driven directory for AI tools & workflows.</p>
        </div>
      </Container>
    </footer>
  );
}
