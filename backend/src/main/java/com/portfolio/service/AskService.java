package com.portfolio.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

@Service
public class AskService {

    @Value("${deepseek.api-key:}")
    private String apiKey;

    private static final String SYSTEM_PROMPT =
        "你是姚世行的个人网站 AI 助手。你的职责是围绕姚世行的技术技能、项目经验、学习经历和 AI 工具使用经验来回答问题。" +
        "姚世行的教育背景：本科毕业于厦门理工学院，目前在华南师范大学攻读硕士研究生。" +
        "他的研究方向包括计算机视觉、嵌入式系统，毕业设计课题为无人机视觉跟踪算法。" +
        "他正在学习后端开发，熟悉 Java、Spring Boot、MySQL、MyBatis-Plus，能够使用 Vue 进行前端开发。" +
        "他的项目包括：个人作品集网站（Spring Boot + Vue 3 + MySQL + Redis）、" +
        "博客系统、无人机视觉跟踪算法研究（YOLO + BoT-SORT + 反锐化掩膜图像处理）。" +
        "他使用 Claude Code 等 AI 工具辅助学习和开发，强调 AI 结对编程的现代开发方式。" +
        "请用中文回答，保持友好、专业、简洁的风格。如果被问到与姚世行无关的问题，请礼貌地引导回他的技术背景和项目经验。";

    private String getMockAnswer(String question) {
        String q = question.toLowerCase();
        if (q.contains("技术") || q.contains("技能") || q.contains("会什么") || q.contains("技术栈")) {
            return "🚀 姚世行的技术栈\n\n" +
                "▶ 后端：Java、Spring Boot、MyBatis-Plus、MySQL、Redis\n" +
                "▶ 前端：Vue 3、TypeScript、Tailwind CSS、HTML/CSS\n" +
                "▶ 算法：YOLO、BoT-SORT、OpenCV、Python\n" +
                "▶ 工具：Git、Maven、Claude Code、VS Code\n" +
                "▶ 其他：RESTful API、JWT 认证、Linux 基础";
        }
        if (q.contains("项目") || q.contains("做过") || q.contains("作品")) {
            return "📁 姚世行的项目经历\n\n" +
                "1️⃣ 个人作品集网站\n" +
                "   Spring Boot + Vue 3 + MySQL + Redis 全栈项目\n" +
                "   集成 JWT 认证、留言板、联系表单、AI 问答\n\n" +
                "2️⃣ 博客系统\n" +
                "   Spring Boot + MyBatis-Plus + MySQL\n" +
                "   文章管理、分类、评论功能\n\n" +
                "3️⃣ 无人机视觉跟踪算法（毕业设计）\n" +
                "   YOLO + BoT-SORT + 反锐化掩膜图像处理\n" +
                "   基于嵌入式平台的实时跟踪研究";
        }
        if (q.contains("ai") || q.contains("claude") || q.contains("人工智能") || q.contains("怎么用")) {
            return "🤖 姚世行如何使用 AI 工具\n\n" +
                "他使用 Claude Code 作为 AI 结对编程助手，覆盖了：\n" +
                "▶ 需求分析与技术选型讨论\n" +
                "▶ 代码生成与重构优化\n" +
                "▶ 数据库设计与 API 开发\n" +
                "▶ 调试排错与性能优化\n" +
                "▶ 项目文档与 README 生成\n\n" +
                "他相信「善用 AI 工具」是现代开发者区别于传统开发者的核心能力。";
        }
        if (q.contains("学历") || q.contains("学校") || q.contains("教育") || q.contains("毕业") || q.contains("大学")) {
            return "🎓 姚世行的教育背景\n\n" +
                "▶ 本科：厦门理工学院\n" +
                "▶ 硕士研究生：华南师范大学\n" +
                "▶ 研究方向：计算机视觉、嵌入式系统\n" +
                "▶ 毕业设计：基于嵌入式系统的无人机视觉跟踪算法研究与实现\n" +
                "   核心技术：YOLO 目标检测、BoT-SORT 多目标跟踪、反锐化掩膜图像处理";
        }
        if (q.contains("联系") || q.contains("邮箱") || q.contains("github")) {
            return "📧 联系方式\n\n" +
                "▶ 邮箱：shihang_yao@163.com\n" +
                "▶ GitHub：github.com/sh1ne974\n" +
                "▶ 欢迎技术交流和项目合作！";
        }
        return "👋 你好！我是姚世行的 AI 助手，你可以问我：\n\n" +
            "▶ 「你的学历背景是什么？」\n" +
            "▶ 「你会哪些技术？」\n" +
            "▶ 「你做过什么项目？」\n" +
            "▶ 「你如何使用 AI 工具？」\n" +
            "▶ 「怎么联系你？」";
    }

    @SuppressWarnings("unchecked")
    public String ask(String question) {
        if (apiKey == null || apiKey.isBlank()) {
            return getMockAnswer(question);
        }

        try {
            String body = Map.of(
                "model", "deepseek-chat",
                "messages", List.of(
                    Map.of("role", "system", "content", SYSTEM_PROMPT),
                    Map.of("role", "user", "content", question)
                ),
                "max_tokens", 600,
                "temperature", 0.7
            ).toString();

            // Use a simple approach with manual JSON building
            String jsonBody = "{\"model\":\"deepseek-chat\",\"messages\":[" +
                "{\"role\":\"system\",\"content\":\"" + escapeJson(SYSTEM_PROMPT) + "\"}," +
                "{\"role\":\"user\",\"content\":\"" + escapeJson(question) + "\"}]," +
                "\"max_tokens\":600,\"temperature\":0.7}";

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.deepseek.com/v1/chat/completions"))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + apiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            HttpResponse<String> response = HttpClient.newHttpClient()
                    .send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                return getMockAnswer(question) + "\n\n（DeepSeek API 暂不可用，以上为本地 mock 回答）";
            }

            // Parse response using basic string operations to avoid extra dependencies
            String body2 = response.body();
            int contentStart = body2.indexOf("\"content\":\"");
            if (contentStart == -1) {
                return getMockAnswer(question);
            }
            contentStart += 11;
            int contentEnd = body2.indexOf("\"", contentStart);
            if (contentEnd == -1) return getMockAnswer(question);
            String content = body2.substring(contentStart, contentEnd)
                    .replace("\\n", "\n")
                    .replace("\\\"", "\"");
            return content;
        } catch (Exception e) {
            return getMockAnswer(question) + "\n\n（DeepSeek API 暂时不可用，以上为本地 mock 回答）";
        }
    }

    private String escapeJson(String s) {
        return s.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n");
    }
}
