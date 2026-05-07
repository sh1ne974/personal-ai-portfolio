"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "关于我", href: "#about" },
  { label: "技能", href: "#skills" },
  { label: "项目", href: "#projects" },
  { label: "经历", href: "#timeline" },
  { label: "AI 问答", href: "#ai-chat" },
  { label: "留言板", href: "#comments" },
  { label: "联系", href: "#contact" },
];

interface Props {
  onLoginClick: () => void;
}

export default function Navbar({ onLoginClick }: Props) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 dark:bg-zinc-950/80 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#" className="font-bold text-lg text-zinc-900 dark:text-white">
          YAO Portfolio
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-6 text-sm font-medium items-center">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500">{user.username}</span>
                <button
                  onClick={logout}
                  className="text-sm text-zinc-500 hover:text-red-500 transition-colors"
                >
                  退出
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                登录
              </button>
            )}
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-zinc-600 dark:text-zinc-400"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <ul className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pb-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block py-2 text-sm text-zinc-600 dark:text-zinc-400"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-2 border-t border-zinc-100 dark:border-zinc-800 mt-2">
            {user ? (
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">{user.username}</span>
                <button onClick={logout} className="text-sm text-red-500">退出</button>
              </div>
            ) : (
              <button
                onClick={() => { setMenuOpen(false); onLoginClick(); }}
                className="text-sm text-zinc-500"
              >
                登录
              </button>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
}
