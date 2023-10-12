import { getDiscordTabId, toggleMute, toggleDeafen } from "../utils.js";

const tabId = await getDiscordTabId();
const muteButton = document.getElementById("muteButton");
const deafenButton = document.getElementById("deafenButton");

const checkStates = () => {
  const discordMuteButton = document.querySelector('[aria-label="Mute"]');
  const muteAriaChecked = discordMuteButton.getAttribute("aria-checked");
  const isMuted = muteAriaChecked === "true";

  const discordDeafenButton = document.querySelector('[aria-label="Deafen"]');
  const deafenAriaChecked = discordDeafenButton.getAttribute("aria-checked");
  const isDeafened = deafenAriaChecked === "true";

  chrome.runtime.sendMessage({ isMuted, isDeafened });
};

chrome.scripting.executeScript({
  target: { tabId },
  func: checkStates,
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { isMuted, isDeafened } = message;

  const updateMuteButton = (iconPath, buttonText) => {
    muteButton.innerHTML = `<div class="flex-container-button"><img src="${iconPath}"> ${buttonText}</div>`;
  };

  const updateDeafenButton = (iconPath, buttonText) => {
    deafenButton.innerHTML = `<div class="flex-container-button"><img src="${iconPath}"> ${buttonText}</div>`;
  };

  if (isDeafened) {
    updateMuteButton("../icons/mic_off.svg", "Unmute");
    updateDeafenButton("../icons/headset_off.svg", "Undeafen");
    chrome.action.setIcon({ path: "../icons/deafen.png" });
  } else if (isMuted) {
    updateMuteButton("../icons/mic_off.svg", "Unmute");
    chrome.action.setIcon({ path: "../icons/mute.png" });
  } else {
    updateMuteButton("../icons/mic.svg", "Mute");
    updateDeafenButton("../icons/headset.svg", "Deafen");
    chrome.action.setIcon({ path: "../icons/unmute.png" });
  }
});

const handleMuteClick = () => {
  chrome.scripting.executeScript({
    target: { tabId },
    func: toggleMute,
  });
};

document
  .getElementById("muteButton")
  .addEventListener("click", handleMuteClick);

const handleDeafenClick = () => {
  chrome.scripting.executeScript({
    target: { tabId },
    func: toggleDeafen,
  });
};

document
  .getElementById("deafenButton")
  .addEventListener("click", handleDeafenClick);
