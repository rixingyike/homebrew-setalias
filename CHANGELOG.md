# Changelog

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
