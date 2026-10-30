# folio · 个人作品集项目协作规范

> **先分清「固定技术基础」与「待继续评审的设计版本」。** 自 2026-10-31 起，用户授权将含方案 A 作品展台的新界面应用到正式网站；此前的森林主题是历史原型，当前版本仍不是最终视觉定稿。
> 公开仓库不保存完整私人访谈、未公开作品或私人联系方式。

## 代码与部署（保留）

- Vite 8 + React 19 + TypeScript；前端静态单页应用（SPA）。
- Tailwind CSS v4 + 现有 CSS；shadcn/ui 和 lucide-react 按需使用。
- GitHub：`goheye/folio`，生产分支 `main`。
- GitHub Actions → Cloudflare Workers；部署入口 `.github/workflows/deploy.yml`。
- 视觉回归工具：`.github/workflows/visual-snapshots.yml`；旧截图只是**当前原型的参照**，不是获批设计。
- 保持静态构建与当前部署链路；架构性升级必须先讨论，参考 `DECISIONS.md`。

## 当前文件结构

```
index.html                  网页入口 / SEO
src/main.tsx                React 挂载
src/App.tsx                 当前原型页面与硬编码示例内容
src/styles/globals.css      当前原型样式（非新设计强制 token）
src/lib/utils.ts            工具
public/                     资源；现有背景图非保留项
docs/CHATGPT_PROJECT.md     ChatGPT 跨会话入口
docs/PRODUCT_PLAN.md        当前确认的产品边界、后续设计流程
```

## 视觉设计状态：新版已获上线体验授权，仍可继续调整

- 当前正式网站采用独立封面、原始手绘图标动效、侧栏导航与方案 A 代表作品展台。这一版可继续调整；森林背景与深绿旧设计不再是正式界面基线。
- 在用户认可具体视觉参考与原型之前，**不得把旧风格写成新方案硬性要求**。
- 过去的 `--forest` 等 CSS 变量仅服务于旧原型，不是新设计必须复用的全局视觉令牌。
- 视觉方向、信息架构、导航、内容编排及互动体验均在下一阶段探索。
- 保持专业质量：明确的内容层级、合适的可读性与对比度、移动端响应式、键盘操作、动效可减弱、性能和真实内容。
- 禁止把占位文案、虚构作品、示例邮箱当作真实经历或正式对外信息。

## 常用命令

```bash
npm install
npm run dev
npm run build       # tsc --noEmit + vite build
npm run lint
npm run preview
```

## 开发与验收

1. 新会话先读 `docs/CHATGPT_PROJECT.md`、`docs/PRODUCT_PLAN.md`、`AGENTS.md`、`DECISIONS.md` 和最新相关源码。
2. 以用户**已确认的产品目标**为准；区分已确认、候选方案、待核实、已否定。
3. **新视觉方案必须先讨论／对比后选定**；此阶段不修改线上原型。大规模改版使用独立分支与 PR，按用户批准再合并。
4. 明确小改可以直接提交 `main`；需先检查代码，能运行时执行 `npm run build && npm run lint`，无法运行则说明。
5. 视觉检查优先查最新 `visual-snapshots` 截图；真实截图、代码推断与动画交互测试分开陈述。
6. 提交后回报文件、commit 链接、检查结果与实际部署状态；不要将“已推送”视为“部署成功”。
7. 任何未公开完整剧本、素材或私人资料不得提交公开仓库。不要把完整作品放进静态资源后只用前端隐藏。
8. 中文 commit 信息，一个主题一个 commit；涉及不可逆变更提前沟通。

## 私有知识说明

完整访谈、工具熟练度、个人求职经历、修改案例收录在用户的**个人私有 Library／当前 ChatGPT 项目文件**（文件名：`雪雪个人网站_私有访谈档案_v1.md`）。这份档案**不在本公开仓库**；如果未来会话无法访问，应说明限制，不能凭空补全。仅把获准公开、必须协作的规则写在这里。
