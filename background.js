chrome.commands.onCommand.addListener((command) => {
    if (command === "copyUrl") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {}, (response) => {
          if (response.code == 0) {
            saveCopyHistory(chrome, response);
          }
        });
      });
    }
  });
  
  const saveCopyHistory = (chrome, { title, url }) => {
    chrome.storage.local.get({ urls: [] }, (result) => {
      const urls = result.urls;
      const exists = urls.some((it) => it.url === url);
      if (!exists) {
        urls.push({ title, url });
  
        if (urls.length > 50) {
          urls.shift();
        }
  
        chrome.storage.local.set({ urls: urls }, () => {
          console.log("Combined info stored:", urls);
        });
      }
    });
  };
  