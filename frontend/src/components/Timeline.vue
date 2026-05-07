<script setup lang="ts">
const milestones = [
  { period: "2024 年初", title: "学习前端基础", description: "从 HTML、CSS、JavaScript 入手，了解网页的基本结构和交互原理。" },
  { period: "2024 年中", title: "学习 React 和 TypeScript", description: "深入学习 React 组件化开发思想，尝试使用 TypeScript 为项目添加类型安全。" },
  { period: "2024 年末", title: "转向后端学习", description: "开始系统学习 Java 后端开发，包括 Spring Boot、MySQL 和 MyBatis-Plus。" },
  { period: "2025 年", title: "使用 AI 工具辅助开发", description: "将 Claude Code 等 AI 工具融入日常学习和开发流程。" },
  { period: "2025 年 - 至今", title: "完成个人项目", description: "在 AI 结对编程的辅助下，完成作品集网站等多个实践项目。" },
];
</script>

<template>
  <section id="timeline" class="py-20 px-4 bg-zinc-50 dark:bg-zinc-900/50">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white text-center">学习经历</h2>
      <p class="mt-2 text-center text-zinc-500 dark:text-zinc-400 text-sm">我的技术成长路径</p>
      <div class="mt-10 relative">
        <div class="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-700" />
        <div
          v-for="(item, index) in milestones"
          :key="index"
          class="relative flex items-start mb-8 sm:mb-10"
          :class="index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'"
        >
          <div class="absolute left-4 sm:left-1/2 w-3 h-3 -translate-x-1/2 rounded-full bg-zinc-900 dark:bg-white mt-1.5 z-10 ring-4 ring-zinc-50 dark:ring-zinc-900/50" />
          <div
            class="ml-10 sm:ml-0 sm:w-[calc(50%-2rem)]"
            :class="index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8 sm:text-left'"
          >
            <span class="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{{ item.period }}</span>
            <h3 class="mt-1 font-bold text-zinc-900 dark:text-white">{{ item.title }}</h3>
            <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
