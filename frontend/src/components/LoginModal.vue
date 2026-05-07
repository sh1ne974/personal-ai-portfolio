<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ close: []; "login-success": [user: any, token: string] }>();

const tab = ref<"login" | "register">("login");
const username = ref(""); const password = ref(""); const email = ref(""); const phone = ref("");
const error = ref<string | null>(null); const successMsg = ref<string | null>(null); const submitting = ref(false);

async function handleSubmit() {
  error.value = null; successMsg.value = null; submitting.value = true;
  try {
    if (tab.value === "login") {
      const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: username.value, password: password.value }) });
      const data = await res.json();
      if (!res.ok) { error.value = data.error || "登录失败"; } else {
        emit("login-success", data.user, data.token);
        emit("close");
      }
    } else {
      const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: username.value, password: password.value, email: email.value, phone: phone.value }) });
      const data = await res.json();
      if (!res.ok) { error.value = data.error || "注册失败"; } else {
        successMsg.value = "注册成功！请切换到登录标签";
        tab.value = "login"; password.value = "";
      }
    }
  } finally { submitting.value = false; }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="emit('close')" />
        <div class="relative w-full max-w-sm glass rounded-2xl p-7 shadow-2xl">
          <button @click="emit('close')" class="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h3 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">{{ tab === "login" ? "登录" : "注册" }}</h3>

          <div class="flex gap-2 mt-4">
            <button @click="tab = 'login'" :class="tab === 'login' ? 'bg-emerald-600 text-white dark:bg-emerald-500' : 'text-zinc-400 hover:text-zinc-600'" class="flex-1 py-2 text-sm rounded-lg font-medium transition-all btn-apple">登录</button>
            <button @click="tab = 'register'" :class="tab === 'register' ? 'bg-emerald-600 text-white dark:bg-emerald-500' : 'text-zinc-400 hover:text-zinc-600'" class="flex-1 py-2 text-sm rounded-lg font-medium transition-all btn-apple">注册</button>
          </div>

          <form @submit.prevent="handleSubmit" class="mt-4 space-y-3">
            <input v-model="username" type="text" placeholder="用户名" required class="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-700" />
            <template v-if="tab === 'register'">
              <input v-model="email" type="email" placeholder="邮箱" class="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-700" />
              <input v-model="phone" type="tel" placeholder="手机号" class="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-700" />
              <p class="text-xs text-zinc-400">邮箱和手机号至少填写一项</p>
            </template>
            <input v-model="password" type="password" placeholder="密码" required class="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-700" />
            <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
            <p v-if="successMsg" class="text-green-500 text-sm">{{ successMsg }}</p>
            <button type="submit" :disabled="submitting" class="btn-apple w-full py-2.5 rounded-xl bg-emerald-600 text-white dark:bg-emerald-500 font-medium text-sm hover:opacity-80 transition-all disabled:opacity-40">
              {{ submitting ? "处理中..." : tab === "login" ? "登录" : "注册" }}
            </button>
          </form>

          <p v-if="tab === 'login'" class="mt-4 text-xs text-zinc-400 text-center">演示账号：admin / admin123</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.25s ease; }
.modal-enter-active > div:last-child, .modal-leave-active > div:last-child { transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from > div:last-child { transform: scale(0.95) translateY(10px); opacity: 0; }
.modal-leave-to > div:last-child { transform: scale(0.95) translateY(10px); opacity: 0; }
</style>
