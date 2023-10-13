const observer = new MutationObserver(function (mutations) {
  const muteButton = document.querySelector('[aria-label="Mute"]');
  if (muteButton) {
    muteButton.addEventListener("click", function () {
      const muteAriaChecked = muteButton.getAttribute("aria-checked");
      const isMuted = muteAriaChecked === "false";

      chrome.runtime.sendMessage({ isMuted, isDeafened: false });
    });

    observer.disconnect();
  }

  const deafenButton = document.querySelector('[aria-label="Deafen"]');
  if (deafenButton) {
    deafenButton.addEventListener("click", function () {
      const deafenAriaChecked = deafenButton.getAttribute("aria-checked");
      const isDeafened = deafenAriaChecked === "false";

      chrome.runtime.sendMessage({ isMuted: isDeafened, isDeafened });
    });

    observer.disconnect();
  }
});

observer.observe(document, {
  childList: true,
  subtree: true,
});
