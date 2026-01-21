cask "setalias" do
  version "2.4.1"
  sha256 "b6e022ee8e4910190bec987b5b15eb12b7f8bfdd05c8d18815c54ba71f1f4302"

  url "https://github.com/rixingyike/homebrew-setalias/releases/download/v2.4.1/SetAlias.dmg"
  name "SetAlias"
  desc "程序员喜欢用的终端写作工具"
  homepage "https://github.com/rixingyike/homebrew-setalias"

  app "SetAlias.app"

  zap trash: [
    "~/.setalias",
    "~/Library/Application Support/SetAlias",
  ]
end
