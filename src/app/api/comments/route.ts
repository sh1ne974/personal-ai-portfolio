import { NextRequest } from "next/server";
import { getComments, createComment } from "@/lib/store";
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
  const comments = getComments();
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

    const comment = createComment(authUser.username, content.trim());

    return Response.json({ comment });
  } catch (err) {
    console.error("Comment POST error:", err);
    return Response.json({ error: "服务器错误，请稍后重试" }, { status: 500 });
  }
}
