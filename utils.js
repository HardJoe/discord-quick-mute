export const getDiscordTabId = async () => {
  const tabs = await chrome.tabs.query({ url: "https://discord.com/*" });
  if (tabs && tabs.length > 0) {
    const discordTab = tabs[0];
    return discordTab.id;
  } else {
    return null;
  }
};

export const toggleMute = () => {
  const muteButton = document.querySelector('[aria-label="Mute"]');
  muteButton.click();
};

export const toggleDeafen = () => {
  const deafenButton = document.querySelector('[aria-label="Deafen"]');
  deafenButton.click();
};
