const skills = [
  { name: "Java", category: "语言" },
  { name: "Spring Boot", category: "框架" },
  { name: "MyBatis-Plus", category: "ORM" },
  { name: "MySQL", category: "数据库" },
  { name: "RESTful API", category: "架构" },
  { name: "Git", category: "工具" },
  { name: "HTML / CSS", category: "前端" },
  { name: "JavaScript / TypeScript", category: "语言" },
  { name: "AI 辅助开发", category: "方法" },
  { name: "Claude Code", category: "AI 工具" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white text-center">
          技术栈
        </h2>
        <p className="mt-2 text-center text-zinc-500 dark:text-zinc-400 text-sm">
          我在学习中使用和掌握的技术
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {skills.map((skill) => (
            <span
              key={skill.name}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
            >
              {skill.name}
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                {skill.category}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
