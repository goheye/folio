# folio — 海燕的个人作品集

沉浸式"创作房间"主题的单页作品集网站。纯静态 SPA，无后端。

## 技术栈（固定，勿引入替代品）

- **Vite 8 + React 19 + TypeScript**：纯客户端 SPA，构建产物是纯静态文件
- **Tailwind CSS v4**：通过 `@tailwindcss/postcss` 接入；页面主体样式是 `src/styles/globals.css` 里的手写 CSS 类
- **shadcn/ui**：组件按需添加，绝不全量拷贝；图标统一用 lucide-react
- 部署：GitHub Actions → Cloudflare（见 .github/workflows/deploy.yml）

**架构红线**：不要引入服务端框架（Next/Nuxt/Astro）、不要加运行时依赖、不要改动部署产物形态。若未来确需动态能力，先读 DECISIONS.md 的"损失台账"再讨论。

## 目录

```
index.html            入口（标题/meta/OG 都在这里改）
src/main.tsx          React 挂载
src/App.tsx           全站唯一页面（栏目、剧本数据都硬编码在这里）
src/styles/globals.css  全部样式 + 设计 token（:root 变量）
src/lib/utils.ts      cn() 工具
src/components/ui/    shadcn 组件落地处（按需 npx shadcn add）
public/               静态资源（favicon、背景图 forest-studio.png）
```

## 常用命令

```bash
npm run dev       # 开发服务器 http://localhost:3000
npm run build     # 类型检查 + 构建 → dist/
npm run preview   # 本地预览构建产物（= 部署的东西）
npm run lint      # oxlint
npm run format    # oxfmt
npx shadcn add <组件名>   # 添加 UI 组件（自动装依赖）
```

## 设计系统（新页面/改样式必须遵守）

**主题概念**：森林里的创作房间——实景摄影背景、深绿基调、玻璃拟态、漂浮光点。

**调色板（只用这些变量，禁止即兴色值）**：
`--forest: #173c32`（主深绿）· `--forest-deep: #0d2a23`（背景加深）· `--leaf: #81b66b`（叶绿点缀）· `--mint: #dcefd3`（薄荷浅底）· `--cream: #fbf8ea`（奶油底）· `--sun: #f4d38a`（暖阳强调）· `--ink: #1c322c`（正文墨色）

**字体**：大标题/名字用衬线 `Georgia, "Songti SC", serif`；正文 `Arial, "PingFang SC", "Microsoft YaHei", sans-serif`。中文站必须保留中文字体栈。

**质感参数**：卡片圆角 34px；统一缓动 `cubic-bezier(.2,.8,.2,1)`；玻璃拟态 `rgba(20,57,47,.54) + backdrop-filter: blur(18px) saturate(1.15)`；描边 `rgba(255,255,255,.38)`；入场动画 800ms。

**图标**：一律 lucide-react，禁止混用其他图标库或 emoji。

## 反 AI 味规则（改界面前自查）

1. 颜色/间距/阴影从 token 和既有 CSS 类取值，禁止临时发明十六进制色
2. 禁止全大写 + 宽字距小标签的滥用；分隔符"·"只用于确实并列的信息
3. 动效"大胆只用一处"：一个页面最多一个记忆点动画，其余克制
4. 结构元素（编号、边框、分割线）必须承载真实信息，不做装饰
5. 留白宁多勿少；卡片堆叠和 SaaS 后台式布局一律禁止
6. 文案用完整自然的中文句子，不用翻译腔

## 工作规则

- 组件改动走 shadcn CLI 添加，样式改动走 globals.css 的类/变量，二者不混
- 改完必须 `npm run build && npm run lint` 全绿才算完成
- 涉及视觉的改动，用应用内浏览器截图自查（桌面 1280×720 + 移动 390×844）
- 提交信息用中文，一个主题一个 commit
