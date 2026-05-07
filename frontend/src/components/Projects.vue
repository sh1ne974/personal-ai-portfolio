<script setup lang="ts">
const projects = [
  {
    icon: "🌐",
    title: "个人作品集网站",
    description: "Spring Boot + Vue 3 全栈项目，集成 JWT 认证、MySQL 数据库、Redis 缓存、AI 问答助手。全程使用 Claude Code 辅助开发。",
    techStack: ["Spring Boot", "Vue 3", "MySQL", "Redis", "JWT"],
    highlight: "AI 结对编程，全栈独立开发",
  },
  {
    icon: "📝",
    title: "博客系统",
    description: "文章发布、分类管理、评论功能的个人博客，后端 Spring Boot + MyBatis-Plus + MySQL，完整的用户权限管理。",
    techStack: ["Spring Boot", "MySQL", "MyBatis-Plus", "RESTful API"],
    highlight: "完整 CRUD 与权限设计",
  },
  {
    icon: "🎯",
    title: "无人机视觉跟踪算法",
    description: "毕业设计。基于嵌入式平台的无人机视觉跟踪，引入 YOLO + BoT-SORT + 反锐化掩膜图像处理提升精度与实时性。",
    techStack: ["YOLO", "BoT-SORT", "Python", "OpenCV", "嵌入式"],
    highlight: "算法创新：反锐化掩膜 + BoT-SORT",
  },
];
</script>

<template>
  <section id="projects" class="py-24 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="reveal-section text-center">
        <span class="text-xs font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">Projects</span>
        <h2 class="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">项目展示</h2>
      </div>

      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="(project, i) in projects" :key="project.title"
          class="reveal-card glass rounded-2xl p-6 group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-2 border-transparent hover:border-emerald-400 dark:hover:border-emerald-500"
          :style="{ transitionDelay: `${i * 0.1}s` }">
          <div class="text-3xl mb-4">{{ project.icon }}</div>
          <h3 class="font-bold text-lg text-slate-900 dark:text-white">
            {{ project.title }}
          </h3>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {{ project.description }}
          </p>
          <div class="mt-4 flex flex-wrap gap-1.5">
            <span v-for="tech in project.techStack" :key="tech"
              class="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-900/20 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
              {{ tech }}
            </span>
          </div>
          <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/50 flex items-center gap-1.5 text-[11px] text-slate-400">
            <svg class="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
            </svg>
            {{ project.highlight }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
