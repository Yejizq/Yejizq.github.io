# zq_electric 博客 — 项目调试日志

## 基本信息

| 项目 | 值 |
|------|-----|
| **博客名称** | zq_electric |
| **线上地址** | https://yejizq.github.io |
| **GitHub 仓库** | `Yejizq/Yejizq.github.io` |
| **GitHub 用户名** | Yejizq |
| **建站日期** | 2026-06-20 |
| **技术栈** | 纯静态 HTML/CSS/JS（无框架、无需 Node.js） |

## 目录结构

```
BLOG/
├── index.html          # 首页（卡片布局）
├── search.html         # 搜索页
├── projects.html       # 项目展示
├── categories.html     # 分类页
├── tags.html           # 标签云
├── archives.html       # 归档页
├── friends.html        # 友链页
├── about.html          # 关于页
├── CLAUDE.md           # 本文件
├── .gitignore          # 排除 Snipaste_*.png
├── css/
│   └── style.css       # 全局样式（深色主题）
├── js/
│   ├── config.js       # ★ 个人信息配置（改这里！）
│   ├── posts.js        # ★ 文章数据列表
│   └── main.js         # 主逻辑（侧边栏/搜索/渲染）
├── img/
│   ├── BLOG头像.png    # 头像文件
│   └── avatar.svg      # 默认头像占位
└── posts/
    ├── post-001.html   # STM32 UART 教程
    ├── post-002.html   # ESP32+DHT22 项目
    ├── post-003.html   # KiCad PCB 入门
    ├── post-004.html   # BUCK 电源电路
    └── post-005.html   # FreeRTOS 实战
```

## 配置文件说明

### `js/config.js` — 个人信息（修改后需推送）

```js
SITE_CONFIG.author.avatar   → 头像路径
SITE_CONFIG.author.name     → 作者名
SITE_CONFIG.author.bio      → 简介
SITE_CONFIG.social          → 社交链接数组 [{icon, label, url}]
SITE_CONFIG.siteSince       → 建站日期 'YYYY-MM-DD'
SITE_CONFIG.footerText      → 页脚文字
SKILLS                      → 技能标签
FRIENDS                     → 友链数据
```

### `js/posts.js` — 文章列表

每篇文章格式：
```js
{ id, title, date, categories: [], tags: [], cover: '', description, url }
```
- `cover` 留空会显示 📄 占位符
- `url` 指向 `posts/post-xxx.html`

## 部署流程

```bash
# 修改文件后
cd "D:/VS_CODE_FILE/BLOG"
git add -A
git commit -m "描述改动"
git push
# 等 1-2 分钟，刷新 https://yejizq.github.io (Ctrl+F5)
```

## 历史问题 & 修复记录

| 日期 | 问题 | 原因 | 修复 |
|------|------|------|------|
| 06-20 | 头像不显示 | `.gitignore` 中 `*.png` 排除了所有PNG | 改为 `Snipaste_*.png` |
| 06-20 | 运行天数显示170 | `siteSince: 2026` 被当成2026-01-01 | 改为 `'2026-06-20'` |
| 06-20 | 侧边栏改config不生效 | 侧边栏硬编码在HTML里 | 改为JS动态读取config.js |
| 06-20 | 邮箱是mailto链接 | 用户希望邮箱为纯文本 | sidebar和about页邮箱改为span |

## 添加新文章

1. 复制 `posts/post-001.html` → 改名为 `posts/post-006.html`
2. 修改文章内容（标题、正文）
3. 在 `js/posts.js` 的 `POSTS` 数组中添加条目
4. 提交推送

## GitHub Pages 设置

- Settings → Pages → Source: Deploy from a branch
- Branch: `main` / `/(root)`
- 注意：仓库名必须是 `Yejizq.github.io`（之前误建为 `-Yejizq.github.io` 已修复）
