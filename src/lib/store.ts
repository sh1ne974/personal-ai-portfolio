import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const DATA_DIR = path.join(process.env.VERCEL ? "/tmp" : process.cwd(), "data");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJSON<T>(file: string): T[] {
  ensureDir();
  const filePath = path.join(DATA_DIR, file);
  if (!fs.existsSync(filePath)) return [];
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return [];
  }
}

function writeJSON<T>(file: string, data: T[]) {
  ensureDir();
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2));
}

// ---- Types ----

export interface User {
  id: number;
  username: string;
  password_hash: string;
  email: string;
  phone: string;
  is_admin: number;
  created_at: string;
}

export interface Comment {
  id: number;
  author_name: string;
  content: string;
  created_at: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

// ---- Seed ----

function seed() {
  const users = readJSON<User>("users.json");
  if (users.length === 0) {
    users.push({
      id: 1,
      username: "admin",
      password_hash: bcrypt.hashSync("admin123", 10),
      email: "admin@example.com",
      phone: "",
      is_admin: 1,
      created_at: new Date().toISOString(),
    });
    writeJSON("users.json", users);
  }
  if (!fs.existsSync(path.join(DATA_DIR, "comments.json"))) writeJSON("comments.json", []);
  if (!fs.existsSync(path.join(DATA_DIR, "contacts.json"))) writeJSON("contacts.json", []);
}

seed();

// ---- User operations ----

export function findUserByUsername(username: string): User | undefined {
  return readJSON<User>("users.json").find((u) => u.username === username);
}

export function findUserById(id: number): User | undefined {
  return readJSON<User>("users.json").find((u) => u.id === id);
}

export function createUser(user: Omit<User, "id" | "created_at">): User {
  const users = readJSON<User>("users.json");
  const newUser: User = {
    ...user,
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    created_at: new Date().toISOString(),
  };
  users.push(newUser);
  writeJSON("users.json", users);
  return newUser;
}

// ---- Comment operations ----

export function getComments(): Comment[] {
  return readJSON<Comment>("comments.json").sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function createComment(authorName: string, content: string): Comment {
  const comments = readJSON<Comment>("comments.json");
  const newComment: Comment = {
    id: comments.length > 0 ? Math.max(...comments.map((c) => c.id)) + 1 : 1,
    author_name: authorName,
    content,
    created_at: new Date().toISOString(),
  };
  comments.push(newComment);
  writeJSON("comments.json", comments);
  return newComment;
}

export function deleteComment(id: number): boolean {
  const comments = readJSON<Comment>("comments.json");
  const idx = comments.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  comments.splice(idx, 1);
  writeJSON("comments.json", comments);
  return true;
}

// ---- Contact operations ----

export function createContact(contact: Omit<Contact, "id" | "created_at">): Contact {
  const contacts = readJSON<Contact>("contacts.json");
  const newContact: Contact = {
    ...contact,
    id: contacts.length > 0 ? Math.max(...contacts.map((c) => c.id)) + 1 : 1,
    created_at: new Date().toISOString(),
  };
  contacts.push(newContact);
  writeJSON("contacts.json", contacts);
  return newContact;
}
