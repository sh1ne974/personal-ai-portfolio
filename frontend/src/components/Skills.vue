<script setup lang="ts">
const categories = [
  {
    name: "后端", icon: "⚙️",
    items: [
      { name: "Java", level: "熟练" }, { name: "Spring Boot", level: "熟练" },
      { name: "MyBatis-Plus", level: "熟练" }, { name: "MySQL", level: "熟练" },
      { name: "Redis", level: "了解" },
    ],
  },
  {
    name: "前端", icon: "🎨",
    items: [
      { name: "Vue 3", level: "熟练" }, { name: "TypeScript", level: "熟练" },
      { name: "Tailwind CSS", level: "熟练" }, { name: "HTML / CSS", level: "熟练" },
    ],
  },
  {
    name: "算法 & 工具", icon: "🔧",
    items: [
      { name: "YOLO", level: "研究中" }, { name: "BoT-SORT", level: "研究中" },
      { name: "OpenCV", level: "熟悉" }, { name: "Git", level: "熟练" },
      { name: "Claude Code", level: "熟练" },
    ],
  },
];
</script>

<template>
  <section id="skills" class="py-32 px-8 bg-[#f9f8f6] dark:bg-[#0a0a12]">
    <div class="max-w-5xl mx-auto">
      <div class="reveal-section text-center">
        <span class="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#3b2eff] dark:text-[#6c5ce7]">Skills</span>
        <h2 class="mt-3 text-4xl sm:text-5xl font-black tracking-[-0.02em] text-[#1a1a1a] dark:text-white">技术栈</h2>
      </div>

      <div class="mt-16 grid gap-6 sm:grid-cols-3">
        <div v-for="(cat, i) in categories" :key="cat.name"
          class="reveal-card bg-white dark:bg-[#111118] rounded-2xl p-7 border border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)]"
          :style="{ transitionDelay: `${i * 0.1}s` }">
          <div class="flex items-center gap-2 mb-6">
            <span class="text-lg">{{ cat.icon }}</span>
            <h3 class="font-bold text-sm text-[#1a1a1a] dark:text-white">{{ cat.name }}</h3>
          </div>
          <div class="space-y-3.5">
            <div v-for="item in cat.items" :key="item.name" class="flex items-center justify-between">
              <span class="text-sm text-[#5a5a5a] dark:text-[#a0a0b0]">{{ item.name }}</span>
              <span class="text-[11px] text-[#9c9c9c] dark:text-[#606070] font-medium">{{ item.level }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
