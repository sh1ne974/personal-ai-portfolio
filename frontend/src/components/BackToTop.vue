<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
const visible = ref(false);
function scrollToTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }
function onScroll() { visible.value = window.scrollY > 400; }
onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <Transition name="fade">
    <button v-if="visible" @click="scrollToTop"
      class="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-white dark:bg-[#1a1a24] border border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] shadow-md flex items-center justify-center text-[#5a5a5a] dark:text-[#a0a0b0] hover:text-[#3b2eff] dark:hover:text-[#6c5ce7] transition-all btn-accent"
      aria-label="回到顶部">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
    </button>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(8px); }
</style>
