<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
const email = ref("");
const phone = ref("");
const message = ref("");
const submitting = ref(false);
const feedback = ref<{ type: "success" | "error"; text: string } | null>(null);

async function handleSubmit() {
  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) return;
  submitting.value = true;
  feedback.value = null;
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.value, email: email.value, phone: phone.value, message: message.value }),
    });
    const data = await res.json();
    if (res.ok) {
      feedback.value = { type: "success", text: data.message };
      name.value = ""; email.value = ""; phone.value = ""; message.value = "";
    } else {
      feedback.value = { type: "error", text: data.error || "提交失败" };
    }
  } catch {
    feedback.value = { type: "error", text: "网络错误，请重试" };
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <section id="contact" class="py-20 px-4 bg-zinc-50 dark:bg-zinc-900/50">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white text-center">联系我</h2>
      <p class="mt-2 text-center text-zinc-500 dark:text-zinc-400 text-sm">欢迎交流技术学习和 AI 辅助开发的经验</p>

      <div class="mt-6 flex justify-center">
        <div class="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <a href="mailto:shihang_yao@163.com" class="hover:underline">shihang_yao@163.com</a>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="mt-8 space-y-3">
        <div class="grid gap-3 sm:grid-cols-2">
          <input v-model="name" type="text" placeholder="你的姓名" required class="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600" />
          <input v-model="email" type="email" placeholder="你的邮箱" required class="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600" />
        </div>
        <input v-model="phone" type="tel" placeholder="手机号（选填）" class="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600" />
        <textarea v-model="message" placeholder="写下你想说的话..." required maxlength="1000" rows="4" class="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600 resize-none" />
        <p v-if="feedback" :class="feedback.type === 'success' ? 'text-green-500' : 'text-red-500'" class="text-sm">{{ feedback.text }}</p>
        <button type="submit" :disabled="submitting || !name.trim() || !email.trim() || !message.trim()" class="w-full py-2.5 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50">
          {{ submitting ? "发送中..." : "发送消息" }}
        </button>
      </form>
    </div>
  </section>
</template>
