import { NextRequest } from "next/server";
import { findUserByUsername, createUser } from "@/lib/store";
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

    if (findUserByUsername(username)) {
      return Response.json({ error: "用户名已存在" }, { status: 409 });
    }

    const newUser = createUser({
      username,
      password_hash: bcrypt.hashSync(password, 10),
      email: email?.trim() || "",
      phone: phone?.trim() || "",
      is_admin: 0,
    });

    return Response.json({
      message: "注册成功",
      user: { id: newUser.id, username, email: newUser.email, phone: newUser.phone },
    });
  } catch (err) {
    console.error("Register error:", err);
    return Response.json({ error: "服务器错误，请稍后重试" }, { status: 500 });
  }
}
