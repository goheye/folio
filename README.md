# folio · 个人作品集

以剧本创作与 AI 影像作品展示为核心的个人网站项目。

> **现有网页是早期视觉原型，产品与视觉方向还在重新设计。** 森林背景、配色、书架与布局等并非用户确认的未来设计标准；当前主要保留的是技术框架及自动化流程。

## 技术栈

Vite + React + TypeScript · Tailwind CSS v4 · shadcn/ui · lucide 图标。
纯静态 SPA：构建产物为 HTML/CSS/JS。

## 本地开发

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

## 部署

推送到 `main` 自动触发 GitHub Actions：lint → 类型检查 / 构建 → `wrangler deploy` 到 Cloudflare Workers 静态资源托管。截图工作流将旧原型/将来的新版本截图存到 `visual-snapshots` 分支。

## 文档

- [跨会话协作入口](docs/CHATGPT_PROJECT.md)
- [产品边界与设计流程](docs/PRODUCT_PLAN.md)
- [工程规范](AGENTS.md)
- [设计与技术决策](DECISIONS.md)

详细个人访谈保存在用户的 ChatGPT 私有文件库 / 项目知识区，不公开提交到本仓库。
