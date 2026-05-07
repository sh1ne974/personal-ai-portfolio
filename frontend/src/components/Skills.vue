<script setup lang="ts">
const categories = [
  {
    name: "后端",
    icon: "⚙️",
    items: [
      { name: "Java", level: "学习使用中" },
      { name: "Spring Boot", level: "熟练" },
      { name: "MyBatis-Plus", level: "学习使用中" },
      { name: "MySQL", level: "熟练" },
      { name: "Redis", level: "了解" },
    ],
  },
  {
    name: "前端",
    icon: "🎨",
    items: [
      { name: "Vue 3", level: "学习使用中" },
      { name: "TypeScript", level: "学习使用中" },
      { name: "Tailwind CSS", level: "学习使用中" },
      { name: "HTML/CSS", level: "熟练" },
    ],
  },
  {
    name: "算法 & 工具",
    icon: "🔧",
    items: [
      { name: "YOLO", level: "研究中" },
      { name: "BoT-SORT", level: "研究中" },
      { name: "OpenCV", level: "学习使用中" },
      { name: "Git", level: "熟练" },
      { name: "Claude Code", level: "熟练" },
    ],
  },
];
</script>

<template>
  <section id="skills" class="py-24 px-6 bg-zinc-50/50 dark:bg-zinc-900/30">
    <div class="max-w-5xl mx-auto">
      <div class="reveal-section text-center">
        <span class="text-xs font-semibold tracking-widest uppercase text-zinc-400">Skills</span>
        <h2 class="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">技术栈</h2>
      </div>

      <div class="mt-12 grid gap-6 sm:grid-cols-3">
        <div v-for="(cat, i) in categories" :key="cat.name"
          class="reveal-card glass rounded-2xl p-6" :style="{ transitionDelay: `${i * 0.1}s` }">
          <div class="flex items-center gap-2 mb-5">
            <span class="text-lg">{{ cat.icon }}</span>
            <h3 class="font-semibold text-sm text-zinc-900 dark:text-white">{{ cat.name }}</h3>
          </div>
          <div class="space-y-3">
            <div v-for="item in cat.items" :key="item.name"
              class="flex items-center justify-between group">
              <span class="text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{{ item.name }}</span>
              <span class="text-[11px] text-zinc-400 dark:text-zinc-500 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800/50">{{ item.level }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
