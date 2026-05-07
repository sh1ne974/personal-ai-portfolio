import { NextRequest } from "next/server";
import { findUserById } from "@/lib/store";
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

  const user = findUserById(payload.userId);
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
