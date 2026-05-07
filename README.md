# Personal AI Portfolio

我的个人作品集网站，使用 **Claude Code AI 结对编程**从零搭建的全栈项目。

## 技术栈

| 层级 | 技术 |
|------|------|
| 后端 | Spring Boot 3.2 + MyBatis-Plus + MySQL + Redis |
| 前端 | Vue 3 + TypeScript + Vite + Tailwind CSS |
| 认证 | JWT (jjwt) + BCrypt |
| AI | DeepSeek API（可选）+ Mock 回退 |

## 功能

- **用户系统** — 注册（邮箱+手机号）/ 登录 / JWT 认证
- **留言板** — 登录后发表留言，管理员可删除
- **AI 问答助手** — 集成 DeepSeek API，未配置则返回 Mock 回答
- **联系表单** — 提交信息存入 MySQL 数据库
- **多模块页面** — Hero、关于我、技能栈、项目展示、学习经历时间线
- **响应式设计** — 适配桌面端和移动端
- **暗色模式** — 跟随系统自动切换

## 项目结构

```
personal-ai-portfolio/
├── backend/                          # Spring Boot 后端
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/portfolio/
│       │   ├── PortfolioApplication.java
│       │   ├── config/               # JWT、CORS、数据初始化
│       │   ├── entity/               # User、Comment、Contact
│       │   ├── mapper/               # MyBatis-Plus Mapper
│       │   ├── service/              # 业务逻辑层
│       │   ├── controller/           # RESTful API
│       │   └── dto/                  # 请求/响应 DTO
│       └── resources/
│           ├── application.yml       # 数据库、Redis、JWT 配置
│           └── schema.sql            # 建表语句
├── frontend/                         # Vue 3 前端
│   ├── vite.config.ts
│   └── src/
│       ├── api/index.ts              # Axios 封装 + API 函数
│       ├── router/index.ts           # Vue Router
│       ├── components/               # 11 个页面组件
│       └── views/HomeView.vue        # 首页
└── README.md
```

## 本地运行

### 环境要求

- Java 17+
- Maven 3.9+
- MySQL 8.0+
- Node.js 22+
- Redis（可选，有也不会报错）

### 1. 初始化数据库

```bash
mysql -u root -p < backend/src/main/resources/schema.sql
```

### 2. 启动后端

```bash
cd backend
mvn spring-boot:run
# 启动在 http://localhost:8080
```

### 3. 启动前端

```bash
cd frontend
npm install
npm run dev
# 启动在 http://localhost:3000
```

### 演示账号

| 用户名 | 密码 | 角色 |
|--------|------|------|
| admin | admin123 | 管理员（可删除留言） |

## API 接口

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | `/api/auth/register` | 用户注册 | 否 |
| POST | `/api/auth/login` | 用户登录 | 否 |
| GET | `/api/auth/me` | 获取当前用户 | Bearer Token |
| GET | `/api/comments` | 获取留言列表 | 否 |
| POST | `/api/comments` | 发表留言 | Bearer Token |
| DELETE | `/api/comments/{id}` | 删除留言 | 管理员 |
| POST | `/api/contact` | 提交联系表单 | 否 |
| POST | `/api/ask` | AI 问答 | 否 |

## 数据库表

| 表名 | 说明 | 主要字段 |
|------|------|---------|
| users | 用户表 | id, username, password_hash, email, phone, is_admin |
| comments | 留言表 | id, author_name, content, created_at |
| contacts | 联系表 | id, name, email, phone, message, created_at |

## 环境变量（可选）

后端 `application.yml` 中可配置：

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `deepseek.api-key` | DeepSeek API Key | 空（使用 Mock） |
| `jwt.secret` | JWT 签名密钥 | 默认值（生产请修改） |

## Claude Code 辅助开发过程

本项目全程使用 **Claude Code** 作为 AI 结对编程助手：

1. **需求分析** — 讨论技术选型、页面结构、数据模型设计
2. **项目搭建** — 创建 Spring Boot + Vue 项目结构
3. **后端开发** — 实体类、Mapper、Service、Controller、JWT 认证、全局异常处理
4. **前端开发** — 11 个 Vue 组件、Vue Router、Axios 封装、Tailwind CSS 样式
5. **数据库设计** — MySQL 建表、MyBatis-Plus 映射、启动数据初始化
6. **构建验证** — Maven 编译、Vue TypeScript 构建均通过

## License

MIT
