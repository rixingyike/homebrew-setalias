# Changelog

## [v2.4.0] - 2026-01-21
### 即装即用 (Out-of-the-Box)
- **全自动依赖安装**: 安装程序 `install.sh` 现在能接管一切繁琐的配置工作。
    - **Python 依赖**: 自动检测缺少的库 (requests, openai 等) 并通过 pip 安装。
    - **FFmpeg (Windows)**: 自动从 gyan.dev 下载、解压至 `~/SetAlias/bin` 并配置 PATH。
    - **FFmpeg (macOS)**: 自动从 evermeet.cx 下载并安装至 `/usr/local/bin` (需 sudo 权限)。
- **Windows (Git Bash)**: 对 Windows 用户的支持达到了一等公民级别，只需一行 curl 命令即可完成完整环境搭建。

## [v2.3.8] - 2026-01-21
### 新功能 (Windows 专属)
- **依赖自动安装**: 
    - Windows 安装程序现在会**自动检测并安装**缺失的 `jq` 工具。
    - 脚本会自动创建 `~/SetAlias/bin` 目录并下载官方二进制文件，免去用户手动下载配置 PATH 的繁琐步骤。
    - `setup.sh` 已更新，永久支持 `~/SetAlias/bin` 路径。

## [v2.3.7] - 2026-01-21
### 修复 (Hotfix)
- **Windows 安装修复**: 修复了 v2.3.6 版本中 `install.sh` 的语法错误 (syntax error) 导致安装中断的问题。
- **环境检测增强**: 
    - 自动识别 Windows 常用 Python 命令别名 (`python`)，解决"安装了 Python 但识别不到"的问题。
    - 为 Windows 用户提供直接下载 `jq.exe` 的 curl 命令提示。

## [v2.3.6] - 2026-01-21
### 新功能
- **Windows (Git Bash) 支持**: 安装脚本 `install.sh` 现已支持在 Windows 环境下运行（需 Git Bash）。
    - 自动识别操作系统，将应用安装至 `~/SetAlias`。
    - 自动跳过 macOS 专属检查（xattr, AppleScript）。
- **Linux 支持**: 理论支持 Ubuntu/Debian 等发行版（需安装 `git`, `curl`, `jq`, `ffmpeg`）。

### 优化
- **文档更新**: `README_INSTALL.md` 新增 Windows/Linux 安装指南。
- **字体兼容**: `gen_img` 脚本现已内置 Windows 常用中文字体路径 (`msyh`, `simhei`)。
- **Setup 增强**: `setup.sh` 自动兼容 `python` / `python3` 命令，适应 Windows 环境。

## [v2.3.5] - 2026-01-21
### 重大变更
- **零 Python 依赖 (Zero-Dependency Media)**: 多媒体处理栈（图片生成、音频/GIF 压缩）全面去 Python 化，转为直接调用 FFmpeg。
    - 移除 Python 库: `Pillow`, `pydub`, `pygifsicle`, `pyaudioop` (这些库经常因 Python 版本兼容性导致安装失败)。
    - 新增核心依赖: `ffmpeg` (必须安装: `brew install ffmpeg`)。
    - 好处: SetAlias 不再受系统 Python 版本混乱的影响，只要有 ffmpeg 就能稳定运行。

### 修复与优化
- **音频上传修复**: 修复了发布到墨问笔记后音频无法播放或编辑丢失的问题。修正了 Payload 中的 `audioUuid` 属性名及 `showNote` 初始化策略。
- **封面图生成**: `gen_img` 命令重写为 Shell 脚本，底层使用 `ffmpeg` 的 `drawtext` 滤镜，生成速度更快且无需 Python 环境。
- **环境兼容性**: `install.sh` 不再强制检查 Python 图像处理库，安装流程更顺滑。

## [v2.3.2] - 2026-01-20
### 修复与优化
- **Cnblogs 跳过优化**: `post_cnblogs.sh` 现在能正确识别配置为空的情况并静默跳过，`distribute.sh` 提供明确的“(配置缺失)”提示，不再误报“分发成功”。
- **全浏览器支持**: `msummary` 脚本新增对 Safari 和 Chrome 的 AppleScript 权限智能检测。
    - 自动识别权限被拒错误并给出针对性的开启引导（Safari/Chrome/Edge 步骤各异）。
    - 引入智能重试机制：检测到未登录或权限错误时，自动进入 10 秒倒计时循环，等待用户操作后无缝继续，无需重启脚本。
- **配置规范化**: 全局布尔开关 (`PUBLIC_TO_MYBLOG` 等) 统一支持 `true`/`false` 和 `1`/`0` 格式。
- **Web 脚本**: `x_autofollow_blueuser.js` 优化了 429 请求过多时的冷却等待逻辑。

## [v2.3.1] - 2026-01-19
### 新功能
- **Homebrew 支持**: 正式支持 Homebrew 安装！
    - 通过 Tap 安装: `brew tap rixingyike/setalias && brew install setalias`
    - 官方仓库: 官方 PR 已提交，即将支持 `brew install setalias`。
- **依赖检查**: `install.sh` 安装脚本新增智能依赖检查，自动检测并提示缺失的 Python 库 (`requests`, `openai`, `Pillow`, `pygifsicle`) 和系统工具 (`git`, `curl`, `jq`)。

## [v2.3.0] - 2026-01-19
### 新功能
- **全新 Logo**: 引入故宫红 (#C62828) 砖块风格 ASCII 艺术 Logo，提升启动体验。
- **隐私控制**: 新增 `SETA_MOWEN_NOTE_PUBLIC` 配置项，可设置笔记默认公开或非公开。
    - `mnew` 命令新增 `--public` 和 `--no-public` 参数，支持单次覆盖默认设置。
- **浏览器支持**: 安装程序支持检测并选择默认浏览器 (Edge, Google Chrome, Safari)，不再强制绑定 Edge。
- **配置优化**:
    - 支持跳过可选配置（Cnblogs, DeepSeek），留空即可。
    - 安装程序增加配置版本检测，支持从旧版平滑迁移。
- **交互优化**: 交互式输入自动去除首尾空行，避免笔记中出现多余空白。
- **专栏自动插入**: `mnew` 支持通过标签（如 `#生活·随笔·日常`）自动匹配并插入到配置的专栏中。
    - **全自动化**: 自动打开浏览器获取专栏内容，智能解析并更新。
    - **智能解析**: 内置 HTML 到 ProseMirror JSON 转换器，完美解决 Web API 返回 HTML 无法编辑的问题。
    - **健壮性**: 自动检测浏览器运行状态，自动处理多浏览器兼容。
- **多图一键粘贴**: `:img` 命令现在支持从 Finder 剪贴板一次性粘贴多张选中的图片，自动转换为 Markdown 链接列表。

### 修复与优化
- **编码安全**: 全面重构 `insert_to_column.sh`，消除潜在的不可见字符和编码错误。
- **环境隔离**: 修复 `launcher.sh` 的 PATH 优先级问题，确保开发环境 (`dev.sh`) 优先使用本地脚本。
- **API 兼容性**: 修正了 API 响应判断逻辑，正确识别 Open API 的成功响应 (`noteId`)。

## [v2.2.0] - 2026-01-13
### 新功能
- **多架构支持**: GitHub Actions 自动构建 Intel (`macos-15-intel`) 和 Apple Silicon (`macos-latest`) 两个版本的 DMG。
- **交互式安装**: `install.sh` 现支持交互式配置，安装时可按提示输入 API Key 等配置项。
- **文档自动同步**: 发布时自动将 `README.md` 和 `CHANGELOG.md` 同步到公开仓库。

### 重大变更
- **脚本重命名**: `open.sh` → `edit.sh`，避免与 macOS 系统 `open` 命令冲突。别名也相应从 `open` 改为 `edit`。

### 修复
- **编译兼容性**: 添加 `shc -r` 选项生成可重分发二进制，修复 "location has changed" 错误。
- **变量兼容性**: 修复 `BASH_SOURCE[0]` 在编译后二进制中的 unbound variable 错误。
- **符号链接修复**: `install.sh` 安装后自动重建符号链接（macOS DMG 复制会解引用符号链接）。
- **路径解析**: 修复脚本间调用时 `$SCRIPT_DIR` 解析错误，改用 PATH 查找。
- **清理旧文件**: 移除源码中遗留的旧编译产物，避免冲突。

### 优化
- **动态检测**: `install.sh` 使用动态检测 Mach-O 二进制创建符号链接，无需硬编码脚本列表。
- **Python 保留**: 不再删除 Python 源文件（`.pyc` 无法直接执行）。

## [v2.1.3] - 2025-12-28
- **修复**: 修复 `msummary` 脚本因墨问 API 参数变更导致的 HTTP 500 错误 (移除 `benchType` 参数)。
- **修复**: 修复 `mview.sh` 脚本在 Electron 应用激活时出现的 AppleScript 错误。
- **功能**: `msummary` 现已支持按照 `isPublic` (公开性) 和 `allowShare` (允许分享) 属性过滤笔记，只汇总公开笔记。

## [v2.1.2] - 2025-12-26
- **修复**: 修复 `msummary.sh` 中的 JSON 解析错误，确使用文件传递而非管道。
- **修复**: 修复 `mview.sh` 缺少辅助函数 (`execute_all_clicks` 等) 导致的 `command not found` 错误。
- **验证**: 全面恢复 `.mowen_view.sh` 的历史功能。

## [v2.1.1] - 2025-12-26
- 修改了若干已知问题。

## [v2.1.0] - 2025-12-25
- 修改了若干已知问题。

## [v1.0.0] - 2025-12-17

- **重构**: 全面重构 `.new.sh` 和 `.mowen_**.sh` 系列脚本，提升模块化与稳定性。
- **功能**: 新增 `.github/workflows/release.yml`，支持打 Tag 自动发布版本。
- **功能**: 实现末尾广告动态耗时计算（自动计算文章写作时长）。
- **优化**: 统一调试模式 (`SETA_DEBUG_MODE`) 与参数解析逻辑。
- **优化**: 增强 `.mowen_post.sh` 的 Markdown 解析精度（基于 Python 重写核心逻辑）。
- **兼容性**: 扩展剪贴板图片支持至 macOS 和 Windows (WSL/Git Bash)。
