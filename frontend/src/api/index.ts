import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 15000,
});

// Attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- Auth ----
export function loginAPI(username: string, password: string) {
  return api.post("/auth/login", { username, password });
}
export function registerAPI(username: string, password: string, email: string, phone: string) {
  return api.post("/auth/register", { username, password, email, phone });
}
export function getMeAPI() {
  return api.get("/auth/me");
}

// ---- Comments ----
export function getCommentsAPI() {
  return api.get("/comments");
}
export function postCommentAPI(content: string) {
  return api.post("/comments", { content });
}
export function deleteCommentAPI(id: number) {
  return api.delete(`/comments/${id}`);
}

// ---- Contact ----
export function submitContactAPI(name: string, email: string, phone: string, message: string) {
  return api.post("/contact", { name, email, phone, message });
}

// ---- Ask ----
export function askAPI(question: string) {
  return api.post("/ask", { question });
}
