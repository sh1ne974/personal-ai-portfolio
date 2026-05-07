export default function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white text-center">
          关于我
        </h2>
        <div className="mt-8 space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>
            我是一名后端开发学习者，目前正在系统学习{" "}
            <span className="font-medium text-zinc-900 dark:text-white">Spring Boot</span>、
            <span className="font-medium text-zinc-900 dark:text-white">MySQL</span> 和{" "}
            <span className="font-medium text-zinc-900 dark:text-white">MyBatis-Plus</span>{" "}
            等后端技术栈，致力于成为一名合格的后端开发工程师。
          </p>
          <p>
            在学习过程中，我积极拥抱 AI 工具来辅助编码。我使用{" "}
            <span className="font-medium text-zinc-900 dark:text-white">Claude Code</span>{" "}
            等 AI 编程助手完成需求分析、代码生成、调试优化和项目部署等环节，
            大幅提升了学习效率和开发质量。这个网站本身就是在 Claude Code 的辅助下，
            从零开始一步步搭建完成的。
          </p>
          <p>
            我相信，未来的开发者不仅要懂技术原理，更要善于利用 AI 工具
            来放大自己的能力。我正走在这条学习路径上。
          </p>
        </div>
      </div>
    </section>
  );
}
