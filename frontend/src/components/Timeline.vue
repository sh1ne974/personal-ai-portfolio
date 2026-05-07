<script setup lang="ts">
const milestones = [
  { period: "2024 年初", title: "前端入门", description: "HTML、CSS、JavaScript 基础学习，了解网页交互原理。", icon: "🌱" },
  { period: "2024 年中", title: "React + TypeScript", description: "深入学习组件化开发，使用 TypeScript 增强代码安全性。", icon: "⚛️" },
  { period: "2024 年末", title: "转向 Java 后端", description: "系统学习 Spring Boot、MySQL、MyBatis-Plus，开始后端开发之路。", icon: "☕" },
  { period: "2025 年", title: "AI 辅助全流程开发", description: "将 Claude Code 融入日常开发，需求分析、编码、调试全流程 AI 驱动。", icon: "🤖" },
  { period: "至今", title: "全栈实践 & 毕业设计", description: "完成作品集网站，同时推进无人机视觉跟踪算法研究。", icon: "🚀" },
];
</script>

<template>
  <section id="timeline" class="py-24 px-6 bg-zinc-50/50 dark:bg-zinc-900/30">
    <div class="max-w-3xl mx-auto">
      <div class="reveal-section text-center">
        <span class="text-xs font-semibold tracking-widest uppercase text-zinc-400">Journey</span>
        <h2 class="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">学习经历</h2>
      </div>

      <div class="mt-14 relative">
        <div class="absolute left-5 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-zinc-200 via-zinc-200 to-transparent dark:from-zinc-700 dark:via-zinc-700 dark:to-transparent" />

        <div v-for="(item, index) in milestones" :key="index"
          class="reveal-section relative flex items-start mb-10 sm:mb-12"
          :class="index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'"
          :style="{ transitionDelay: `${index * 0.1}s` }">
          <!-- Dot -->
          <div class="absolute left-5 sm:left-1/2 w-[22px] h-[22px] -translate-x-1/2 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-600 mt-1 z-10 flex items-center justify-center text-[10px]">
            {{ item.icon }}
          </div>

          <!-- Content -->
          <div class="ml-14 sm:ml-0 sm:w-[calc(50%-2.5rem)]"
            :class="index % 2 === 0 ? 'sm:pr-10 sm:text-right' : 'sm:pl-10 sm:text-left'">
            <span class="text-[11px] font-semibold tracking-widest uppercase text-zinc-400">{{ item.period }}</span>
            <h3 class="mt-1.5 font-bold text-zinc-900 dark:text-white">{{ item.title }}</h3>
            <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
