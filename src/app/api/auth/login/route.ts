import { NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import bcrypt from "bcryptjs";
import * as jose from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "personal-ai-portfolio-secret-key-change-me"
);

function createToken(userId: number, username: string, isAdmin: boolean) {
  return new jose.SignJWT({ userId, username, isAdmin })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return Response.json({ error: "用户名和密码不能为空" }, { status: 400 });
    }

    const db = getDb();
    const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username) as
      | { id: number; username: string; password_hash: string; is_admin: number; email: string; phone: string }
      | undefined;

    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      return Response.json({ error: "用户名或密码错误" }, { status: 401 });
    }

    const token = await createToken(user.id, user.username, user.is_admin === 1);

    return Response.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        isAdmin: user.is_admin === 1,
        email: user.email || "",
        phone: user.phone || "",
      },
    });
  } catch {
    return Response.json({ error: "请求格式错误" }, { status: 400 });
  }
}
