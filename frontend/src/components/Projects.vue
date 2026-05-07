<script setup lang="ts">
const projects = [
  {
    title: "个人作品集网站",
    description: "Spring Boot + Vue 3 全栈项目，集成 JWT 认证、MySQL 数据库、Redis 缓存，实现用户注册登录、留言板、联系表单、AI 问答助手等功能。全程使用 Claude Code 辅助开发。",
    techStack: ["Spring Boot", "Vue 3", "MySQL", "Redis", "JWT"],
    highlight: "AI 结对编程，全栈独立开发",
  },
  {
    title: "博客系统",
    description: "支持文章发布、分类管理、评论功能的个人博客系统，后端采用 Spring Boot + MyBatis-Plus + MySQL 架构，实现完整的用户权限管理和内容管理功能。",
    techStack: ["Spring Boot", "MySQL", "MyBatis-Plus", "RESTful API"],
    highlight: "完整的后端 CRUD 与权限设计",
  },
  {
    title: "无人机视觉跟踪算法研究",
    description: "毕业设计项目。基于嵌入式平台研究无人机视觉跟踪算法，引入 YOLO 目标检测、BoT-SORT 多目标跟踪及反锐化掩膜图像处理方法，提升跟踪精度与实时性。",
    techStack: ["YOLO", "BoT-SORT", "Python", "OpenCV", "嵌入式"],
    highlight: "算法创新：反锐化掩膜 + BoT-SORT",
  },
];
</script>

<template>
  <section id="projects" class="py-20 px-4">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white text-center">项目展示</h2>
      <p class="mt-2 text-center text-zinc-500 dark:text-zinc-400 text-sm">我的学习和实践项目</p>
      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="project in projects"
          :key="project.title"
          class="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
        >
          <h3 class="font-bold text-lg text-zinc-900 dark:text-white">{{ project.title }}</h3>
          <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{{ project.description }}</p>
          <div class="mt-3 flex flex-wrap gap-1.5">
            <span
              v-for="tech in project.techStack"
              :key="tech"
              class="inline-block px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-400"
            >
              {{ tech }}
            </span>
          </div>
          <p class="mt-3 text-xs font-medium text-zinc-400 dark:text-zinc-500">亮点：{{ project.highlight }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
