import { NextRequest } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json({ error: "姓名、邮箱和留言不能为空" }, { status: 400 });
    }

    if (message.length > 1000) {
      return Response.json({ error: "留言内容不能超过 1000 字" }, { status: 400 });
    }

    const db = getDb();
    db.prepare(
      "INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)"
    ).run(name.trim(), email.trim(), phone?.trim() || "", message.trim());

    return Response.json({ message: "留言已提交，感谢你的联系！" });
  } catch {
    return Response.json({ error: "请求格式错误" }, { status: 400 });
  }
}
