<script setup lang="ts">
import { ref, inject, onMounted } from "vue";

const user = inject<any>("user");
const token = inject<any>("token");
const openLogin = inject<() => void>("openLogin")!;

interface Comment { id: number; authorName: string; content: string; createdAt: string; }
const comments = ref<Comment[]>([]);
const content = ref("");
const loading = ref(true);
const submitting = ref(false);
const error = ref<string | null>(null);

async function fetchComments() {
  try {
    const res = await fetch("/api/comments");
    const data = await res.json();
    if (data.comments) comments.value = data.comments;
  } catch {} finally { loading.value = false; }
}
onMounted(fetchComments);

async function handleSubmit() {
  if (!content.value.trim() || !token.value) return;
  submitting.value = true; error.value = null;
  try {
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token.value}` },
      body: JSON.stringify({ content: content.value.trim() }),
    });
    const data = await res.json();
    if (!res.ok) { error.value = data.error || "提交失败"; } else { content.value = ""; fetchComments(); }
  } catch { error.value = "网络错误"; } finally { submitting.value = false; }
}

async function handleDelete(id: number) {
  if (!token.value) return;
  try { await fetch(`/api/comments/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token.value}` } }); fetchComments(); } catch {}
}
</script>

<template>
  <section id="comments" class="py-32 px-8 bg-[#f9f8f6] dark:bg-[#0a0a12]">
    <div class="max-w-2xl mx-auto">
      <div class="reveal-section text-center">
        <span class="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#3b2eff] dark:text-[#6c5ce7]">Messages</span>
        <h2 class="mt-3 text-4xl sm:text-5xl font-black tracking-[-0.02em] text-[#1a1a1a] dark:text-white">留言板</h2>
      </div>

      <form v-if="user" @submit.prevent="handleSubmit" class="reveal-section mt-14 space-y-4" style="transition-delay:0.1s">
        <div class="flex items-center gap-2 text-sm text-[#3b2eff] dark:text-[#6c5ce7] font-medium">
          <span class="w-2 h-2 rounded-full bg-[#3b2eff] dark:bg-[#6c5ce7]" />{{ user.username }}
        </div>
        <textarea v-model="content" placeholder="写下你想说的话..." required maxlength="500" rows="3"
          class="w-full px-5 py-4 rounded-xl border border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] bg-white dark:bg-[#111118] text-sm text-[#1a1a1a] dark:text-white placeholder:text-[#9c9c9c] dark:placeholder:text-[#606070] focus:outline-none focus:ring-2 focus:ring-[#3b2eff]/20 dark:focus:ring-[#6c5ce7]/20 resize-none" />
        <div class="flex items-center justify-between">
          <span class="text-xs text-[#9c9c9c] dark:text-[#606070]">{{ content.length }}/500</span>
          <button type="submit" :disabled="submitting || !content.trim()"
            class="btn-accent px-6 py-2.5 rounded-xl bg-[#3b2eff] dark:bg-[#6c5ce7] text-white text-sm font-semibold disabled:opacity-30">
            {{ submitting ? "提交中..." : "发表留言" }}
          </button>
        </div>
        <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
      </form>

      <div v-else class="reveal-section mt-14 bg-white dark:bg-[#111118] border border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)] rounded-2xl p-10 text-center" style="transition-delay:0.1s">
        <p class="text-sm text-[#9c9c9c] dark:text-[#606070] mb-5">请先登录后再发表留言</p>
        <button @click="openLogin" class="btn-accent px-8 py-3 rounded-full bg-[#3b2eff] dark:bg-[#6c5ce7] text-white text-sm font-semibold">立即登录</button>
      </div>

      <div class="mt-12 space-y-3">
        <p v-if="loading" class="text-center text-sm text-[#9c9c9c] dark:text-[#606070]">加载中...</p>
        <p v-else-if="comments.length === 0" class="text-center text-sm text-[#9c9c9c] dark:text-[#606070] py-10">暂无留言</p>
        <div v-for="c in comments" :key="c.id" class="reveal-card bg-white dark:bg-[#111118] border border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)] rounded-xl p-5">
          <div class="flex items-center justify-between">
            <span class="font-semibold text-sm text-[#1a1a1a] dark:text-white">{{ c.authorName }}</span>
            <div class="flex items-center gap-3">
              <span class="text-[11px] text-[#9c9c9c] dark:text-[#606070]">{{ new Date(c.createdAt).toLocaleString("zh-CN") }}</span>
              <button v-if="user?.isAdmin" @click="handleDelete(c.id)" class="text-[11px] text-[#9c9c9c] dark:text-[#606070] hover:text-red-400 transition-colors">删除</button>
            </div>
          </div>
          <p class="mt-3 text-sm text-[#5a5a5a] dark:text-[#a0a0b0]">{{ c.content }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
