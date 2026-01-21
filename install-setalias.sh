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
    curl -L -o "$TEMP_FILE" "$DOWNLOAD_URL"
elif command -v wget >/dev/null 2>&1; then
    wget -O "$TEMP_FILE" "$DOWNLOAD_URL"
else
    echo "❌ 错误: 未找到 curl 或 wget，无法下载。"
    exit 1
fi

if [ ! -f "$TEMP_FILE" ]; then
    echo "❌ 下载失败。"
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
"$INSTALL_SCRIPT" "$@"

echo ""
echo -e "${GREEN}✨ 远程安装脚本执行完毕!${NC}"
