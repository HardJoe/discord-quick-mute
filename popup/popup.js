import { getDiscordTabId, toggleMute, toggleDeafen } from "../utils.js";

const tabId = await getDiscordTabId();
const muteButton = document.getElementById("muteButton");
const deafenButton = document.getElementById("deafenButton");

const checkStates = () => {
  const getButtonInfo = (label) => {
    const discordButton = document.querySelector(`[aria-label="${label}"]`);
    const ariaChecked = discordButton.getAttribute("aria-checked");
    return ariaChecked === "true";
  };

  const isMuted = getButtonInfo("Mute");
  const isDeafened = getButtonInfo("Deafen");

  chrome.runtime.sendMessage({ isMuted, isDeafened });
};

if (tabId) {
  chrome.scripting.executeScript({
    target: { tabId },
    func: checkStates,
  });

  const executeScript = (func) => {
    chrome.scripting.executeScript({
      target: { tabId },
      func,
    });
  };

  muteButton.addEventListener("click", () => executeScript(toggleMute));
  deafenButton.addEventListener("click", () => executeScript(toggleDeafen));
} else {
  const notOpenedText = document.createElement("div");
  notOpenedText.id = "notOpenedText";
  notOpenedText.textContent = "Discord is not running in this browser.";

  const openButton = document.createElement("button");
  openButton.textContent = "Open Discord";
  openButton.id = "openButton";
  openButton.addEventListener("click", () => {
    chrome.tabs.create({ url: "https://discord.com/channels/@me" });
  });

  const buttonsDiv = document.querySelector(".buttons");
  buttonsDiv.innerHTML = "";
  buttonsDiv.appendChild(notOpenedText);
  buttonsDiv.appendChild(openButton);
}

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
  } else if (isMuted) {
    updateMuteButton("../icons/mic_off.svg", "Unmute");
    updateDeafenButton("../icons/headset.svg", "Deafen");
  } else {
    updateMuteButton("../icons/mic.svg", "Mute");
    updateDeafenButton("../icons/headset.svg", "Deafen");
  }
});
