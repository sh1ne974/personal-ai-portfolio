<script setup lang="ts">
const categories = [
  {
    name: "后端",
    icon: "⚙️",
    items: [
      { name: "Java", level: "熟练" },
      { name: "Spring Boot", level: "熟练" },
      { name: "MyBatis-Plus", level: "熟练" },
      { name: "MySQL", level: "熟练" },
      { name: "Redis", level: "了解" },
    ],
  },
  {
    name: "前端",
    icon: "🎨",
    items: [
      { name: "Vue 3", level: "熟练" },
      { name: "TypeScript", level: "熟练" },
      { name: "Tailwind CSS", level: "熟练" },
      { name: "HTML / CSS", level: "熟练" },
    ],
  },
  {
    name: "算法 & 工具",
    icon: "🔧",
    items: [
      { name: "YOLO", level: "研究中" },
      { name: "BoT-SORT", level: "研究中" },
      { name: "OpenCV", level: "熟悉" },
      { name: "Git", level: "熟练" },
      { name: "Claude Code", level: "熟练" },
    ],
  },
];
</script>

<template>
  <section id="skills" class="py-24 px-6 bg-slate-50 dark:bg-slate-900/20">
    <div class="max-w-5xl mx-auto">
      <div class="reveal-section text-center">
        <span class="text-xs font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">Skills</span>
        <h2 class="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">技术栈</h2>
      </div>

      <div class="mt-12 grid gap-6 sm:grid-cols-3">
        <div v-for="(cat, i) in categories" :key="cat.name"
          class="reveal-card glass rounded-2xl p-6" :style="{ transitionDelay: `${i * 0.1}s` }">
          <div class="flex items-center gap-2 mb-5">
            <span class="text-lg">{{ cat.icon }}</span>
            <h3 class="font-semibold text-sm text-slate-900 dark:text-white">{{ cat.name }}</h3>
          </div>
          <div class="space-y-3">
            <div v-for="item in cat.items" :key="item.name"
              class="flex items-center justify-between group">
              <span class="text-sm text-slate-700 dark:text-slate-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{{ item.name }}</span>
              <span class="text-[11px] text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 font-medium">{{ item.level }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
