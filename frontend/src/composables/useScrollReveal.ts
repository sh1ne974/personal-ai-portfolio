import { onMounted, onUnmounted } from "vue";

export function useScrollReveal(selector: string, options?: { threshold?: number; rootMargin?: string }) {
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: options?.threshold ?? 0.1, rootMargin: options?.rootMargin ?? "0px 0px -40px 0px" }
    );

    document.querySelectorAll(selector).forEach((el) => observer!.observe(el));
  });

  onUnmounted(() => observer?.disconnect());
}
