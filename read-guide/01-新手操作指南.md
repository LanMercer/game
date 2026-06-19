# 游戏生涯记录站 - 新手内容管理指南

> 本指南帮助你轻松管理游戏记录，无需触碰代码即可添加内容。

---

## 📁 项目结构速览

```
hexo-game-career/
├── _config.yml              # 网站配置（标题、描述等）
├── source/
│   ├── _posts/              # 📝 游戏记录文章（你主要操作的地方）
│   │   ├── elden-ring.md    # 示例：单机游戏
│   │   └── it-takes-two.md  # 示例：联机游戏
│   │   └── README.md        # 使用说明
│   └── assets/              # 📸 图片和视频存放处
│       ├── images/games/    # 游戏截图
│       └── videos/games/    # 游戏视频
├── themes/
│   └ game-career/           # 主题文件（一般不需要修改）
└── scaffolds/
    └ game.md                # 文章模板
```

---

## 🚀 快速开始：添加一条游戏记录

### 方法一：使用命令创建（推荐）

**步骤 1** - 打开终端，进入项目目录：

```bash
cd d:\trae.wangye\hexo-game-career
```

**步骤 2** - 使用模板创建新文章：

```bash
hexo new game "游戏名称"
```

例如：
```bash
hexo new game "塞尔达传说：王国之泪"
```

**步骤 3** - 打开生成的文件（在 `source/_posts/` 目录下），填写信息。

---

### 方法二：复制模板手动创建

**步骤 1** - 复制 `scaffolds/game.md` 到 `source/_posts/` 目录

**步骤 2** - 重命名为 `游戏名称.md`

**步骤 3** - 修改文件开头的 Front-matter 信息

---

## 📝 Front-matter 填写指南

文章开头的 `---` 之间的内容叫 **Front-matter**，用于定义游戏信息。

### 必填字段

```yaml
title: "游戏名称"           # 文章标题
date: 2024-06-20 14:30:00   # 记录日期
game_id: "game-id"          # 游戏唯一标识（同一游戏的多条记录用相同ID）
track: "single"             # 轨道类型：single（单机）或 multi（联机）
```

### 常用字段

```yaml
platform: "PC"              # 平台：PC / PS5 / Switch / Xbox / Mobile
play_time: "50"             # 游玩时长（小时）
rating: 9                   # 评分（1-10）
description: "简短描述"      # 卡片展示的描述文字（建议50字以内）
```

### 标签分类

```yaml
categories:
  - 单机游戏                # 或 联机游戏

tags:
  - RPG                     # 游戏类型标签
  - 开放世界
  - 高难度
```

---

## 📸 添加图片

### 步骤 1：创建图片目录

在 `source/assets/images/games/` 下创建游戏专属目录：

```
source/assets/images/games/塞尔达传说/
```

### 步骤 2：放入图片

将游戏截图放入该目录，建议命名：
- `screenshot1.jpg`
- `screenshot2.jpg`
- `boss-fight.jpg`
- `ending.jpg`

### 步骤 3：在文章中引用

**单张图片**：
```yaml
photos:
  - /assets/images/games/塞尔达传说/screenshot1.jpg
```

**多张图片（自动变成相册）**：
```yaml
photos:
  - /assets/images/games/塞尔达传说/screenshot1.jpg
  - /assets/images/games/塞尔达传说/screenshot2.jpg
  - /assets/images/games/塞尔达传说/boss-fight.jpg
```

> 💡 **提示**：多张图片会自动变成可滑动的相册，最多显示前10张。

---

## 🎬 添加视频

### 步骤 1：放入视频文件

将视频放入 `source/assets/videos/games/游戏名/` 目录。

### 步骤 2：在文章中引用

```yaml
videos:
  - /assets/videos/games/塞尔达传说/gameplay.mp4
```

> 💡 **提示**：视频会在卡片中显示"视频"按钮，点击后全屏播放。

---

## 🎮 单机游戏 vs 联机游戏

### 单机游戏（track: single）

额外可用字段：
```yaml
completion_rate: 80         # 完成度（百分比）
achievements:               # 成就列表
  - "全收集"
  - "无伤通关"
```

### 聯机游戏（track: multi）

额外可用字段：
```yaml
partners:                   # 一起游玩的好友
  - "小明"
  - "小红"

game_moments:               # 游戏瞬间标签
  - 搞笑操作
  - 纪念通关
  - 极限翻盘
```

---

## ✅ 完整示例

### 单机游戏示例

```yaml
---
title: "塞尔达传说：王国之泪"
date: 2024-06-20 14:30:00
game_id: "zelda-totk"
track: "single"
game_type: "action"
platform: "Switch"
play_time: "120"
clear_date: "2024-08-15"
rating: 10
description: "海拉鲁大陆的又一次奇迹，创造的力量让每个角落都充满惊喜。"
categories:
  - 单机游戏
tags:
  - 动作
  - 开放世界
  - 解谜
photos:
  - /assets/images/games/塞尔达传说/sky-island.jpg
  - /assets/images/games/塞尔达传说/construct.jpg
  - /assets/images/games/塞尔达传说/ending.jpg
videos: []
completion_rate: 95
achievements:
  - "全神庙"
  - "全克洛格"
---

## 游戏心得

这是我玩过的最自由的游戏...

### 最难忘的时刻

- 第一次飞上天空岛屿
- 用自制飞机探索地下
- 最终Boss战的震撼

### 小技巧分享

- Ultrahand 可以组合武器
- 回溯功能可以无限刷材料
```

### 联机游戏示例

```yaml
---
title: "Apex Legends 赛季回忆"
date: 2024-03-10 20:00:00
game_id: "apex-2024"
track: "multi"
game_type: "fps"
platform: "PC"
play_time: "200"
rating: 8
description: "和队友们从青铜打到钻石，每一场都是心跳加速的战斗。"
categories:
  - 联机游戏
tags:
  - FPS
  - 竞技
  - 团队配合
photos:
  - /assets/images/games/Apex/diamond-rank.jpg
  - /assets/images/games/Apex/team-win.jpg
videos:
  - /assets/videos/games/Apex/clutch-moment.mp4
partners:
  - "老王"
  - "阿杰"
game_moments:
  - 极限翻盘
  - 搞笑操作
---

## 联机回忆

和老王、阿杰的三人小队...

### 最搞笑的瞬间

- 老王跳伞直接掉进敌人堆里
- 阿杰用充能步枪打自己
- 三个人同时被同一个陷阱炸飞
```

---

## 🔧 生成和预览网站

### 生成静态文件

```bash
hexo generate
```

### 本地预览

```bash
hexo server
```

然后打开浏览器访问：http://localhost:4000

### 一键生成+预览

```bash
hexo generate && hexo server
```

---

## 🌐 部署到线上

### 部署到 GitHub Pages

**步骤 1** - 修改 `_config.yml`：

```yaml
deploy:
  type: git
  repo: https://github.com/你的用户名/你的仓库.git
  branch: main
```

**步骤 2** - 安装部署插件：

```bash
npm install hexo-deployer-git --save
```

**步骤 3** - 部署：

```bash
hexo deploy
```

---

## ❓ 常见问题

### Q: 图片不显示？

检查路径是否正确：
- 路径以 `/assets/` 开头
- 文件名大小写一致
- 图片文件确实存在

### Q: 卡片不显示？

检查 Front-matter：
- `track` 字段必须是 `single` 或 `multi`
- `---` 分隔符前后不能有空格
- YAML 格式正确（缩进、引号）

### Q: 相册不滑动？

确保：
- 有 2 张以上图片
- Swiper 已加载（检查浏览器控制台）

### Q: 时间轴不显示年份？

确保文章有 `date` 字段且格式正确。

---

## 📚 更多资源

- Hexo 官方文档：https://hexo.io/docs/
- Markdown 语法：https://www.markdownguide.org/
- Nord 配色方案：https://www.nordtheme.com/

---

## 🎉 完成！

现在你已经掌握了添加游戏记录的全部技能。开始记录你的游戏生涯吧！

```bash
# 创建新记录
hexo new game "你的游戏"

# 生成预览
hexo generate && hexo server
```

祝记录愉快！ 🎮