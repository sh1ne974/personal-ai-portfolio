<script setup lang="ts">
import { ref, inject } from "vue";

const openLogin = inject<() => void>("openLogin")!;
const user = inject<any>("user");
const isDark = inject<any>("isDark");
const onLogout = inject<() => void>("onLogout")!;

const menuOpen = ref(false);

const navItems = [
  { label: "关于", href: "#about" },
  { label: "技能", href: "#skills" },
  { label: "项目", href: "#projects" },
  { label: "经历", href: "#timeline" },
  { label: "AI 问答", href: "#ai-chat" },
  { label: "留言板", href: "#comments" },
  { label: "联系", href: "#contact" },
];
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 glass border-b border-zinc-200/40 dark:border-zinc-800/40">
    <div class="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
      <a href="#" class="font-bold text-lg tracking-tight text-zinc-900 dark:text-white">
        YAO<span class="text-zinc-400">.</span>
      </a>

      <div class="hidden md:flex items-center gap-1">
        <a v-for="item in navItems" :key="item.href" :href="item.href"
          class="px-3 py-1.5 text-[13px] font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all duration-200">
          {{ item.label }}
        </a>
        <div class="w-px h-4 bg-zinc-200 dark:bg-zinc-700 mx-1" />
        <button @click="isDark = !isDark" class="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors rounded-md"
          :title="isDark ? '切换亮色模式' : '切换暗色模式'">
          <svg v-if="isDark" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
        <button v-if="user" @click="onLogout"
          class="ml-1 px-3 py-1.5 text-[13px] font-medium text-zinc-500 hover:text-red-500 transition-colors">
          {{ user.username }}
        </button>
        <button v-else @click="openLogin"
          class="ml-1 px-4 py-1.5 text-[13px] font-medium bg-emerald-600 text-white dark:bg-emerald-500 rounded-full hover:opacity-80 transition-opacity btn-apple">
          登录
        </button>
      </div>

      <button class="md:hidden p-2 text-zinc-500" @click="menuOpen = !menuOpen" aria-label="Menu">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="menuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <div v-if="menuOpen" class="md:hidden glass border-t border-zinc-200/40 dark:border-zinc-800/40 px-6 pb-4">
      <a v-for="item in navItems" :key="item.href" :href="item.href" @click="menuOpen = false"
        class="block py-2.5 text-sm text-zinc-600 dark:text-zinc-400">{{ item.label }}</a>
      <div class="flex items-center gap-3 pt-2 border-t border-zinc-200/40 dark:border-zinc-800/40 mt-2">
        <button @click="isDark = !isDark" class="text-sm text-zinc-500">{{ isDark ? '☀️ 亮色' : '🌙 暗色' }}</button>
        <button v-if="user" @click="onLogout" class="text-sm text-red-500">退出</button>
        <button v-else @click="menuOpen = false; openLogin()" class="text-sm text-zinc-900 dark:text-white font-medium">登录</button>
      </div>
    </div>
  </nav>
</template>
