![HOTSTAR IPL AD Muter](chrome/128.png?raw=true) 
# Hotstar Ad Muter

This tiny browser extension auto mutes certain ads in live sport streams on Hotstar like IPL by intercepting Hotstar's ad tracking pixels. It also dynamically determines how long to mute by guessing the duration of the ad from the ad identifier.

Provides respite to your ears by muting the following ads out of the box.

---

## Installation 

 **Clone** this repository to your computer 

   ```bash
   git clone https://github.com/akshaymohite/hotstar-ipl-ad-mute
   ```
   
   (alternatively, you can download the zip here: https://github.com/akshaymohite/hotstar-ipl-ad-mute/archive/refs/heads/main.zip)

## Google Chrome installation

1. **Open Chrome**, and go to `chrome://extensions/`
2. **Enable Developer Mode** in the top-right corner (if not already enabled)
3. Click on **"Load unpacked"**
4. Select `chrome` folder inside `hotstar-ipl-ad-mute` folder
5. Enjoy muted ads during live sport streams!

Note: For other Chromium-based browsers like **Microsoft Edge** or **Brave**, follow the same steps. Just change the url to `edge://extensions/` or `brave://extensions/`

## Mozilla Firefox installation
1. **Open Firefox**, and go to `about:debugging` 
2. Click **This Firefox**
3. Click **Load Temporary Add-on**
4. Select `manifest.json` file inside `hotstar-ipl-ad-mute/firefox` folder
5. Enjoy muted ads during live sport streams!

Note: The extension installs and remains installed until you remove it or restart Firefox.

## Caveats
- Sometimes broadcasters try to squeeze in one more ad before the next over begins. If the ad gets cut short abruptly, the live action may stay muted for a few extra seconds before the extension unmutes the tab
- This extension may break if Hotstar change their current tracking pixel URLs or change the format or keywords used in their ad identifiers

## License

MIT © 2025
