"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import AIChat from "@/components/AIChat";
import CommentSection from "@/components/CommentSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";

export default function HomePage() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <Navbar onLoginClick={() => setLoginOpen(true)} />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <AIChat />
        <CommentSection onLoginClick={() => setLoginOpen(true)} />
        <Contact />
      </main>
      <Footer />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
