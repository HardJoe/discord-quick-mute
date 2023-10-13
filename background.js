import { getDiscordTabId, toggleMute, toggleDeafen } from "./utils.js";

chrome.commands.onCommand.addListener(async (command) => {
  const tabId = await getDiscordTabId();

  if (tabId) {
    if (command === "toggle-mute") {
      chrome.scripting.executeScript({
        target: { tabId },
        func: toggleMute,
      });
    } else if (command === "toggle-deafen") {
      chrome.scripting.executeScript({
        target: { tabId },
        func: toggleDeafen,
      });
    }
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { isMuted, isDeafened } = message;

  if (isDeafened) {
    chrome.action.setIcon({ path: "icons/deafen.png" });
  } else if (isMuted) {
    chrome.action.setIcon({ path: "icons/mute.png" });
  } else {
    chrome.action.setIcon({ path: "icons/unmute.png" });
  }
});
