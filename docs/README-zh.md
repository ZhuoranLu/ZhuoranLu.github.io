# Zhuoran Lu 个人网站维护说明

网站使用 React、TypeScript、Vite 和 Tailwind CSS。[English](../README.md)

## 开发与检查

使用 Node.js 22.12 或更新版本及 npm：

```sh
npm ci
npm run dev
```

打开 Vite 输出的本地地址。检查并预览生产版本：

```sh
npm run check
npm run preview
```

`npm test` 运行行为测试与内容完整性检查；`npm run check` 同时执行测试、TypeScript 检查和生产构建。生成的 `dist/` 不提交到 Git。

## 更新内容

`src/data/` 是网站内容的唯一来源，直接编辑对应文件：

| 内容 | 文件 |
| --- | --- |
| 个人信息、简介、研究兴趣、CV 链接 | `src/data/profile.ts` |
| 论文、作者、奖项、缩略图、展示顺序 | `src/data/publications.ts` |
| Venue 分类与徽章颜色 | `src/data/venues.ts` |
| 筛选标签 | `src/data/filters.ts` |
| 新闻 | `src/data/news.ts` |
| 经历与学术服务 | `src/data/experiences.ts`、`src/data/service.ts` |
| 导航 | `src/data/nav.ts` |

论文按数组顺序展示，不自动排序。每篇论文使用唯一 ID，venue 从配置表选择，`focus` 和 `goal` 即使只有一个标签也使用数组。没有公开链接时省略 `url`；有链接时点击标题即可访问。作者支持 `**加粗**`、贡献标记，以及 `src/lib/inline.tsx` 中定义的少量行内语法。

公开资源放在 `public/`：例如 `public/images/papers/example.svg` 对应 `/images/papers/example.svg`。更新 CV 时添加 PDF，再修改 `profile.cvUrl`。保留已有公开文件名，避免以前分享的链接失效。`public/` 之外的历史 PDF、图片作为源资产保留，Vite 不会自动发布它们。

## 结构与部署

`src/pages/` 使用 `src/components/` 组装首页，论文筛选逻辑位于 `src/lib/`，相关测试与代码就近存放。样式和主题配置位于 `src/index.css`、`tailwind.config.ts`。

GitHub Actions 检查 PR。推送到 `master` 或手动运行部署工作流时，检查、构建并将 `dist/` 发布到 GitHub Pages；开发分支不会自动部署。网站从域名根路径提供服务，保留现有 hash 路由。

旧 Jekyll 实现保存在 Git 历史中，不再作为内容源或构建方式；无需安装 Ruby 或运行旧 Scholar 爬虫。

## 致谢

网站源自 [AcadHomepage](https://github.com/RayeRen/acad-homepage.github.io)，并受到 [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes) 和 [Academic Pages](https://github.com/academicpages/academicpages.github.io) 的影响。原 MIT 许可证与署名保留在 `LICENSE` 中。
