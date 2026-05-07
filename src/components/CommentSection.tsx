"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";

interface Comment {
  id: number;
  author_name: string;
  content: string;
  created_at: string;
}

interface Props {
  onLoginClick: () => void;
}

export default function CommentSection({ onLoginClick }: Props) {
  const { user, token } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch("/api/comments");
      const data = await res.json();
      if (data.comments) setComments(data.comments);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || !token) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: content.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "提交失败");
      } else {
        setContent("");
        fetchComments();
      }
    } catch {
      setError("网络错误，请重试");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    if (!token) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchComments();
    } catch {
      // silent
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section id="comments" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white text-center">
          留言板
        </h2>
        <p className="mt-2 text-center text-zinc-500 dark:text-zinc-400 text-sm">
          登录后即可留言交流
        </p>

        {/* Comment form */}
        {user ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-3">
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <span>留言身份：</span>
              <span className="font-medium text-zinc-900 dark:text-white">{user.username}</span>
            </div>
            <textarea
              placeholder="写下你想说的话..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              maxLength={500}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600 resize-none"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">{content.length}/500</span>
              <button
                type="submit"
                disabled={submitting || !content.trim()}
                className="px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
              >
                {submitting ? "提交中..." : "发表留言"}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        ) : (
          <div className="mt-8 text-center py-8 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              请先登录后再发表留言
            </p>
            <button
              onClick={onLoginClick}
              className="mt-3 px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              立即登录
            </button>
          </div>
        )}

        {/* Comments list */}
        <div className="mt-8 space-y-4">
          {loading ? (
            <p className="text-center text-sm text-zinc-400">加载中...</p>
          ) : comments.length === 0 ? (
            <p className="text-center text-sm text-zinc-400">暂无留言，来写第一条吧</p>
          ) : (
            comments.map((c) => (
              <div
                key={c.id}
                className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-zinc-900 dark:text-white">
                    {c.author_name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400">
                      {new Date(c.created_at).toLocaleString("zh-CN")}
                    </span>
                    {user?.isAdmin && (
                      <button
                        onClick={() => handleDelete(c.id)}
                        disabled={deletingId === c.id}
                        className="text-xs text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
                      >
                        {deletingId === c.id ? "删除中" : "删除"}
                      </button>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {c.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
