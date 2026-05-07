"use client";

import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ type: "success", text: data.message });
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setFeedback({ type: "error", text: data.error || "提交失败" });
      }
    } catch {
      setFeedback({ type: "error", text: "网络错误，请重试" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-20 px-4 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white text-center">
          联系我
        </h2>
        <p className="mt-2 text-center text-zinc-500 dark:text-zinc-400 text-sm">
          欢迎交流技术学习和 AI 辅助开发的经验
        </p>

        {/* Direct contact info */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href="mailto:shihang_yao@163.com" className="hover:underline">
              shihang_yao@163.com
            </a>
          </div>
        </div>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              placeholder="你的姓名"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600"
            />
            <input
              type="email"
              placeholder="你的邮箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600"
            />
          </div>
          <input
            type="tel"
            placeholder="手机号（选填）"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600"
          />
          <textarea
            placeholder="写下你想说的话..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            maxLength={1000}
            rows={4}
            className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600 resize-none"
          />
          {feedback && (
            <p className={`text-sm ${feedback.type === "success" ? "text-green-500" : "text-red-500"}`}>
              {feedback.text}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting || !name.trim() || !email.trim() || !message.trim()}
            className="w-full py-2.5 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {submitting ? "发送中..." : "发送消息"}
          </button>
        </form>
      </div>
    </section>
  );
}
