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
  loading.value = true;
  error.value = null;
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
  <section id="ai-chat" class="py-24 px-6">
    <div class="max-w-2xl mx-auto">
      <div class="reveal-section text-center">
        <span class="text-xs font-semibold tracking-widest uppercase text-zinc-400">AI Assistant</span>
        <h2 class="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">AI 问答助手</h2>
        <p class="mt-3 text-sm text-zinc-500">向我的 AI 助手提问，了解更多信息</p>
      </div>

      <div class="reveal-section mt-10 glass rounded-2xl overflow-hidden" style="transition-delay:0.1s">
        <div ref="chatRef" class="h-80 overflow-y-auto p-5 space-y-4">
          <div v-if="messages.length === 0" class="text-center text-zinc-400 text-sm mt-16">
            <p class="text-zinc-500 dark:text-zinc-400 font-medium mb-4">试试问我这些问题</p>
            <div class="flex flex-wrap gap-2 justify-center">
              <button v-for="q in suggestedQuestions" :key="q" @click="sendQuestion(q)" :disabled="loading"
                class="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all btn-apple disabled:opacity-50">
                {{ q }}
              </button>
            </div>
          </div>

          <div v-for="(msg, i) in messages" :key="i" :class="msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'">
            <div :class="msg.role === 'user'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-2xl rounded-br-md'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-2xl rounded-bl-md'"
              class="max-w-[82%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap">
              {{ msg.content }}
            </div>
          </div>

          <div v-if="loading" class="flex justify-start">
            <div class="bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-bl-md px-4 py-3">
              <div class="flex gap-1.5">
                <span class="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" />
                <span class="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style="animation-delay:0.15s" />
                <span class="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style="animation-delay:0.3s" />
              </div>
            </div>
          </div>

          <p v-if="error" class="text-center text-red-400 text-sm py-2">{{ error }}</p>
        </div>

        <div class="border-t border-zinc-100 dark:border-zinc-800 p-3 flex gap-2">
          <input v-model="input" @keydown.enter.prevent="sendQuestion(input)" placeholder="输入你的问题..."
            :disabled="loading"
            class="flex-1 px-4 py-2.5 rounded-xl border-0 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none disabled:opacity-50" />
          <button @click="sendQuestion(input)" :disabled="loading || !input.trim()"
            class="btn-apple px-5 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-40">
            发送
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
