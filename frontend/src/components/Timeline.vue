<script setup lang="ts">
const milestones = [
  { period: "2024 年末", title: "转向 Java 后端", description: "系统学习 Spring Boot、MySQL、MyBatis-Plus，开始后端开发之路。", icon: "☕" },
  { period: "2025 年", title: "考研 22408 · 387 分", description: "数学二、英语二、408 计算机专业基础综合，初试 387 分，录取华南师范大学。", icon: "📚" },
  { period: "2025 年", title: "AI 辅助全流程开发", description: "将 Claude Code 融入日常开发，需求分析、编码、调试全流程 AI 驱动。", icon: "🤖" },
  { period: "至今", title: "全栈实践 & 毕业设计", description: "完成作品集网站，推进无人机视觉跟踪算法研究。", icon: "🛸" },
];
</script>

<template>
  <section id="timeline" class="py-32 px-8 bg-[#f9f8f6] dark:bg-[#0a0a12]">
    <div class="max-w-3xl mx-auto">
      <div class="reveal-section text-center">
        <span class="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#3b2eff] dark:text-[#6c5ce7]">Journey</span>
        <h2 class="mt-3 text-4xl sm:text-5xl font-black tracking-[-0.02em] text-[#1a1a1a] dark:text-white">学习经历</h2>
      </div>

      <div class="mt-16 relative">
        <div class="absolute left-6 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-[#3b2eff]/20 via-[#3b2eff]/15 to-transparent dark:from-[#6c5ce7]/20 dark:via-[#6c5ce7]/15 dark:to-transparent" />

        <div v-for="(item, index) in milestones" :key="index"
          class="reveal-section relative flex items-start mb-12 sm:mb-14"
          :class="index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'"
          :style="{ transitionDelay: `${index * 0.1}s` }">
          <div class="absolute left-6 sm:left-1/2 w-[28px] h-[28px] -translate-x-1/2 rounded-full bg-white dark:bg-[#111118] border-2 border-[#3b2eff] dark:border-[#6c5ce7] mt-1 z-10 flex items-center justify-center text-xs shadow-sm shadow-[rgba(59,46,255,0.15)] dark:shadow-[rgba(108,92,231,0.2)]">
            {{ item.icon }}
          </div>

          <div class="ml-16 sm:ml-0 sm:w-[calc(50%-2.8rem)]"
            :class="index % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:text-left'">
            <span class="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#3b2eff] dark:text-[#6c5ce7]">{{ item.period }}</span>
            <h3 class="mt-2 font-bold text-[#1a1a1a] dark:text-white">{{ item.title }}</h3>
            <p class="mt-1 text-sm text-[#5a5a5a] dark:text-[#a0a0b0] leading-relaxed">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
