# folio · 海燕的个人作品集

沉浸式"创作房间"主题的单页作品集：剧本、影像、灵感与关于。

## 技术栈

Vite + React + TypeScript · Tailwind CSS v4 · shadcn/ui · lucide 图标。
纯静态 SPA——构建产物是普通 HTML/CSS/JS，无任何后端。

## 本地开发

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 类型检查 + 构建 → dist/
npm run preview    # 预览构建产物（即部署内容）
npm run lint
```

## 部署

push 到 `main` 自动触发 GitHub Actions：lint → 类型检查 → 构建 → `wrangler deploy` 到 Cloudflare Workers 静态资源托管。手动部署：`npm run deploy`（需本地 wrangler 登录）。

## 目录速览

- `src/App.tsx` — 全站唯一页面（栏目与作品数据硬编码于此）
- `src/styles/globals.css` — 全部样式与设计 token
- `public/forest-studio.png` — 全站背景图

架构与设计约束详见 [AGENTS.md](./AGENTS.md)，选型背景见 [DECISIONS.md](./DECISIONS.md)。
