<script setup lang="ts">
import { ref, nextTick } from "vue";
interface Message { role: "user" | "assistant"; content: string; }

const messages = ref<Message[]>([]);
const input = ref("");
const loading = ref(false);
const error = ref<string | null>(null);
const chatRef = ref<HTMLDivElement>();
const suggestedQuestions = ["你的学历背景是什么？", "你会哪些技术？", "你做过什么项目？", "你如何使用 AI 工具？"];

async function sendQuestion(question: string) {
  if (!question.trim() || loading.value) return;
  messages.value.push({ role: "user", content: question.trim() });
  input.value = "";
  loading.value = true; error.value = null;
  try {
    const res = await fetch("/api/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: question.trim() }) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "请求失败");
    messages.value.push({ role: "assistant", content: data.answer });
  } catch (e: any) { error.value = e.message || "网络错误"; } finally {
    loading.value = false;
    await nextTick();
    if (chatRef.value) chatRef.value.scrollTop = chatRef.value.scrollHeight;
  }
}
</script>

<template>
  <section id="ai-chat" class="py-32 px-8">
    <div class="max-w-2xl mx-auto">
      <div class="reveal-section text-center">
        <span class="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#3b2eff] dark:text-[#6c5ce7]">AI Assistant</span>
        <h2 class="mt-3 text-4xl sm:text-5xl font-black tracking-[-0.02em] text-[#1a1a1a] dark:text-white">AI 问答助手</h2>
        <p class="mt-3 text-sm text-[#5a5a5a] dark:text-[#a0a0b0]">向我的 AI 助手提问，了解更多信息</p>
      </div>

      <div class="reveal-section mt-14 border border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden bg-white dark:bg-[#111118]" style="transition-delay:0.1s">
        <div ref="chatRef" class="h-80 overflow-y-auto p-5 space-y-4">
          <div v-if="messages.length === 0" class="text-center mt-16">
            <p class="text-sm text-[#5a5a5a] dark:text-[#a0a0b0] font-medium mb-5">试试问我这些问题</p>
            <div class="flex flex-wrap gap-2 justify-center">
              <button v-for="q in suggestedQuestions" :key="q" @click="sendQuestion(q)" :disabled="loading"
                class="px-4 py-2 rounded-full border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] text-xs text-[#5a5a5a] dark:text-[#a0a0b0] hover:border-[#3b2eff] hover:text-[#3b2eff] dark:hover:border-[#6c5ce7] dark:hover:text-[#6c5ce7] transition-all disabled:opacity-40"> {{ q }} </button>
            </div>
          </div>

          <div v-for="(msg, i) in messages" :key="i" :class="msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'">
            <div :class="msg.role === 'user' ? 'bg-[#3b2eff] text-white dark:bg-[#6c5ce7] rounded-2xl rounded-br-md' : 'bg-[#f5f4f2] dark:bg-[#1a1a24] text-[#1a1a1a] dark:text-[#e0e0e0] rounded-2xl rounded-bl-md'"
              class="max-w-[82%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap">{{ msg.content }}</div>
          </div>

          <div v-if="loading" class="flex justify-start">
            <div class="bg-[#f5f4f2] dark:bg-[#1a1a24] rounded-2xl rounded-bl-md px-4 py-3">
              <div class="flex gap-1.5"><span class="w-2 h-2 rounded-full bg-[#9c9c9c] animate-bounce" /><span class="w-2 h-2 rounded-full bg-[#9c9c9c] animate-bounce" style="animation-delay:0.15s" /><span class="w-2 h-2 rounded-full bg-[#9c9c9c] animate-bounce" style="animation-delay:0.3s" /></div>
            </div>
          </div>
          <p v-if="error" class="text-center text-red-400 text-sm py-2">{{ error }}</p>
        </div>
        <div class="border-t border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)] p-3 flex gap-2">
          <input v-model="input" @keydown.enter.prevent="sendQuestion(input)" placeholder="输入你的问题..." :disabled="loading"
            class="flex-1 px-4 py-2.5 border-0 bg-transparent text-sm text-[#1a1a1a] dark:text-white placeholder:text-[#9c9c9c] dark:placeholder:text-[#606070] focus:outline-none disabled:opacity-40" />
          <button @click="sendQuestion(input)" :disabled="loading || !input.trim()"
            class="btn-accent px-5 py-2.5 rounded-xl bg-[#3b2eff] dark:bg-[#6c5ce7] text-white text-sm font-semibold disabled:opacity-30">
            发送
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
