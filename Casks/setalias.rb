cask "setalias" do
  version "2.5.3"
  sha256 "d9bed559bbe2ba6c49954b694fed3729e5e8171e8efc84e5eedc41c3d45110fd"

  url "https://github.com/rixingyike/homebrew-setalias/releases/download/v2.5.3/SetAlias.dmg"
  name "SetAlias"
  desc "程序员喜欢用的终端写作工具"
  homepage "https://github.com/rixingyike/homebrew-setalias"

  app "SetAlias.app"

  zap trash: [
    "~/.setalias",
    "~/Library/Application Support/SetAlias",
  ]
end
