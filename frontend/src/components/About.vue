<template>
  <section id="about" class="py-24 px-6">
    <div class="max-w-3xl mx-auto">
      <div class="reveal-section text-center">
        <span class="text-xs font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">About</span>
        <h2 class="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">关于我</h2>
      </div>

      <div class="mt-12 grid gap-6 sm:grid-cols-2">
        <!-- Education Card -->
        <div class="reveal-card glass rounded-2xl p-6" style="transition-delay: 0.1s">
          <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <h3 class="font-semibold text-slate-900 dark:text-white">教育背景</h3>
          <div class="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <p class="flex items-center gap-2">
              <span class="w-1 h-1 rounded-full bg-emerald-400" />
              硕士：华南师范大学
            </p>
            <p class="flex items-center gap-2">
              <span class="w-1 h-1 rounded-full bg-emerald-400" />
              本科：厦门理工学院
            </p>
          </div>
        </div>

        <!-- Tech Direction Card -->
        <div class="reveal-card glass rounded-2xl p-6" style="transition-delay: 0.2s">
          <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 class="font-semibold text-slate-900 dark:text-white">技术方向</h3>
          <div class="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <p class="flex items-center gap-2">
              <span class="w-1 h-1 rounded-full bg-emerald-400" />
              后端：Spring Boot、MyBatis-Plus、MySQL
            </p>
            <p class="flex items-center gap-2">
              <span class="w-1 h-1 rounded-full bg-emerald-400" />
              前端：Vue 3、TypeScript、Tailwind CSS
            </p>
            <p class="flex items-center gap-2">
              <span class="w-1 h-1 rounded-full bg-emerald-400" />
              AI：Claude Code 辅助开发全流程
            </p>
          </div>
        </div>
      </div>

      <div class="reveal-section mt-8 glass rounded-2xl p-6" style="transition-delay: 0.3s">
        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          我本科毕业于<span class="font-semibold text-slate-900 dark:text-white">厦门理工学院</span>，目前在<span class="font-semibold text-slate-900 dark:text-white">华南师范大学攻读硕士学位</span>。2025 年参加全国硕士研究生招生考试（22408：数学二、英语二、408 计算机专业基础综合），初试成绩 387 分。我专注后端开发，系统学习 Spring Boot、MySQL、MyBatis-Plus，同时将 AI 工具融入学习与开发流程。这个网站就是我使用 Claude Code 从零搭建的实践成果。
        </p>
      </div>
    </div>
  </section>
</template>
