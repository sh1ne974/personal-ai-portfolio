<template>
  <section class="relative min-h-screen flex items-center justify-center px-6 pt-14 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-emerald-50/40 via-transparent to-transparent dark:from-emerald-950/20 dark:via-transparent pointer-events-none" />
    <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-100/40 dark:bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />

    <div class="relative text-center max-w-3xl reveal-section">
      <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
        姚世行
      </h1>

      <p class="mt-6 text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-medium">
        Java 后端开发 · AI 辅助编程
      </p>
      <p class="mt-3 text-sm text-slate-400 dark:text-slate-500 max-w-xl mx-auto leading-relaxed">
        本科厦门理工学院 · 华南师范大学硕士在读
      </p>

      <div class="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <a href="#projects"
          class="btn-apple inline-flex items-center justify-center h-12 px-8 rounded-full bg-emerald-600 text-white dark:bg-emerald-500 font-medium text-sm hover:bg-emerald-700 dark:hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20">
          查看项目
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
        <a href="#contact"
          class="btn-apple inline-flex items-center justify-center h-12 px-8 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium text-sm hover:border-emerald-300 dark:hover:border-emerald-600 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all">
          联系我
        </a>
      </div>
    </div>
  </section>
</template>
