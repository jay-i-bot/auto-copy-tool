# 📋 自动复制工具 - Auto Copy Tool

一个简单实用的自动复制工具，专为手机语音输入到电脑而设计。部署在 Cloudflare Workers 上，完全免费使用。

## ✨ 特性

- 🎤 **完美配合语音输入**：支持微信输入法等语音输入，手机说话电脑打字
- ⚡ **实时自动复制**：每 0.5 秒自动复制到剪贴板
- 🔄 **自动清空模式**：支持连续短输入，复制后 1 秒自动清空
- 📱 **移动端优化**：响应式设计，完美适配手机屏幕
- 💾 **状态记忆**：自动保存设置，下次打开自动恢复
- 🎨 **界面美观**：渐变色设计，操作直观

## 🎯 使用场景

### 主要场景：手机语音输入 → 电脑使用

1. **手机端**：打开网页，使用微信输入法语音输入
2. **自动复制**：内容每 0.5 秒自动复制到剪贴板
3. **电脑端**：配合微信输入法的跨设备粘贴功能，直接 `Ctrl+V` 粘贴

### 适合这些情况

- ✍️ 写长文档、论文、报告
- 💬 快速回复工作消息
- 📝 整理会议记录
- 💭 记录灵感想法
- 🗣️ 任何需要大量文字输入的场景

## 🚀 快速开始

### 在线使用

直接访问部署好的网页即可使用（替换为你的域名）：
```
https://your-worker.workers.dev
```

### 自己部署

#### 方式一：Cloudflare Workers（推荐）

1. 注册 [Cloudflare](https://cloudflare.com) 账号
2. 进入 `Workers & Pages`
3. 创建新的 Worker
4. 复制 `worker.js` 的代码粘贴进去
5. 点击 `Save and Deploy`
6. 完成！获得你的专属链接

#### 方式二：本地运行
```bash
# 克隆仓库
git clone https://github.com/your-username/auto-copy-tool.git

# 进入目录
cd auto-copy-tool

# 使用任何 HTTP 服务器运行，例如：
python -m http.server 8000

# 或使用 Node.js
npx serve
```

然后在浏览器打开 `http://localhost:8000`

## 📖 功能说明

### 自动复制

- 输入内容后，每 0.5 秒自动复制到剪贴板
- 只在内容变化时显示复制提示
- 实时显示已复制的字符数

### 自动清空模式

开启后：
- 复制成功后 1 秒自动清空输入框
- 适合连续输入多个短句
- 如果 1 秒内继续输入，会取消自动清空
- 设置会自动保存到本地

### 手动清空

点击"清空并继续输入"按钮：
- 立即清空输入框
- 自动聚焦到输入框
- 取消自动清空计时器

## 💡 使用技巧

### 配合微信输入法使用

1. **手机端设置**：
   - 安装微信输入法
   - 开启"跨设备粘贴"功能
   - 登录同一个微信账号

2. **电脑端设置**：
   - 安装微信输入法（或微信 PC 版也支持）
   - 开启"跨设备粘贴"功能
   - 登录同一个微信账号

3. **使用流程**：
```
   手机语音输入 → 自动复制 → 电脑直接粘贴
```

### 添加到手机桌面

**iOS (Safari)**:
1. 点击分享按钮
2. 选择"添加到主屏幕"
3. 像 App 一样使用

**Android (Chrome)**:
1. 点击菜单（三个点）
2. 选择"添加到主屏幕"
3. 像 App 一样使用

## 🛠️ 技术栈

- **前端**：原生 HTML + CSS + JavaScript
- **部署**：Cloudflare Workers
- **API**：Clipboard API (navigator.clipboard)

## 📝 代码结构
```
auto-copy-tool/
├── worker.js          # Cloudflare Workers 入口文件
├── README.md          # 项目说明文档
└── LICENSE            # 开源协议
```

## ⚙️ 配置选项

可以在代码中修改以下参数：
```javascript
// 自动复制间隔（毫秒）
const COPY_INTERVAL = 500;  // 默认 0.5 秒

// 自动清空延迟（毫秒）
const AUTO_CLEAR_DELAY = 1000;  // 默认 1 秒
```

## 🔒 隐私说明

- ✅ 所有数据仅在本地处理
- ✅ 不会上传任何内容到服务器
- ✅ 不收集任何用户信息
- ✅ 开关状态仅保存在浏览器本地存储

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发建议
```bash
# Fork 本仓库
# 创建你的特性分支
git checkout -b feature/AmazingFeature

# 提交你的更改
git commit -m 'Add some AmazingFeature'

# 推送到分支
git push origin feature/AmazingFeature

# 打开 Pull Request
```

## 📄 开源协议

本项目采用 MIT 协议 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- 感谢 Cloudflare 提供免费的 Workers 服务
- 感谢微信输入法提供跨设备粘贴功能

## 📮 联系方式

- 作者：[你的名字]
- 项目地址：[https://github.com/your-username/auto-copy-tool](https://github.com/XiaoyuZhuang/auto-copy-tool)
- 问题反馈：[Issues](https://github.com/XiaoyuZhuang/auto-copy-tool/issues)

---

如果觉得这个项目对你有帮助，请给个 ⭐ Star 支持一下！
