import { NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import * as jose from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "personal-ai-portfolio-secret-key-change-me"
);

async function verifyAdmin(request: NextRequest): Promise<boolean> {
  const auth = request.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return false;
  try {
    const { payload } = await jose.jwtVerify(auth.slice(7), SECRET);
    return (payload as { isAdmin: boolean }).isAdmin === true;
  } catch {
    return false;
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await verifyAdmin(request);
  if (!isAdmin) {
    return Response.json({ error: "无权限，仅管理员可删除" }, { status: 403 });
  }

  const { id } = await params;
  const db = getDb();
  const result = db.prepare("DELETE FROM comments WHERE id = ?").run(id);

  if (result.changes === 0) {
    return Response.json({ error: "留言不存在" }, { status: 404 });
  }

  return Response.json({ message: "删除成功" });
}
