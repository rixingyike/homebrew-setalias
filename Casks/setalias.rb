cask "setalias" do
  version "2.3.5"
  sha256 "926058ecadfb90d404a3993b6b4dbb2f616d4827f9144976523433c3ffae7c6b"

  url "https://github.com/rixingyike/homebrew-setalias/releases/download/v2.3.5/SetAlias.dmg"
  name "SetAlias"
  desc "程序员喜欢用的终端写作工具"
  homepage "https://github.com/rixingyike/homebrew-setalias"

  app "SetAlias.app"

  zap trash: [
    "~/.setalias",
    "~/Library/Application Support/SetAlias",
  ]
end
