cask "setalias" do
  version "2.5.2"
  sha256 "246dbc3612757444f7b74f897bed1b9ef705932fd2e0c5ca8e354819a68a0721"

  url "https://github.com/rixingyike/homebrew-setalias/releases/download/v2.5.2/SetAlias.dmg"
  name "SetAlias"
  desc "程序员喜欢用的终端写作工具"
  homepage "https://github.com/rixingyike/homebrew-setalias"

  app "SetAlias.app"

  zap trash: [
    "~/.setalias",
    "~/Library/Application Support/SetAlias",
  ]
end
