# hexo-game-career

> 游戏生涯记录站，通过 GitHub Pages 访问：`https://lanmercer.github.io/game/`

---

## 这个文件夹是什么

这是游戏站的**部署仓库**，存放静态 HTML/CSS/JS 和游戏截图，由 GitHub Desktop 管理并推送到 GitHub。

首页 `index.html` 由 `rebuild_index.py` 脚本自动生成，图片由 `update_game_site.py` 脚本从 `D:\trae.wangye\1\11\` 同步。**不建议手动编辑 `index.html`**。

---

## 目录结构

```
hexo-game-career/
├── index.html              # 游戏站首页（脚本自动生成，勿手动编辑）
│
├── css/
│   └── style.css           # 游戏站主样式（双轨布局、卡片、时间轴等）
│
├── js/
│   ├── lightbox.js         # 图片点击放大灯箱
│   ├── main.js             # 主交互脚本
│   ├── split-track.js      # 双轨布局脚本
│   ├── star-map.js         # 星空背景效果
│   └── timeline-scroll.js  # 时间轴滚动同步
│
├── assets/
│   └── images/
│       └── games/          # 游戏截图（88 个游戏文件夹）
│           ├── csgo2/      # 每个游戏按日期分子文件夹
│           │   ├── 2024.12/
│           │   ├── 2025.2/
│           │   └── 2025.12/
│           ├── delta-force/
│           │   ├── 2025.5/
│           │   ├── 2025.8/
│           │   └── 2025.10/
│           └── ...
│
├── 2021/ ~ 2026/           # 旧博客年份归档（遗留，可忽略）
├── archives/               # 旧归档页面（遗留）
├── categories/             # 旧分类页面（遗留）
├── tags/                   # 旧标签页面（遗留）
├── page/                   # 旧页面（遗留）
├── public/                 # 旧输出目录（遗留）
└── node_modules/           # Node.js 依赖（遗留）
```

---

## 页面结构

首页采用**双轨布局**：

```
┌─────────┬──────────────────────┬──────────────────────┐
│         │    单机游戏（左轨）    │    联机游戏（右轨）    │
│  历程    │                      │                      │
│  导航    │  [游戏卡片]           │  [游戏卡片]           │
│  侧栏    │  [游戏卡片]           │  [游戏卡片]           │
│         │  [游戏卡片]           │  [游戏卡片]           │
│ 2021    │  ...                 │  ...                 │
│ 2022    │                      │                      │
│ ...     │                      │                      │
│ 2026    │                      │                      │
└─────────┴──────────────────────┴──────────────────────┘
```

- 每个日期文件夹生成一张独立卡片
- 卡片按时间正序排列（2021 → 2026）
- 点击左侧年份/月份可跳转到对应位置
- 点击图片可放大查看（灯箱效果）

---

## 如何更新游戏内容

### 1. 添加新游戏截图

将截图放入 `D:\trae.wangye\1\11\单机\` 或 `D:\trae.wangye\1\11\联机\` 下对应游戏文件夹的日期子文件夹中。

### 2. 运行脚本

```bash
cd hexo-game-career-backup/scripts
python update_game_site.py    # 同步新图片到 assets/
python rebuild_index.py       # 重新生成 index.html
```

### 3. 部署

打开 GitHub Desktop，选择 `hexo-game-career`，提交并推送。

---

## 注意事项

- `index.html` 由脚本生成，手动修改会在下次重新生成时被覆盖
- 样式和脚本的源码备份在 `hexo-game-career-backup` 中
- 游戏截图的原始文件在 `D:\trae.wangye\1\11\` 中，assets 只是同步副本
- 本地预览：`python -m http.server 4001`，访问 `http://localhost:4001/`
