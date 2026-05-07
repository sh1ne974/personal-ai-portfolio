<script setup lang="ts">
import { ref } from "vue";
const name = ref(""); const email = ref(""); const phone = ref(""); const message = ref("");
const submitting = ref(false); const feedback = ref<{ type: "success" | "error"; text: string } | null>(null);
async function handleSubmit() {
  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) return;
  submitting.value = true; feedback.value = null;
  try {
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name.value, email: email.value, phone: phone.value, message: message.value }) });
    const data = await res.json();
    if (res.ok) { feedback.value = { type: "success", text: data.message }; name.value = ""; email.value = ""; phone.value = ""; message.value = ""; }
    else { feedback.value = { type: "error", text: data.error || "提交失败" }; }
  } catch { feedback.value = { type: "error", text: "网络错误" }; } finally { submitting.value = false; }
}
</script>

<template>
  <section id="contact" class="py-32 px-8">
    <div class="max-w-2xl mx-auto">
      <div class="reveal-section text-center">
        <span class="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#3b2eff] dark:text-[#6c5ce7]">Contact</span>
        <h2 class="mt-3 text-4xl sm:text-5xl font-black tracking-[-0.02em] text-[#1a1a1a] dark:text-white">联系我</h2>
        <p class="mt-3 text-sm text-[#5a5a5a] dark:text-[#a0a0b0]">欢迎技术交流与合作</p>
      </div>

      <div class="reveal-section mt-8 flex justify-center" style="transition-delay:0.1s">
        <a href="mailto:shihang_yao@163.com" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] text-sm text-[#5a5a5a] dark:text-[#a0a0b0] hover:border-[#3b2eff] hover:text-[#3b2eff] dark:hover:border-[#6c5ce7] dark:hover:text-[#6c5ce7] transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          shihang_yao@163.com
        </a>
      </div>

      <form @submit.prevent="handleSubmit" class="reveal-section mt-10 space-y-4" style="transition-delay:0.15s">
        <div class="grid gap-4 sm:grid-cols-2">
          <input v-model="name" type="text" placeholder="姓名" required class="px-4 py-3 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111118] text-sm text-[#1a1a1a] dark:text-white placeholder:text-[#9c9c9c] focus:outline-none focus:border-[#3b2eff] dark:focus:border-[#6c5ce7] transition-colors" />
          <input v-model="email" type="email" placeholder="邮箱" required class="px-4 py-3 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111118] text-sm text-[#1a1a1a] dark:text-white placeholder:text-[#9c9c9c] focus:outline-none focus:border-[#3b2eff] dark:focus:border-[#6c5ce7] transition-colors" />
        </div>
        <input v-model="phone" type="tel" placeholder="手机号（选填）" class="w-full px-4 py-3 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111118] text-sm text-[#1a1a1a] dark:text-white placeholder:text-[#9c9c9c] focus:outline-none focus:border-[#3b2eff] dark:focus:border-[#6c5ce7] transition-colors" />
        <textarea v-model="message" placeholder="写下你想说的话..." required maxlength="1000" rows="4" class="w-full px-4 py-3 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111118] text-sm text-[#1a1a1a] dark:text-white placeholder:text-[#9c9c9c] focus:outline-none focus:border-[#3b2eff] dark:focus:border-[#6c5ce7] resize-none transition-colors" />
        <p v-if="feedback" :class="feedback.type === 'success' ? 'text-emerald-500' : 'text-red-400'" class="text-sm">{{ feedback.text }}</p>
        <button type="submit" :disabled="submitting || !name.trim() || !email.trim() || !message.trim()"
          class="btn-accent w-full py-3.5 rounded-xl bg-[#3b2eff] dark:bg-[#6c5ce7] text-white font-semibold text-sm disabled:opacity-30">发送消息</button>
      </form>
    </div>
  </section>
</template>
