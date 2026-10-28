# 选型决策记录

> 2026-10-28 项目整理时确立。未来想推翻某条决策前，先读对应小节。

## D1：从 vinext 服务端架构迁移到 Vite 纯静态 SPA

**背景**：项目源自 ChatGPT Sites 生成（vinext + workerd + OpenAI 托管管道）。业务上是纯前端单页（数据硬编码、无接口路由），但背着全套服务端架构。

**决策**：改为 Vite + React + TS + Tailwind v4 + shadcn 纯静态 SPA，GitHub Actions 部署 Cloudflare。

**放弃的东西与回头路（损失台账）**：

| 放弃 | 影响 | 回头路 |
|---|---|---|
| SSR/服务端渲染 | 链接预览的 meta 靠 index.html 静态写死；单页站无感 | 未来多页需独立预览时，用 Vite 多入口（MPA）模式，仍是纯静态 |
| RSC/路由接口/middleware/D1/R2 预埋 | 需要后端功能时要重新引入 | Cloudflare 静态托管支持"静态资源 + Worker Functions"共存，届时增量加一个函数即可，非重写 |
| ChatGPT Sites 通用脚手架 | 无（其价值绑定已弃用的 OpenAI 托管） | 替代物 = 本仓库的 AGENTS.md + 设计技能 + shadcn CLI + CI 模板 |
| workerd 的 dev=prod 一致性 | 无 | `npm run preview` 预览的就是部署产物，一致性更强 |

**整体架构兜底**：旧架构完整保留在分支 `backup/vinext-openai`（tag `backup/pre-cleanup`），随时可回。

## D2：React 而非 Vue

用户主技术栈是 Vue。选 React 是因为 AI 协作场景下 React + Tailwind + shadcn 是模型语料最密集的组合，生成质量与效率最高。shadcn 组件是源码拷贝式，可读可改，兼作学习材料。

## D3：GitHub Actions 主动部署（而非 Cloudflare 直连仓库）

构建过程可控、可加门禁（lint/typecheck）、密钥集中管理。代价仅是一个 workflow 文件。

## D4：背景图仅在"视觉无损"前提下压缩

forest-studio.png（2.6MB）是设计地基。允许无损或视觉不可辨的压缩；压缩后必须截图比对通过才保留，否则用原图。

## D5：去 OpenAI 化

已卸载 @openai/sites-vite-plugin、删除 .openai/、移除 modelContext 注册代码、git 远端从 git.chatgpt-team.site 迁至 GitHub。原因：OpenAI Sites 托管无额度，且自建管道更可控。
