import { NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { username, password, email, phone } = await request.json();

    if (!username || !password) {
      return Response.json({ error: "用户名和密码不能为空" }, { status: 400 });
    }

    if (!email?.trim() && !phone?.trim()) {
      return Response.json({ error: "邮箱和手机号至少填写一项" }, { status: 400 });
    }

    if (username.length < 3) {
      return Response.json({ error: "用户名至少 3 个字符" }, { status: 400 });
    }

    if (password.length < 6) {
      return Response.json({ error: "密码至少 6 个字符" }, { status: 400 });
    }

    const db = getDb();

    const existing = db.prepare("SELECT id FROM users WHERE username = ?").get(username);
    if (existing) {
      return Response.json({ error: "用户名已存在" }, { status: 409 });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const result = db
      .prepare("INSERT INTO users (username, password_hash, email, phone) VALUES (?, ?, ?, ?)")
      .run(username, passwordHash, email?.trim() || "", phone?.trim() || "");

    return Response.json({
      message: "注册成功",
      user: {
        id: result.lastInsertRowid,
        username,
        email: email?.trim() || "",
        phone: phone?.trim() || "",
      },
    });
  } catch {
    return Response.json({ error: "请求格式错误" }, { status: 400 });
  }
}
