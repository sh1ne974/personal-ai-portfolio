import { NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import * as jose from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "personal-ai-portfolio-secret-key-change-me"
);

async function getAuthUser(request: NextRequest): Promise<{ userId: number; username: string } | null> {
  const auth = request.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  try {
    const { payload } = await jose.jwtVerify(auth.slice(7), SECRET);
    return payload as { userId: number; username: string };
  } catch {
    return null;
  }
}

export async function GET() {
  const db = getDb();
  const comments = db.prepare("SELECT * FROM comments ORDER BY created_at DESC LIMIT 50").all();
  return Response.json({ comments });
}

export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) {
      return Response.json({ error: "请先登录后再留言" }, { status: 401 });
    }

    const { content } = await request.json();

    if (!content?.trim()) {
      return Response.json({ error: "留言内容不能为空" }, { status: 400 });
    }

    if (content.length > 500) {
      return Response.json({ error: "留言内容不能超过 500 字" }, { status: 400 });
    }

    const db = getDb();
    const result = db
      .prepare("INSERT INTO comments (author_name, content) VALUES (?, ?)")
      .run(authUser.username, content.trim());

    return Response.json({
      comment: {
        id: result.lastInsertRowid,
        author_name: authUser.username,
        content: content.trim(),
        created_at: new Date().toISOString(),
      },
    });
  } catch {
    return Response.json({ error: "请求格式错误" }, { status: 400 });
  }
}
