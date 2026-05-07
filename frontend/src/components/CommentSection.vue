<script setup lang="ts">
import { ref, inject, onMounted } from "vue";

const user = inject<any>("user");
const token = inject<any>("token");
const openLogin = inject<() => void>("openLogin")!;

interface Comment {
  id: number;
  authorName: string;
  content: string;
  createdAt: string;
}

const comments = ref<Comment[]>([]);
const content = ref("");
const loading = ref(true);
const submitting = ref(false);
const error = ref<string | null>(null);
const deletingId = ref<number | null>(null);

async function fetchComments() {
  try {
    const res = await fetch("/api/comments");
    const data = await res.json();
    if (data.comments) comments.value = data.comments;
  } catch {} finally {
    loading.value = false;
  }
}

onMounted(fetchComments);

async function handleSubmit() {
  if (!content.value.trim() || !token.value) return;
  submitting.value = true;
  error.value = null;
  try {
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({ content: content.value.trim() }),
    });
    const data = await res.json();
    if (!res.ok) { error.value = data.error || "提交失败"; } else {
      content.value = "";
      fetchComments();
    }
  } catch {
    error.value = "网络错误，请重试";
  } finally {
    submitting.value = false;
  }
}

async function handleDelete(id: number) {
  if (!token.value) return;
  deletingId.value = id;
  try {
    await fetch(`/api/comments/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token.value}` },
    });
    fetchComments();
  } catch {} finally {
    deletingId.value = null;
  }
}
</script>

<template>
  <section id="comments" class="py-20 px-4">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white text-center">留言板</h2>
      <p class="mt-2 text-center text-zinc-500 dark:text-zinc-400 text-sm">登录后即可留言交流</p>

      <!-- Comment form -->
      <form v-if="user" @submit.prevent="handleSubmit" class="mt-8 space-y-3">
        <div class="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <span>留言身份：</span>
          <span class="font-medium text-zinc-900 dark:text-white">{{ user.username }}</span>
        </div>
        <textarea
          v-model="content"
          placeholder="写下你想说的话..."
          required
          maxlength="500"
          rows="3"
          class="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600 resize-none"
        />
        <div class="flex items-center justify-between">
          <span class="text-xs text-zinc-400">{{ content.length }}/500</span>
          <button
            type="submit"
            :disabled="submitting || !content.trim()"
            class="px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {{ submitting ? "提交中..." : "发表留言" }}
          </button>
        </div>
        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
      </form>

      <div v-else class="mt-8 text-center py-8 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700">
        <p class="text-sm text-zinc-500 dark:text-zinc-400">请先登录后再发表留言</p>
        <button @click="openLogin" class="mt-3 px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
          立即登录
        </button>
      </div>

      <!-- Comments list -->
      <div class="mt-8 space-y-4">
        <p v-if="loading" class="text-center text-sm text-zinc-400">加载中...</p>
        <p v-else-if="comments.length === 0" class="text-center text-sm text-zinc-400">暂无留言，来写第一条吧</p>
        <div
          v-for="c in comments"
          :key="c.id"
          class="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4"
        >
          <div class="flex items-center justify-between">
            <span class="font-medium text-sm text-zinc-900 dark:text-white">{{ c.authorName }}</span>
            <div class="flex items-center gap-2">
              <span class="text-xs text-zinc-400">{{ new Date(c.createdAt).toLocaleString("zh-CN") }}</span>
              <button
                v-if="user?.isAdmin"
                @click="handleDelete(c.id)"
                :disabled="deletingId === c.id"
                class="text-xs text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
              >
                {{ deletingId === c.id ? "删除中" : "删除" }}
              </button>
            </div>
          </div>
          <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{{ c.content }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
