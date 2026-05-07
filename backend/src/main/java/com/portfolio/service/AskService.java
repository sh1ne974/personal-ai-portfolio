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
        "姚世行正在学习后端开发，熟悉 Java、Spring Boot、MySQL、MyBatis-Plus。" +
        "他的项目包括：个人作品集网站（Next.js + TypeScript + Tailwind CSS / Spring Boot + Vue）、" +
        "博客系统、无人机视觉跟踪算法研究（YOLO + BoT-SORT + 反锐化掩膜）。" +
        "他使用 Claude Code 等 AI 工具辅助学习和开发。" +
        "请用中文回答，保持友好、专业、简洁的风格。如果被问到与姚世行无关的问题，请礼貌地引导回他的技术背景和项目经验。";

    private String getMockAnswer(String question) {
        String q = question.toLowerCase();
        if (q.contains("技术") || q.contains("技能") || q.contains("会什么")) {
            return "姚世行目前掌握的技术栈：\n\n- **后端**：Java、Spring Boot、MyBatis-Plus、MySQL\n- **前端**：Vue、TypeScript、HTML/CSS\n- **工具**：Git、Claude Code AI 辅助开发\n- **其他**：YOLO、BoT-SORT（毕业设计相关）";
        }
        if (q.contains("项目") || q.contains("做过")) {
            return "姚世行的项目：\n\n1. **个人作品集网站** — 全栈项目，Spring Boot + Vue + MySQL\n2. **博客系统** — 完整的内容管理系统\n3. **无人机视觉跟踪算法** — 毕业设计，YOLO + BoT-SORT + 反锐化掩膜";
        }
        if (q.contains("ai") || q.contains("claude")) {
            return "姚世行使用 Claude Code 进行 AI 结对编程，从需求分析、代码生成到调试部署全流程 AI 辅助。他相信善用 AI 工具是现代开发者的重要能力。";
        }
        return "你可以问我：\n- 「你会哪些技术？」\n- 「你做过什么项目？」\n- 「你如何使用 AI 工具写代码？」";
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
