<script setup lang="ts">
import { useScrollReveal } from "../composables/useScrollReveal";
import Hero from "../components/Hero.vue";
import About from "../components/About.vue";
import Skills from "../components/Skills.vue";
import Projects from "../components/Projects.vue";
import Timeline from "../components/Timeline.vue";
import AIChat from "../components/AIChat.vue";
import CommentSection from "../components/CommentSection.vue";
import Contact from "../components/Contact.vue";

useScrollReveal(".reveal-section");
useScrollReveal(".reveal-card", { threshold: 0.05, rootMargin: "0px 0px -20px 0px" });
</script>

<template>
  <Hero />
  <About />
  <Skills />
  <Projects />
  <Timeline />
  <AIChat />
  <CommentSection />
  <Contact />
</template>
