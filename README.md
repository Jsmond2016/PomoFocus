# PomoFocus - 优雅的番茄工作法计时器

![PomoFocus Banner](./public/pomoFocus.png)

## 项目概述

PomoFocus 是一个精心设计的番茄工作法计时器网页应用，帮助用户提高专注力和工作效率。该项目实现了番茄工作法的核心功能，采用现代化前端技术栈构建，具有响应式设计和流畅的用户体验。

**在线体验**：https://jsmond2016.github.io/PomoFocus/

## 技术栈

- **前端框架**：Vue 3.3+
- **构建工具**：Vite 5.0+
- **样式框架**：Tailwind CSS 3.4+
- **状态管理**：Pinia
- **路由**：Vue Router 4
- **语言**：TypeScript 5.0+
- **测试**：Vitest
- **代码规范**：ESLint + Prettier

## 功能特性

### 🍅 核心计时功能
- 预设番茄时长：25分钟（标准）、30分钟、45分钟
- 自定义时间设置（1-120分钟）
- 开始/暂停/重置控制
- 实时进度条可视化
- 结束提示音效

### ✨ 用户体验增强
- 响应式设计（适配移动端和桌面端）
- 平滑过渡动画
- 时间结束视觉反馈（颜色变化+脉动动画）
- 番茄工作法说明卡片
- 按钮交互反馈（悬停/点击效果）

### ⚙️ 技术亮点
- 基于 Vue 3 Composition API
- TypeScript 类型安全
- 模块化组件设计
- 响应式状态管理
- 现代化构建流程

## 使用指南

### 开发环境搭建

1. 克隆仓库：
```bash
git clone https://github.com/Jsmond2016/PomoFocus.git
cd PomoFocus
```

2. 安装依赖：
```bash
pnpm install
```

3. 启动开发服务器：
```bash
pnpm dev
```

4. 构建生产版本：
```bash
pnpm build
```

### 操作说明

- 选择预设时间（25min/30min/45min）或输入自定义时间
- 点击"开始"按钮启动番茄钟
- 专注工作直到计时结束
- 计时结束后会有声音提醒和视觉反馈
- 使用"暂停"临时中断或"重置"重新开始

## 项目结构

```
PomoFocus/
├── public/                 # 静态资源
│   ├── favicon.ico
│   └── pomoFocus.png
├── src/                    # 源代码
│   ├── assets/            # 资源文件
│   ├── components/        # Vue 组件
│   ├── router/           # 路由配置
│   ├── stores/           # Pinia 状态管理
│   ├── views/            # 页面组件
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── package.json          # 项目配置
├── vite.config.ts        # Vite 配置
├── tailwind.config.js    # Tailwind 配置
├── tsconfig.json         # TypeScript 配置
└── README.md
```

## 贡献指南

欢迎贡献！请遵循以下流程：

- Fork 项目仓库
- 创建特性分支 (`git checkout -b feature/your-feature`)
- 提交更改 (`git commit -am 'Add some feature'`)
- 推送到分支 (`git push origin feature/your-feature`)
- 创建 Pull Request

**编码规范**

- Vue 3：使用 Composition API
- TypeScript：严格类型检查
- 样式：Tailwind CSS 工具类优先
- 提交信息：符合 Conventional Commits 规范

## 许可证

本项目采用 MIT 许可证，详情请见 [LICENSE](./LICENSE) 文件。
