export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-14">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">
          姚世行
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-zinc-500 dark:text-zinc-400">
          AI Coding 学习中 | 后端开发初学者
        </p>
        <p className="mt-2 text-sm text-zinc-400 dark:text-zinc-500">
          使用 AI 工具辅助学习与开发，探索更高效的编程方式
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-zinc-900 text-white font-medium hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
          >
            查看项目
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center h-12 px-6 rounded-lg border border-zinc-300 text-zinc-700 font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors"
          >
            联系我
          </a>
        </div>
      </div>
    </section>
  );
}
