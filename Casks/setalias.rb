cask "setalias" do
  version "2.5.8"
  sha256 "a6ab5e5d9b9a76c9edc85c89c362f6a6c7f6f1d55279e1633e22e29836a83072"

  url "https://github.com/rixingyike/homebrew-setalias/releases/download/v2.5.8/SetAlias.dmg"
  name "SetAlias"
  desc "程序员喜欢用的终端写作工具"
  homepage "https://github.com/rixingyike/homebrew-setalias"

  app "SetAlias.app"

  zap trash: [
    "~/.setalias",
    "~/Library/Application Support/SetAlias",
  ]
end
