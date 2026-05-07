<script setup lang="ts">
import { ref, inject } from "vue";

const openLogin = inject<() => void>("openLogin")!;
const user = inject<any>("user");
const onLogout = inject<() => void>("onLogout")!;

const menuOpen = ref(false);

const navItems = [
  { label: "关于我", href: "#about" },
  { label: "技能", href: "#skills" },
  { label: "项目", href: "#projects" },
  { label: "经历", href: "#timeline" },
  { label: "AI 问答", href: "#ai-chat" },
  { label: "留言板", href: "#comments" },
  { label: "联系", href: "#contact" },
];
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 dark:bg-zinc-950/80 dark:border-zinc-800">
    <div class="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="#" class="font-bold text-lg text-zinc-900 dark:text-white">YAO Portfolio</a>

      <ul class="hidden md:flex gap-6 text-sm font-medium items-center">
        <li v-for="item in navItems" :key="item.href">
          <a :href="item.href" class="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
            {{ item.label }}
          </a>
        </li>
        <li>
          <button v-if="user" @click="onLogout" class="text-sm text-zinc-500 hover:text-red-500 transition-colors">
            {{ user.username }} / 退出
          </button>
          <button v-else @click="openLogin" class="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
            登录
          </button>
        </li>
      </ul>

      <button class="md:hidden p-2 text-zinc-600 dark:text-zinc-400" @click="menuOpen = !menuOpen" aria-label="Menu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="menuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <ul v-if="menuOpen" class="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pb-4">
      <li v-for="item in navItems" :key="item.href">
        <a :href="item.href" class="block py-2 text-sm text-zinc-600 dark:text-zinc-400" @click="menuOpen = false">
          {{ item.label }}
        </a>
      </li>
      <li class="pt-2 border-t border-zinc-100 dark:border-zinc-800 mt-2">
        <button v-if="user" @click="onLogout" class="text-sm text-red-500">退出</button>
        <button v-else @click="menuOpen = false; openLogin()" class="text-sm text-zinc-500">登录</button>
      </li>
    </ul>
  </nav>
</template>
