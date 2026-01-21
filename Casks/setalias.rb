cask "setalias" do
  version "2.5.7"
  sha256 "49e9cb5d53b8f5439c16982be79974ed2e62f2519caf0e9c36b07019dfc07634"

  url "https://github.com/rixingyike/homebrew-setalias/releases/download/v2.5.7/SetAlias.dmg"
  name "SetAlias"
  desc "程序员喜欢用的终端写作工具"
  homepage "https://github.com/rixingyike/homebrew-setalias"

  app "SetAlias.app"

  zap trash: [
    "~/.setalias",
    "~/Library/Application Support/SetAlias",
  ]
end
