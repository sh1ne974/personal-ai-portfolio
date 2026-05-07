<script setup lang="ts">
const milestones = [
  { period: "2024 年末", title: "转向 Java 后端", description: "系统学习 Spring Boot、MySQL、MyBatis-Plus，开始后端开发之路。", icon: "☕" },
  { period: "2025 年", title: "考研 22408 · 387 分", description: "参加全国硕士研究生招生考试，数学二、英语二、408 计算机专业基础综合，初试总分 387 分，录取华南师范大学。", icon: "📚" },
  { period: "2025 年", title: "AI 辅助全流程开发", description: "将 Claude Code 融入日常开发，需求分析、编码、调试全流程 AI 驱动。", icon: "🤖" },
  { period: "至今", title: "全栈实践 & 毕业设计", description: "完成作品集网站，同时推进无人机视觉跟踪算法研究。", icon: "🛸" },
];
</script>

<template>
  <section id="timeline" class="py-24 px-6 bg-slate-50 dark:bg-slate-900/20">
    <div class="max-w-3xl mx-auto">
      <div class="reveal-section text-center">
        <span class="text-xs font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">Journey</span>
        <h2 class="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">学习经历</h2>
      </div>

      <div class="mt-14 relative">
        <div class="absolute left-5 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-emerald-200 via-emerald-200 to-transparent dark:from-emerald-800 dark:via-emerald-800 dark:to-transparent" />

        <div v-for="(item, index) in milestones" :key="index"
          class="reveal-section relative flex items-start mb-10 sm:mb-12"
          :class="index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'"
          :style="{ transitionDelay: `${index * 0.1}s` }">
          <div class="absolute left-5 sm:left-1/2 w-[26px] h-[26px] -translate-x-1/2 rounded-full bg-white dark:bg-slate-900 border-2 border-emerald-400 dark:border-emerald-500 mt-1 z-10 flex items-center justify-center text-xs shadow-sm shadow-emerald-200 dark:shadow-emerald-900/50">
            {{ item.icon }}
          </div>

          <div class="ml-14 sm:ml-0 sm:w-[calc(50%-2.5rem)]"
            :class="index % 2 === 0 ? 'sm:pr-10 sm:text-right' : 'sm:pl-10 sm:text-left'">
            <span class="text-[11px] font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">{{ item.period }}</span>
            <h3 class="mt-1.5 font-bold text-slate-900 dark:text-white">{{ item.title }}</h3>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
