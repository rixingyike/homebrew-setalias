cask "setalias" do
  version "2.5.9"
  sha256 "8361e9f7af94aed86089a6992ce8481c98a993f67441c8cd8851528066c5a5aa"

  url "https://github.com/rixingyike/homebrew-setalias/releases/download/v2.5.9/SetAlias.dmg"
  name "SetAlias"
  desc "程序员喜欢用的终端写作工具"
  homepage "https://github.com/rixingyike/homebrew-setalias"

  app "SetAlias.app"

  zap trash: [
    "~/.setalias",
    "~/Library/Application Support/SetAlias",
  ]
end
