cask "setalias" do
  version "2.4.3"
  sha256 "feee30ebf06670db4c72a84fb22fa9a45a1986b055955606b0f4b2f036f75951"

  url "https://github.com/rixingyike/homebrew-setalias/releases/download/v2.4.3/SetAlias.dmg"
  name "SetAlias"
  desc "程序员喜欢用的终端写作工具"
  homepage "https://github.com/rixingyike/homebrew-setalias"

  app "SetAlias.app"

  zap trash: [
    "~/.setalias",
    "~/Library/Application Support/SetAlias",
  ]
end
