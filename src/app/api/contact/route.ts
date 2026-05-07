import { NextRequest } from "next/server";
import { createContact } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json({ error: "姓名、邮箱和留言不能为空" }, { status: 400 });
    }

    if (message.length > 1000) {
      return Response.json({ error: "留言内容不能超过 1000 字" }, { status: 400 });
    }

    createContact({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || "",
      message: message.trim(),
    });

    return Response.json({ message: "留言已提交，感谢你的联系！" });
  } catch (err) {
    console.error("Contact error:", err);
    return Response.json({ error: "服务器错误，请稍后重试" }, { status: 500 });
  }
}
