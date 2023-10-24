const getButtonStatus = (ariaLabel) => {
  const button = document.querySelector(`[aria-label="${ariaLabel}"]`);
  return button && button.getAttribute("aria-checked") === "true";
};

const sendMessageStatus = () => {
  const isMuted = getButtonStatus("Mute");
  const isDeafened = getButtonStatus("Deafen");
  chrome.runtime.sendMessage({ isMuted, isDeafened });
};

const observer = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    if (
      mutation.type === "attributes" &&
      mutation.attributeName === "aria-checked"
    ) {
      const ariaLabel = mutation.target.getAttribute("aria-label");
      const ariaCheckedStatus = mutation.target.getAttribute("aria-checked");
      sendMessageStatus();
    }
  }
});

observer.observe(document.body, {
  childList: true,
  attributes: true,
  subtree: true,
  attributeFilter: ["aria-checked"],
});
