<script setup lang="ts">
import { ref } from "vue";

const name = ref(""); const email = ref(""); const phone = ref(""); const message = ref("");
const submitting = ref(false);
const feedback = ref<{ type: "success" | "error"; text: string } | null>(null);

async function handleSubmit() {
  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) return;
  submitting.value = true; feedback.value = null;
  try {
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name.value, email: email.value, phone: phone.value, message: message.value }) });
    const data = await res.json();
    if (res.ok) {
      feedback.value = { type: "success", text: data.message };
      name.value = ""; email.value = ""; phone.value = ""; message.value = "";
    } else { feedback.value = { type: "error", text: data.error || "提交失败" }; }
  } catch { feedback.value = { type: "error", text: "网络错误，请重试" }; } finally { submitting.value = false; }
}
</script>

<template>
  <section id="contact" class="py-24 px-6">
    <div class="max-w-2xl mx-auto">
      <div class="reveal-section text-center">
        <span class="text-xs font-semibold tracking-widest uppercase text-zinc-400">Contact</span>
        <h2 class="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">联系我</h2>
        <p class="mt-3 text-sm text-zinc-500">欢迎技术交流与合作</p>
      </div>

      <div class="reveal-section mt-6 flex justify-center" style="transition-delay:0.1s">
        <a href="mailto:shihang_yao@163.com" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all btn-apple">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          shihang_yao@163.com
        </a>
      </div>

      <form @submit.prevent="handleSubmit" class="reveal-section mt-8 space-y-3" style="transition-delay:0.15s">
        <div class="grid gap-3 sm:grid-cols-2">
          <input v-model="name" type="text" placeholder="姓名" required class="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-700" />
          <input v-model="email" type="email" placeholder="邮箱" required class="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-700" />
        </div>
        <input v-model="phone" type="tel" placeholder="手机号（选填）" class="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-700" />
        <textarea v-model="message" placeholder="写下你想说的话..." required maxlength="1000" rows="4" class="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-700 resize-none" />
        <p v-if="feedback" :class="feedback.type === 'success' ? 'text-green-500' : 'text-red-400'" class="text-sm">{{ feedback.text }}</p>
        <button type="submit" :disabled="submitting || !name.trim() || !email.trim() || !message.trim()"
          class="btn-apple w-full py-3 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium text-sm hover:opacity-80 disabled:opacity-40 transition-all">
          {{ submitting ? "发送中..." : "发送消息" }}
        </button>
      </form>
    </div>
  </section>
</template>
