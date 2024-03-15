chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const title = window.location.title;
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          sendResponse({ code: 0, title, url });
        })
        .catch((err) => {
          sendResponse({ code: 1, msg: err.message });
        });
    } else {
      sendResponse(copyToClipboardFallback(title, url));
    }
  });
  
  const copyToClipboardFallback = (title, url) => {
    let textArea = document.createElement("textarea");
    textArea.value = url;
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    document.body.appendChild(textArea);
  
    textArea.focus();
    textArea.select();
  
    try {
      const successful = document.execCommand("copy");
      const msg = successful ? "successful" : "unsuccessful";
      return { code: 0, title, url };
    } catch (err) {
      return { code: 1, msg: err.message };
    } finally {
      document.body.removeChild(textArea);
    }
  };
  