# Personal AI Portfolio

我的个人作品集网站，使用 **Claude Code AI 结对编程**从零搭建的全栈项目。展示技术栈、项目经验和 AI 辅助开发实践。

## 功能

- **多模块页面** — Hero、关于我、技能栈、项目展示、学习经历时间线、AI 问答助手、留言板、联系方式
- **AI 问答助手** — 集成 DeepSeek API，访问者可以向我提问了解我的技术背景
- **Mock 回退** — 未配置 API Key 时自动使用本地 mock 回答，项目可正常运行
- **用户系统** — 注册/登录，JWT 认证，手机号注册
- **留言板** — 访客可发表留言，管理员可删除
- **联系表单** — 用户提交的信息存入数据库
- **响应式设计** — 适配桌面端和移动端
- **暗色模式** — 跟随系统自动切换
- **SQLite 数据库** — 零依赖本地数据库，无需安装

## 技术栈

| 类别 | 技术 |
|------|------|
| 全栈框架 | Next.js 16 (App Router + API Routes) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS |
| 数据库 | SQLite (better-sqlite3) |
| 认证 | JWT (jose + bcryptjs) |
| AI API | DeepSeek API |
| 部署 | Vercel / Node.js |

## 本地运行

```bash
# 1. 克隆项目
git clone <your-repo-url>
cd personal-ai-portfolio

# 2. 安装依赖
npm install

# 3. （可选）配置环境变量
cp .env.local.example .env.local
# 编辑 .env.local：
#   DEEPSEEK_API_KEY — DeepSeek API Key（不填则 AI 问答使用 mock）
#   JWT_SECRET — JWT 签名密钥（不填则使用默认值，生产环境请修改）

# 4. 启动开发服务器
npm run dev

# 5. 打开浏览器访问
# http://localhost:3000
```

## 演示账号

| 用户名 | 密码 | 角色 |
|--------|------|------|
| admin | admin123 | 管理员（可删除留言） |

注册新用户默认为普通用户。

## 环境变量

| 变量名 | 必填 | 说明 |
|--------|------|------|
| `DEEPSEEK_API_KEY` | 否 | DeepSeek API Key，不填则使用 mock 回答 |
| `JWT_SECRET` | 否 | JWT 签名密钥，不填使用默认值，**生产环境请务必修改** |

## 数据库设计

### users 表
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | 主键 |
| username | TEXT | 用户名（唯一） |
| password_hash | TEXT | bcrypt 加密的密码 |
| phone | TEXT | 手机号 |
| is_admin | INTEGER | 是否管理员 |
| created_at | TEXT | 创建时间 |

### comments 表
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | 主键 |
| author_name | TEXT | 留言者昵称 |
| content | TEXT | 留言内容 |
| created_at | TEXT | 创建时间 |

### contacts 表
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | 主键 |
| name | TEXT | 联系人姓名 |
| email | TEXT | 联系人邮箱 |
| phone | TEXT | 联系人手机号 |
| message | TEXT | 留言内容 |
| created_at | TEXT | 创建时间 |

## API 接口

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | `/api/auth/register` | 用户注册 | 否 |
| POST | `/api/auth/login` | 用户登录 | 否 |
| GET | `/api/auth/me` | 获取当前用户 | Bearer Token |
| GET | `/api/comments` | 获取留言列表 | 否 |
| POST | `/api/comments` | 发表留言 | 否 |
| DELETE | `/api/comments/[id]` | 删除留言 | 管理员 |
| POST | `/api/contact` | 提交联系表单 | 否 |
| POST | `/api/ask` | AI 问答 | 否 |

## 部署

### Vercel（推荐）

1. 将项目推送到 GitHub
2. 在 [Vercel](https://vercel.com) 中导入该仓库
3. 在 Vercel 项目设置中添加环境变量 `DEEPSEEK_API_KEY` 和 `JWT_SECRET`
4. 部署即可

> **注意**：Vercel 是无服务器环境，SQLite 数据库文件在每次部署后会重置。如需持久化数据，可迁移至 Vercel KV、Turso 等云数据库。

### 其他平台

```bash
npm run build
npm start
```

## Claude Code 辅助开发过程

本项目全程使用 **Claude Code** 作为 AI 结对编程助手完成开发，体现了现代 AI 辅助开发的完整工作流：

### 开发阶段

1. **需求分析** — 与 Claude Code 讨论技术选型、页面结构和组件拆分方案
2. **项目初始化** — 使用 Claude Code 执行 `create-next-app`，配置 TypeScript + Tailwind CSS
3. **前端组件开发** — 逐个创建 9 个页面组件，实现响应式布局和暗色模式
4. **AI API 封装** — 实现 `/api/ask` 接口，集成 DeepSeek API + mock 回退逻辑
5. **后端开发** — 实现用户认证（JWT）、留言板 CRUD、联系表单，SQLite 数据库设计
6. **构建验证** — 运行 `npm run build` 验证零错误通过
7. **文档生成** — 生成完整的 README，包括数据库设计、API 文档

### 关键决策

- 选择 Next.js API Routes 实现全栈，一套 TypeScript 搞定前后端
- 使用 SQLite 作为零依赖本地数据库，无需额外安装
- JWT 认证 + bcrypt 密码加密，安全的用户系统
- API Key 使用环境变量管理，不写死进代码
- 组件职责单一，每个模块独立封装，便于面试时解释

## 项目结构

```
src/
├── app/
│   ├── api/
│   │   ├── ask/route.ts              # AI 问答接口
│   │   ├── auth/
│   │   │   ├── register/route.ts     # 注册接口
│   │   │   ├── login/route.ts        # 登录接口
│   │   │   └── me/route.ts           # 当前用户接口
│   │   ├── comments/
│   │   │   ├── route.ts              # 留言列表 + 发表
│   │   │   └── [id]/route.ts         # 删除留言
│   │   └── contact/route.ts          # 联系表单
│   ├── globals.css                   # 全局样式
│   ├── layout.tsx                    # 根布局
│   └── page.tsx                      # 首页
├── components/
│   ├── Navbar.tsx                    # 导航栏（含登录状态）
│   ├── Hero.tsx                      # 首屏
│   ├── About.tsx                     # 关于我
│   ├── Skills.tsx                    # 技能栈
│   ├── Projects.tsx                  # 项目展示
│   ├── Timeline.tsx                  # 学习经历
│   ├── AIChat.tsx                    # AI 问答助手
│   ├── CommentSection.tsx            # 留言板
│   ├── Contact.tsx                   # 联系表单
│   ├── Footer.tsx                    # 页脚
│   └── LoginModal.tsx                # 登录/注册弹窗
├── context/
│   └── AuthContext.tsx               # 认证状态管理
├── lib/
│   └── db.ts                         # 数据库初始化
└── .env.local.example                # 环境变量模板
```

## 后续扩展方向

- 接入 Turso / Vercel KV 等云数据库实现数据持久化
- 添加后台管理面板，动态编辑项目内容和技能标签
- 集成博客系统，发布技术学习笔记
- 接入邮件服务，实现新留言通知
- 添加访问统计和页面分析
- 部署到 Vercel 并绑定自定义域名

## License

MIT
