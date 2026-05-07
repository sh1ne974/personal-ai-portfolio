<script setup lang="ts">
import { ref, nextTick } from "vue";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const messages = ref<Message[]>([]);
const input = ref("");
const loading = ref(false);
const error = ref<string | null>(null);
const chatRef = ref<HTMLDivElement>();

const suggestedQuestions = ["你会哪些技术？", "你做过什么项目？", "你如何使用 AI 工具写代码？"];

async function sendQuestion(question: string) {
  if (!question.trim() || loading.value) return;
  messages.value.push({ role: "user", content: question.trim() });
  input.value = "";
  loading.value = true;
  error.value = null;

  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: question.trim() }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "请求失败");
    messages.value.push({ role: "assistant", content: data.answer });
  } catch (e: any) {
    error.value = e.message || "网络错误";
  } finally {
    loading.value = false;
    await nextTick();
    if (chatRef.value) chatRef.value.scrollTop = chatRef.value.scrollHeight;
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendQuestion(input.value);
  }
}
</script>

<template>
  <section id="ai-chat" class="py-20 px-4">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white text-center">AI 问答助手</h2>
      <p class="mt-2 text-center text-zinc-500 dark:text-zinc-400 text-sm">向我的 AI 助手提问，了解我的技术背景和项目经验</p>

      <div class="mt-8 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div ref="chatRef" class="h-80 overflow-y-auto p-4 space-y-4 bg-zinc-50 dark:bg-zinc-900/50">
          <div v-if="messages.length === 0" class="text-center text-zinc-400 dark:text-zinc-500 text-sm mt-20">
            <p>试试问我这些问题：</p>
            <div class="mt-3 flex flex-wrap gap-2 justify-center">
              <button
                v-for="q in suggestedQuestions"
                :key="q"
                @click="sendQuestion(q)"
                :disabled="loading"
                class="px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
              >
                {{ q }}
              </button>
            </div>
          </div>

          <div
            v-for="(msg, i) in messages"
            :key="i"
            :class="msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'"
          >
            <div
              :class="msg.role === 'user'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'"
              class="max-w-[80%] rounded-lg px-4 py-2 text-sm leading-relaxed whitespace-pre-wrap"
            >
              {{ msg.content }}
            </div>
          </div>

          <div v-if="loading" class="flex justify-start">
            <div class="max-w-[80%] rounded-lg px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <div class="flex gap-1.5">
                <span class="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" />
                <span class="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style="animation-delay:0.15s" />
                <span class="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style="animation-delay:0.3s" />
              </div>
            </div>
          </div>

          <p v-if="error" class="text-center text-red-500 text-sm py-2">{{ error }}</p>
        </div>

        <div class="border-t border-zinc-200 dark:border-zinc-800 p-3 flex gap-2 bg-white dark:bg-zinc-950">
          <input
            v-model="input"
            @keydown="onKeydown"
            placeholder="输入你的问题..."
            :disabled="loading"
            class="flex-1 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600 disabled:opacity-50"
          />
          <button
            @click="sendQuestion(input)"
            :disabled="loading || !input.trim()"
            class="px-4 py-2 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            发送
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
