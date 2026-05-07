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
      if (!res.ok) { error.value = data.error || "登录失败"; } else { emit("login-success", data.user, data.token); emit("close"); }
    } else {
      const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: username.value, password: password.value, email: email.value, phone: phone.value }) });
      const data = await res.json();
      if (!res.ok) { error.value = data.error || "注册失败"; } else { successMsg.value = "注册成功！请切换到登录标签"; tab.value = "login"; password.value = ""; }
    }
  } finally { submitting.value = false; }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/20 backdrop-blur-sm" @click="emit('close')" />
        <div class="relative w-full max-w-sm bg-white dark:bg-[#111118] rounded-2xl p-8 shadow-2xl border border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)]">
          <button @click="emit('close')" class="absolute top-5 right-5 text-[#9c9c9c] dark:text-[#606070] hover:text-[#1a1a1a] dark:hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h3 class="text-xl font-black tracking-[-0.02em] text-[#1a1a1a] dark:text-white">{{ tab === "login" ? "登录" : "注册" }}</h3>

          <div class="flex gap-2 mt-5">
            <button @click="tab = 'login'" :class="tab === 'login' ? 'bg-[#3b2eff] dark:bg-[#6c5ce7] text-white' : 'text-[#5a5a5a] dark:text-[#a0a0b0] bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)]'" class="flex-1 py-2.5 text-sm rounded-xl font-semibold transition-all">登录</button>
            <button @click="tab = 'register'" :class="tab === 'register' ? 'bg-[#3b2eff] dark:bg-[#6c5ce7] text-white' : 'text-[#5a5a5a] dark:text-[#a0a0b0] bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)]'" class="flex-1 py-2.5 text-sm rounded-xl font-semibold transition-all">注册</button>
          </div>

          <form @submit.prevent="handleSubmit" class="mt-5 space-y-3">
            <input v-model="username" type="text" placeholder="用户名" required class="w-full px-4 py-3 rounded-xl border border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] bg-transparent text-sm text-[#1a1a1a] dark:text-white placeholder:text-[#9c9c9c] dark:placeholder:text-[#606070] focus:outline-none focus:ring-2 focus:ring-[#3b2eff]/20" />
            <template v-if="tab === 'register'">
              <input v-model="email" type="email" placeholder="邮箱" class="w-full px-4 py-3 rounded-xl border border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] bg-transparent text-sm text-[#1a1a1a] dark:text-white placeholder:text-[#9c9c9c] dark:placeholder:text-[#606070] focus:outline-none focus:ring-2 focus:ring-[#3b2eff]/20" />
              <input v-model="phone" type="tel" placeholder="手机号" class="w-full px-4 py-3 rounded-xl border border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] bg-transparent text-sm text-[#1a1a1a] dark:text-white placeholder:text-[#9c9c9c] dark:placeholder:text-[#606070] focus:outline-none focus:ring-2 focus:ring-[#3b2eff]/20" />
              <p class="text-xs text-[#9c9c9c] dark:text-[#606070]">邮箱和手机号至少填写一项</p>
            </template>
            <input v-model="password" type="password" placeholder="密码" required class="w-full px-4 py-3 rounded-xl border border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] bg-transparent text-sm text-[#1a1a1a] dark:text-white placeholder:text-[#9c9c9c] dark:placeholder:text-[#606070] focus:outline-none focus:ring-2 focus:ring-[#3b2eff]/20" />
            <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
            <p v-if="successMsg" class="text-emerald-500 text-sm">{{ successMsg }}</p>
            <button type="submit" :disabled="submitting" class="btn-accent w-full py-3 rounded-xl bg-[#3b2eff] dark:bg-[#6c5ce7] text-white font-semibold text-sm disabled:opacity-30">
              {{ submitting ? "处理中..." : tab === "login" ? "登录" : "注册" }}
            </button>
          </form>
          <p v-if="tab === 'login'" class="mt-4 text-xs text-[#9c9c9c] dark:text-[#606070] text-center">演示账号：admin / admin123</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.25s ease; }
.modal-enter-active > div:last-child, .modal-leave-active > div:last-child { transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from > div:last-child { transform: scale(0.96) translateY(12px); opacity: 0; }
.modal-leave-to > div:last-child { transform: scale(0.96) translateY(12px); opacity: 0; }
</style>
