const durationRegexes = [
  /(\d{1,3})s(?:Eng|Hin)/i,
  /(?:HIN|ENG)[^\d]*(\d{1,3})/i
];

// Keep track of active mutes with their expiration times
const activeMutes = new Map(); // tabId -> expirationTimestamp

chrome.webRequest.onBeforeRequest.addListener(
  async (details) => {
    const url = new URL(details.url);
    console.log("url", url);
    const adName = url.searchParams.get("adName");
    
    if (!adName) return;
    
    // Immediately mute all Hotstar tabs
    const tabs = await chrome.tabs.query({ url: "*://*.hotstar.com/*" });
    for (const tab of tabs) {
      if (!tab.mutedInfo.muted) {
        chrome.tabs.update(tab.id, { muted: true });
      }
      
      // Determine duration for unmuting
      let durationSec = 10; // Default duration
      for (const regex of durationRegexes) {
        const match = adName.match(regex);
        if (match) {
          durationSec = parseInt(match[1], 10);
          break;
        }
      }
      
      // Set a new expiration time for this tab
      const expirationTime = Date.now() + (durationSec + 2) * 1000;
      activeMutes.set(tab.id, expirationTime);
      
      console.log(`Muted tab ${tab.id} for ${durationSec} seconds, expires at ${new Date(expirationTime).toISOString()}`);
      
      // Set a timer to check if we should unmute after duration
      setTimeout(() => {
        checkAndUnmuteTab(tab.id);
      }, (durationSec + 2) * 1000);
    }
  },
  {
    urls: ["*://*.hotstar.com/*"]
  }
);

// Function to check if we should unmute a tab
function checkAndUnmuteTab(tabId) {
  const expirationTime = activeMutes.get(tabId);
  const currentTime = Date.now();
  
  // Only unmute if this is the latest expiration time for the tab
  // and the expiration time has been reached
  if (expirationTime && currentTime >= expirationTime) {
    chrome.tabs.get(tabId, (tab) => {
      if (tab && tab.mutedInfo.muted) {
        console.log(`Unmuting tab ${tabId} as its mute period has expired`);
        chrome.tabs.update(tabId, { muted: false });
      }
    });
    activeMutes.delete(tabId);
  } else {
    console.log(`Not unmuting tab ${tabId} - another ad request is still active`);
  }
}