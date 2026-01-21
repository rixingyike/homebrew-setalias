cask "setalias" do
  version "2.5.5"
  sha256 "3744144ff1a03079b4cc6bdd7ca36705387756b57540167ecc66b6f29fe45960"

  url "https://github.com/rixingyike/homebrew-setalias/releases/download/v2.5.5/SetAlias.dmg"
  name "SetAlias"
  desc "程序员喜欢用的终端写作工具"
  homepage "https://github.com/rixingyike/homebrew-setalias"

  app "SetAlias.app"

  zap trash: [
    "~/.setalias",
    "~/Library/Application Support/SetAlias",
  ]
end
