# ChatGPT 项目协作入口 · 雪雪个人网站

> 此文件供 ChatGPT「雪雪个人网站」项目的后续新会话读取。它不是运行时代码，也不存放账号密码。

## 唯一代码来源

- GitHub: `goheye/folio`
- 默认开发/生产分支：`main`
- Cloudflare 生产地址：`https://folio.3303147509.workers.dev/`
- 技术栈：Vite + React + TypeScript + Tailwind v4；Cloudflare Workers 静态资源托管
- 已存在的项目规范：先读 `AGENTS.md`、`DECISIONS.md` 和 `README.md`，不要重复创建另一套互相矛盾的规范。
- 部署：`.github/workflows/deploy.yml` 在推送 `main` 后执行 lint、build 和 wrangler deploy。

## 每次新会话的默认操作

1. 通过已连接的 GitHub 查阅最新 `main` 的源代码，尤其是 `AGENTS.md`、`DECISIONS.md` 和要改的文件。不要用旧对话中的代码代替最新版本。
2. 用中文确认需求涉及的页面和文件；小型明确变更可直接执行。大范围重构、安全敏感或不可逆修改先说明风险。
3. 尽量保持当前技术栈和视觉语言。先分析现有代码，做最小必要修改，不重写整站。
4. 更改后尽可能进行静态检查/构建校验；不能运行时明确告知。通过 GitHub 提交代码，给出 commit 链接。
5. 普通已确认的页面微调可以提交到 `main` 来触发部署；高风险或大规模改动优先建分支和 PR，再由用户确认合并。
6. 部署不能仅凭“已提交代码”就宣称成功。尽可能核验 GitHub Actions 运行状态；未能核验时说清楚。
7. 绝不把 API token、账号密钥、私密信息提交到仓库。Cloudflare 部署凭据存储在 GitHub Actions Secrets 中。

## 视觉验收方式

ChatGPT 的普通网页抓取不一定能运行 JS 或看到真实页面渲染；必须区分“读过代码”和“看过真实截图”。

- `.github/workflows/visual-snapshots.yml` 在部署成功后，或手动触发时，使用 Playwright 打开生产网址。
- `scripts/capture-visuals.mjs` 自动截取桌面/手机入口、主页、剧本、影像、灵感、关于，以及剧本弹窗。
- 截图以 JPEG 的 Base64 **纯文本**储存在独立 `visual-snapshots` 分支的 `snapshots/*.b64`，不会成为线上网站资源，也不会触发生产部署。
- ChatGPT 可以通过 GitHub `fetch_file` 读取某一张 `.b64`，将其作为 JPEG 图片呈现给自己再作视觉评审；必须先确认该分支/文件存在、快照生成成功。Base64 文本不等于重新渲染或真实交互测试。
- `snapshots/manifest.md` 记录来源 URL、源码 commit、抓取时间与图片名称，避免误把旧快照当成当前线上效果。
- 动画效果、真实交互与用户所见设备仍可能和静态截图不同；必要时请用户上传录屏或截图佐证。

## 可粘贴到 ChatGPT 项目「项目指令」的文本

本项目只负责维护我的个人网站。唯一仓库是 GitHub `goheye/folio`（默认分支 main），线上地址 `https://folio.3303147509.workers.dev/`。每次新会话先通过已连接的 GitHub 读取 `docs/CHATGPT_PROJECT.md`、`AGENTS.md`、`DECISIONS.md` 和最新代码，再按我的需求实际修改、检查、提交；小型明确修改默认直接提交 main 触发 Cloudflare 自动部署，大改先建分支/PR。不要只给示例代码而不提交。提交后回报 commit 链接、检查和部署的可验证状态。视觉评审优先读取 `visual-snapshots` 分支的最新截图；若快照不存在、过期或不能读，明确说明，不要假装看到了真实网页。不得泄露或提交密钥。