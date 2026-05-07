import { NextRequest } from "next/server";

const SYSTEM_PROMPT =
  "你是姚世行的个人网站 AI 助手。你的职责是围绕姚世行的技术技能、项目经验、学习经历和 AI 工具使用经验来回答问题。" +
  "姚世行正在学习后端开发，熟悉 Java、Spring Boot、MySQL、MyBatis-Plus。" +
  "他的项目包括：个人作品集网站（Next.js + TypeScript + Tailwind CSS）、AI 面试准备助手、任务管理小工具。" +
  "他使用 Claude Code 等 AI 工具辅助学习和开发。" +
  "请用中文回答，保持友好、专业、简洁的风格。如果被问到与姚世行无关的问题，请礼貌地引导回他的技术背景和项目经验。"

function getMockAnswer(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("技术") || q.includes("技能") || q.includes("会什么")) {
    return "姚世行目前正在学习后端开发技术栈，主要包括：\n\n" +
      "- **编程语言**：Java、TypeScript / JavaScript\n" +
      "- **框架**：Spring Boot、Next.js\n" +
      "- **数据库**：MySQL，使用 MyBatis-Plus 作为 ORM\n" +
      "- **工具**：Git、Claude Code 等 AI 辅助开发工具\n\n" +
      "他还在持续学习 RESTful API 设计、后端架构等知识。";
  }

  if (q.includes("项目") || q.includes("做过")) {
    return "姚世行完成和进行中的项目包括：\n\n" +
      "1. **个人作品集网站** — 也就是你正在访问的这个网站！使用 Next.js + TypeScript + Tailwind CSS 搭建，集成了 DeepSeek API 实现 AI 问答功能。\n\n" +
      "2. **AI 面试准备助手** — 针对后端开发岗位的 AI 面试模拟工具，帮助梳理技术面试常见考点。\n\n" +
      "3. **任务管理小工具** — 基于 Spring Boot 的完整 CRUD 后端实践项目，涵盖数据库设计和 RESTful API 开发。";
  }

  if (q.includes("ai") || q.includes("AI") || q.includes("人工智能") || q.includes("claude")) {
    return "姚世行将 AI 工具深度融入学习和开发流程：\n\n" +
      "- 使用 **Claude Code** 作为 AI 结对编程助手，完成从需求分析到部署的全流程\n" +
      "- AI 辅助代码生成、调试、重构和文档编写\n" +
      "- 利用 AI 快速学习新技术栈，提升学习效率\n" +
      "- 这个作品集网站就是 AI 辅助开发的实践成果\n\n" +
      "他相信，善用 AI 工具是现代开发者的核心能力之一。";
  }

  return "这个问题很有趣！不过作为姚世行的个人 AI 助手，我主要专注于介绍他的技术背景和项目经验。\n\n" +
    "你可以试试问我这些问题：\n" +
    "- 「你会哪些技术？」\n" +
    "- 「你做过什么项目？」\n" +
    "- 「你如何使用 AI 工具写代码？」";
}

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== "string") {
      return Response.json({ error: "请提供有效的问题" }, { status: 400 });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;

    // If no API key, return mock answer
    if (!apiKey) {
      return Response.json({ answer: getMockAnswer(question) });
    }

    // Call DeepSeek API
    try {
      const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: question },
          ],
          max_tokens: 600,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error("DeepSeek API error:", res.status, errData);
        throw new Error(`DeepSeek API 返回错误 (${res.status})`);
      }

      const data = await res.json();
      const answer =
        data.choices?.[0]?.message?.content || "抱歉，未能获取到有效回答。";

      return Response.json({ answer });
    } catch (apiError) {
      console.error("DeepSeek API call failed:", apiError);
      // Fallback to mock on API failure
      return Response.json({
        answer:
          getMockAnswer(question) +
          "\n\n（注：当前 DeepSeek API 调用失败，以上为本地 mock 回答。请检查 API Key 是否有效。）",
      });
    }
  } catch {
    return Response.json({ error: "请求格式错误" }, { status: 400 });
  }
}
