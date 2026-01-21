cask "setalias" do
  version "2.4.0"
  sha256 "6e3d1443cde8c155ce795b604a452ed143ec141b0b95c8c3f6638fe2042c29c4"

  url "https://github.com/rixingyike/homebrew-setalias/releases/download/v2.4.0/SetAlias.dmg"
  name "SetAlias"
  desc "程序员喜欢用的终端写作工具"
  homepage "https://github.com/rixingyike/homebrew-setalias"

  app "SetAlias.app"

  zap trash: [
    "~/.setalias",
    "~/Library/Application Support/SetAlias",
  ]
end
