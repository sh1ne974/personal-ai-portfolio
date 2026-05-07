const projects = [
  {
    title: "个人作品集网站",
    description:
      "使用 Next.js + TypeScript + Tailwind CSS 从零搭建的全栈个人主页，集成用户注册登录、留言板、联系表单等后端功能，以及 DeepSeek API 驱动的 AI 问答助手。全程使用 Claude Code 辅助开发。",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "SQLite", "JWT"],
    highlight: "AI 结对编程，全栈独立开发",
  },
  {
    title: "博客系统",
    description:
      "一个支持文章发布、分类管理、评论功能的个人博客系统，后端采用 Spring Boot + MySQL 架构，实现完整的用户权限管理和内容管理功能。",
    techStack: ["Spring Boot", "MySQL", "MyBatis-Plus", "RESTful API"],
    highlight: "完整的后端 CRUD 与权限设计",
  },
  {
    title: "无人机视觉跟踪算法研究",
    description:
      "毕业设计项目。基于嵌入式平台，研究无人机视觉跟踪算法，引入 YOLO 目标检测、BoT-SORT 多目标跟踪，以及反锐化掩膜图像处理方法提升跟踪精度与实时性。",
    techStack: ["YOLO", "BoT-SORT", "Python", "OpenCV", "嵌入式"],
    highlight: "算法创新：反锐化掩膜 + BoT-SORT",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white text-center">
          项目展示
        </h2>
        <p className="mt-2 text-center text-zinc-500 dark:text-zinc-400 text-sm">
          我的学习和实践项目
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
            >
              <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-block px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                亮点：{project.highlight}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
