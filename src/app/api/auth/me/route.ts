import { NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import * as jose from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "personal-ai-portfolio-secret-key-change-me"
);

async function verifyToken(request: NextRequest) {
  const auth = request.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  try {
    const { payload } = await jose.jwtVerify(auth.slice(7), SECRET);
    return payload as { userId: number; username: string; isAdmin: boolean };
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const payload = await verifyToken(request);
  if (!payload) {
    return Response.json({ error: "未登录" }, { status: 401 });
  }

  const db = getDb();
  const user = db.prepare("SELECT id, username, is_admin, email, phone FROM users WHERE id = ?").get(payload.userId) as
    | { id: number; username: string; is_admin: number; email: string; phone: string }
    | undefined;

  if (!user) {
    return Response.json({ error: "用户不存在" }, { status: 404 });
  }

  return Response.json({
    user: {
      id: user.id,
      username: user.username,
      isAdmin: user.is_admin === 1,
      email: user.email || "",
      phone: user.phone || "",
    },
  });
}
