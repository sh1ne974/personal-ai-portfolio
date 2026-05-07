<script setup lang="ts">
import { ref, inject } from "vue";

const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ close: []; "login-success": [user: any, token: string] }>();

const onLoginSuccess = inject<(user: any, token: string) => void>("onLoginSuccess")!;

const tab = ref<"login" | "register">("login");
const username = ref("");
const password = ref("");
const email = ref("");
const phone = ref("");
const error = ref<string | null>(null);
const success = ref<string | null>(null);
const submitting = ref(false);

function switchTab(t: "login" | "register") {
  tab.value = t;
  error.value = null;
  success.value = null;
}

async function handleSubmit() {
  error.value = null;
  success.value = null;
  submitting.value = true;

  try {
    if (tab.value === "login") {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.value, password: password.value }),
      });
      const data = await res.json();
      if (!res.ok) { error.value = data.error || "登录失败"; } else {
        onLoginSuccess(data.user, data.token);
        emit("close");
      }
    } else {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.value, password: password.value, email: email.value, phone: phone.value }),
      });
      const data = await res.json();
      if (!res.ok) { error.value = data.error || "注册失败"; } else {
        success.value = "注册成功，请登录";
        switchTab("login");
        password.value = "";
      }
    }
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="emit('close')" />
      <div class="relative w-full max-w-sm rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl">
        <button @click="emit('close')" class="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300" aria-label="Close">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 class="text-lg font-bold text-zinc-900 dark:text-white">{{ tab === "login" ? "登录" : "注册" }}</h3>

        <div class="flex gap-2 mt-3">
          <button @click="switchTab('login')" :class="tab === 'login' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'" class="flex-1 py-1.5 text-sm rounded-lg font-medium transition-colors">登录</button>
          <button @click="switchTab('register')" :class="tab === 'register' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'" class="flex-1 py-1.5 text-sm rounded-lg font-medium transition-colors">注册</button>
        </div>

        <form @submit.prevent="handleSubmit" class="mt-4 space-y-3">
          <input v-model="username" type="text" placeholder="用户名" required class="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600" />
          <template v-if="tab === 'register'">
            <input v-model="email" type="email" placeholder="邮箱" class="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600" />
            <input v-model="phone" type="tel" placeholder="手机号" class="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600" />
            <p class="text-xs text-zinc-400">邮箱和手机号至少填写一项</p>
          </template>
          <input v-model="password" type="password" placeholder="密码" required class="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600" />
          <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
          <p v-if="success" class="text-green-500 text-sm">{{ success }}</p>
          <button type="submit" :disabled="submitting" class="w-full py-2 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50">
            {{ submitting ? "处理中..." : tab === "login" ? "登录" : "注册" }}
          </button>
        </form>

        <p v-if="tab === 'login'" class="mt-3 text-xs text-zinc-400 dark:text-zinc-500 text-center">演示账号：admin / admin123</p>
      </div>
    </div>
  </Teleport>
</template>
