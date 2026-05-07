<template>
  <section id="about" class="py-32 px-8">
    <div class="max-w-3xl mx-auto">
      <div class="reveal-section">
        <span class="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#3b2eff] dark:text-[#6c5ce7]">About</span>
        <h2 class="mt-3 text-4xl sm:text-5xl font-black tracking-[-0.02em] text-[#1a1a1a] dark:text-white">关于我</h2>
      </div>

      <div class="mt-16 grid gap-8 sm:grid-cols-2">
        <div class="reveal-card glass rounded-2xl p-8 border border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)]" style="transition-delay: 0.1s">
          <div class="w-11 h-11 rounded-xl bg-[rgba(59,46,255,0.06)] dark:bg-[rgba(108,92,231,0.1)] flex items-center justify-center mb-5">
            <svg class="w-5 h-5 text-[#3b2eff] dark:text-[#6c5ce7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <h3 class="font-bold text-lg text-[#1a1a1a] dark:text-white">教育背景</h3>
          <div class="mt-4 space-y-3 text-sm text-[#5a5a5a] dark:text-[#a0a0b0]">
            <p>硕士 · 华南师范大学</p>
            <p>本科 · 厦门理工学院</p>
          </div>
        </div>

        <div class="reveal-card glass rounded-2xl p-8 border border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)]" style="transition-delay: 0.2s">
          <div class="w-11 h-11 rounded-xl bg-[rgba(59,46,255,0.06)] dark:bg-[rgba(108,92,231,0.1)] flex items-center justify-center mb-5">
            <svg class="w-5 h-5 text-[#3b2eff] dark:text-[#6c5ce7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 class="font-bold text-lg text-[#1a1a1a] dark:text-white">技术方向</h3>
          <div class="mt-4 space-y-3 text-sm text-[#5a5a5a] dark:text-[#a0a0b0]">
            <p>后端：Spring Boot、MySQL、Redis</p>
            <p>前端：Vue 3、TypeScript、Tailwind CSS</p>
            <p>AI：Claude Code 辅助开发全流程</p>
          </div>
        </div>
      </div>

      <div class="reveal-section mt-10 text-[15px] text-[#5a5a5a] dark:text-[#a0a0b0] leading-relaxed max-w-2xl" style="transition-delay: 0.3s">
        <p>
          本科毕业于<span class="font-semibold text-[#1a1a1a] dark:text-white">厦门理工学院</span>，目前在<span class="font-semibold text-[#1a1a1a] dark:text-white">华南师范大学攻读硕士学位</span>。2025 年参加全国硕士研究生招生考试（22408：数学二、英语二、408 计算机专业基础综合），初试成绩 <span class="font-semibold text-[#1a1a1a] dark:text-white">387 分</span>。专注后端开发，同时将 AI 工具融入学习与开发流程。这个网站就是使用 Claude Code 从零搭建的实践成果。
        </p>
      </div>
    </div>
  </section>
</template>
