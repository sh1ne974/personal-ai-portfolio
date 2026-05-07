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
  try {
    await fetch(`/api/comments/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token.value}` } });
    fetchComments();
  } catch {}
}
</script>

<template>
  <section id="comments" class="py-24 px-6 bg-zinc-50/50 dark:bg-zinc-900/30">
    <div class="max-w-2xl mx-auto">
      <div class="reveal-section text-center">
        <span class="text-xs font-semibold tracking-widest uppercase text-zinc-400">Messages</span>
        <h2 class="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">留言板</h2>
        <p class="mt-3 text-sm text-zinc-500">登录后即可留言交流</p>
      </div>

      <!-- Form -->
      <form v-if="user" @submit.prevent="handleSubmit" class="reveal-section mt-10 space-y-3" style="transition-delay:0.1s">
        <div class="flex items-center gap-2 text-sm text-zinc-500">
          <span class="w-2 h-2 rounded-full bg-green-400" />{{ user.username }}
        </div>
        <textarea v-model="content" placeholder="写下你想说的话..." required maxlength="500" rows="3"
          class="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-700 resize-none" />
        <div class="flex items-center justify-between">
          <span class="text-xs text-zinc-400">{{ content.length }}/500</span>
          <button type="submit" :disabled="submitting || !content.trim()"
            class="btn-apple px-5 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-sm font-medium hover:opacity-80 disabled:opacity-40 transition-all">
            {{ submitting ? "提交中..." : "发表留言" }}
          </button>
        </div>
        <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
      </form>

      <div v-else class="reveal-section mt-10 glass rounded-2xl p-8 text-center" style="transition-delay:0.1s">
        <p class="text-sm text-zinc-500 mb-4">请先登录后再发表留言</p>
        <button @click="openLogin" class="btn-apple px-6 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-sm font-medium hover:opacity-80">立即登录</button>
      </div>

      <!-- List -->
      <div class="mt-10 space-y-3">
        <p v-if="loading" class="text-center text-sm text-zinc-400">加载中...</p>
        <p v-else-if="comments.length === 0" class="text-center text-sm text-zinc-400 py-8">暂无留言</p>
        <div v-for="c in comments" :key="c.id" class="reveal-card glass rounded-xl p-4">
          <div class="flex items-center justify-between">
            <span class="font-medium text-sm text-zinc-900 dark:text-white">{{ c.authorName }}</span>
            <div class="flex items-center gap-3">
              <span class="text-[11px] text-zinc-400">{{ new Date(c.createdAt).toLocaleString("zh-CN") }}</span>
              <button v-if="user?.isAdmin" @click="handleDelete(c.id)" class="text-[11px] text-zinc-400 hover:text-red-400 transition-colors">删除</button>
            </div>
          </div>
          <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{{ c.content }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
