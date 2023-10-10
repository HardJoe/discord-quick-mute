import { getDiscordTabId, toggleMute, toggleDeafen } from "../utils.js";

const tabId = await getDiscordTabId();

const handleMute = () => {
  console.log(tabId);
  chrome.scripting.executeScript({
    target: { tabId },
    func: toggleMute,
  });
};

document.getElementById("muteButton").addEventListener("click", handleMute);

const handleDeafen = () => {
  chrome.scripting.executeScript({
    target: { tabId },
    func: toggleDeafen,
  });
};

document.getElementById("deafenButton").addEventListener("click", handleDeafen);
