export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto text-center text-sm text-zinc-400 dark:text-zinc-500 space-y-1">
        <p>&copy; {new Date().getFullYear()} 姚世行. Built with Next.js + TypeScript + Tailwind CSS.</p>
        <p>使用 Claude Code 辅助开发 —— AI 结对编程实践项目</p>
      </div>
    </footer>
  );
}
