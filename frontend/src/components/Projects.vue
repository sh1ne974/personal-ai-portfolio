<script setup lang="ts">
const projects = [
  {
    icon: "🌐", title: "个人作品集网站",
    description: "Spring Boot + Vue 3 全栈项目，集成 JWT 认证、MySQL、Redis、AI 问答助手。全程使用 Claude Code 辅助开发。",
    techStack: ["Spring Boot", "Vue 3", "MySQL", "Redis", "JWT"],
    highlight: "AI 结对编程，全栈独立开发",
  },
  {
    icon: "📝", title: "博客系统",
    description: "文章发布、分类管理、评论功能的个人博客，Spring Boot + MyBatis-Plus + MySQL，完整用户权限管理。",
    techStack: ["Spring Boot", "MySQL", "MyBatis-Plus", "RESTful API"],
    highlight: "完整 CRUD 与权限设计",
  },
  {
    icon: "🎯", title: "无人机视觉跟踪算法",
    description: "毕业设计。基于嵌入式平台的无人机视觉跟踪，引入 YOLO + BoT-SORT + 反锐化掩膜图像处理。",
    techStack: ["YOLO", "BoT-SORT", "Python", "OpenCV", "嵌入式"],
    highlight: "算法创新：反锐化掩膜 + BoT-SORT",
  },
];
</script>

<template>
  <section id="projects" class="py-32 px-8">
    <div class="max-w-6xl mx-auto">
      <div class="reveal-section text-center">
        <span class="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#3b2eff] dark:text-[#6c5ce7]">Projects</span>
        <h2 class="mt-3 text-4xl sm:text-5xl font-black tracking-[-0.02em] text-[#1a1a1a] dark:text-white">项目展示</h2>
      </div>

      <div class="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="(project, i) in projects" :key="project.title"
          class="reveal-card glass rounded-2xl p-7 group transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-[#3b2eff] dark:hover:border-[#6c5ce7] hover:shadow-lg"
          :style="{ transitionDelay: `${i * 0.1}s` }">
          <div class="text-3xl mb-5">{{ project.icon }}</div>
          <h3 class="font-bold text-lg text-[#1a1a1a] dark:text-white">{{ project.title }}</h3>
          <p class="mt-3 text-sm text-[#5a5a5a] dark:text-[#a0a0b0] leading-relaxed">{{ project.description }}</p>
          <div class="mt-5 flex flex-wrap gap-1.5">
            <span v-for="tech in project.techStack" :key="tech"
              class="px-2.5 py-0.5 rounded-md bg-[rgba(59,46,255,0.05)] dark:bg-[rgba(108,92,231,0.08)] text-[11px] font-medium text-[#3b2eff] dark:text-[#6c5ce7]">{{ tech }}</span>
          </div>
          <div class="mt-5 pt-4 border-t border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)] flex items-center gap-1.5 text-[11px] text-[#9c9c9c] dark:text-[#606070]">
            <svg class="w-3 h-3 text-[#3b2eff] dark:text-[#6c5ce7]" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
            </svg>
            {{ project.highlight }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
