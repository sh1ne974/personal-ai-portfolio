<script setup lang="ts">
import { ref, provide } from "vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import LoginModal from "./components/LoginModal.vue";

const loginOpen = ref(false);
const user = ref<any>(null);
const token = ref<string | null>(localStorage.getItem("token"));

// Restore session
if (token.value) {
  fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token.value}` } })
    .then((r) => r.json())
    .then((d) => {
      if (d.user) user.value = d.user;
      else { localStorage.removeItem("token"); token.value = null; }
    })
    .catch(() => { localStorage.removeItem("token"); token.value = null; });
}

function onLoginSuccess(u: any, t: string) {
  user.value = u;
  token.value = t;
  localStorage.setItem("token", t);
  loginOpen.value = false;
}

function onLogout() {
  user.value = null;
  token.value = null;
  localStorage.removeItem("token");
}

provide("user", user);
provide("token", token);
provide("onLoginSuccess", onLoginSuccess);
provide("onLogout", onLogout);
provide("openLogin", () => (loginOpen.value = true));
</script>

<template>
  <Navbar />
  <main class="flex-1">
    <router-view />
  </main>
  <Footer />
  <LoginModal :open="loginOpen" @close="loginOpen = false" @login-success="onLoginSuccess" />
</template>
