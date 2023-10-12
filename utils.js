export const getDiscordTabId = async () => {
  const tabs = await chrome.tabs.query({ url: "https://discord.com/*" });
  if (tabs && tabs.length > 0) {
    const discordTab = tabs[0];
    return discordTab.id;
  } else {
    throw new Error("No Discord tab found.");
  }
};

export const toggleMute = () => {
  const muteButton = document.querySelector('[aria-label="Mute"]');
  muteButton.click();
  const muteAriaChecked = muteButton.getAttribute("aria-checked");
  const isMuted = muteAriaChecked === "false";

  chrome.runtime.sendMessage({ isMuted, isDeafened: false });
};

export const toggleDeafen = () => {
  const deafenButton = document.querySelector('[aria-label="Deafen"]');
  deafenButton.click();
  const deafenAriaChecked = deafenButton.getAttribute("aria-checked");
  const isDeafened = deafenAriaChecked === "false";

  chrome.runtime.sendMessage({ isMuted: isDeafened, isDeafened });
};
