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
  const element = document.querySelector('[aria-label="Mute"]');
  element.click();
};

export const toggleDeafen = () => {
  const element = document.querySelector('[aria-label="Deafen"]');
  element.click();
};
