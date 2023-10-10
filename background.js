import { getDiscordTabId, toggleMute, toggleDeafen } from "./utils.js";

chrome.commands.onCommand.addListener(async (command) => {
  const tabId = await getDiscordTabId();

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
});
