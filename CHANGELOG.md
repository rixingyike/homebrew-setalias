# Changelog

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
