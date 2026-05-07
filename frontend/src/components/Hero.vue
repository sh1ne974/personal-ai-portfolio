<template>
  <section class="relative min-h-screen flex items-center justify-center px-6 pt-14 overflow-hidden">
    <!-- Subtle gradient bg -->
    <div class="absolute inset-0 bg-gradient-to-b from-zinc-100/80 via-transparent to-transparent dark:from-zinc-900/50 dark:via-transparent pointer-events-none" />
    <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-200/30 dark:bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />

    <div class="relative text-center max-w-3xl reveal-section">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[13px] text-zinc-500 dark:text-zinc-400 mb-8">
        <span class="w-1.5 h-1.5 rounded-full bg-green-400" />
        正在寻找后端开发机会
      </div>

      <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
        姚世行
      </h1>

      <p class="mt-6 text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 font-medium">
        Java 后端开发 · AI 辅助编程实践者
      </p>
      <p class="mt-3 text-sm text-zinc-400 dark:text-zinc-500 max-w-xl mx-auto leading-relaxed">
        本科厦门理工学院 · 华南师范大学硕士在读<br/>计算机视觉与后端开发双线学习
      </p>

      <div class="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <a href="#projects"
          class="btn-apple inline-flex items-center justify-center h-12 px-8 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium text-sm hover:opacity-80 transition-all">
          查看项目
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
        <a href="#contact"
          class="btn-apple inline-flex items-center justify-center h-12 px-8 rounded-full glass text-zinc-700 dark:text-zinc-300 font-medium text-sm hover:shadow-lg transition-all">
          联系我
        </a>
      </div>
    </div>
  </section>
</template>
