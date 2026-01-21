#!/bin/bash
# Install SetAlias - One-line installer
# Usage: curl -o- https://raw.githubusercontent.com/rixingyike/homebrew-setalias/main/install-setalias.sh | bash

set -e

# Configuration
REPO="rixingyike/homebrew-setalias"
ZIP_NAME="SetAlias.zip"
DOWNLOAD_URL="https://github.com/$REPO/releases/latest/download/$ZIP_NAME"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=== SetAlias 远程安装程序 ===${NC}"
echo ""

# 1. Prepare temp directory
TEMP_DIR=$(mktemp -d)
TEMP_FILE="$TEMP_DIR/$ZIP_NAME"

cleanup() {
    rm -rf "$TEMP_DIR"
}
trap cleanup EXIT

# 2. Download
echo -e "⬇️  正在下载最新版本..."
echo "    来源: $DOWNLOAD_URL"
echo ""

if command -v curl >/dev/null 2>&1; then
    curl -L -f -o "$TEMP_FILE" "$DOWNLOAD_URL"
elif command -v wget >/dev/null 2>&1; then
    wget -O "$TEMP_FILE" "$DOWNLOAD_URL"
else
    echo "❌ 错误: 未找到 curl 或 wget，无法下载。"
    exit 1
fi

if [ ! -f "$TEMP_FILE" ]; then
    echo "❌ 下载失败 (文件未创建)。"
    exit 1
fi

# Check file size (should be > 1KB)
FILE_SIZE=$(wc -c < "$TEMP_FILE")
if [ "$FILE_SIZE" -lt 1000 ]; then
    echo "❌ 下载错误: 文件大小无效 ($FILE_SIZE bytes)."
    echo "原因可能是: "
    echo "  1. GitHub Release 刚刚发布，SetAlias.zip 还在构建上传中 (请等待 1-2 分钟)。"
    echo "  2. 该 Release 没有任何 Asset。"
    echo "内容预览:"
    cat "$TEMP_FILE"
    exit 1
fi

# 3. Unzip
echo ""
echo -e "📦 解压中..."
unzip -q "$TEMP_FILE" -d "$TEMP_DIR"

# 4. Install
echo ""
echo -e "🚀 启动本地安装程序..."
echo ""

# Make executable and run
INSTALL_SCRIPT="$TEMP_DIR/install.sh"
chmod +x "$INSTALL_SCRIPT"

# Execute install.sh
# Note: We execute it directly. It handles interactivity.
# Execute install.sh
# Note: We execute it directly. It handles interactivity.
# CRITICAL: We redirect stdin from /dev/tty because this script might be piped (curl | bash).
# Without </dev/tty, the read command inside install.sh would read from the pipe (file content) instead of keyboard.
if [ -t 0 ]; then
    "$INSTALL_SCRIPT" "$@"
else
    # Try to use /dev/tty if available (MacOS/Linux)
    if [ -e /dev/tty ]; then
        "$INSTALL_SCRIPT" "$@" < /dev/tty
    else
        # Git Bash on Windows often has /dev/tty, but if not found (rare), just run.
        # This might skip config if strictly piped, but it's the best fallback.
        cat <<EOF
⚠️  警告: 未检测到 TTY 设备。
如果配置步骤自动跳过，可能是因为使用的是管道模式 (curl | bash)。
安装完成后，请手动编辑 ~/.setalias/config.sh 进行配置。
EOF
        "$INSTALL_SCRIPT" "$@"
    fi
fi

echo ""
echo -e "${GREEN}✨ 远程安装脚本执行完毕!${NC}"
