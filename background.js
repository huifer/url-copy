chrome.runtime.onInstalled.addListener(function () {
    console.log("插件已被安装");
});


chrome.commands.onCommand.addListener(function (command) {
    console.log('Command:', command);
});

chrome.commands.onCommand.addListener(function (command) {
    // 当命令为"copyUrl"时执行
    if (command === "copyUrl") {

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var url = tabs[0].url;



            chrome.tabs.sendMessage(tabs[0].id, {greeting: url}, function(response) {

                var resp = JSON.parse(response);
            });
        });




        // 获取当前活动标签页信息
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            // 获取当前标签页的 URL 和标题
            var url = tabs[0].url;
            var title = tabs[0].title;

            // 组合标题和 URL
            var combinedInfo = { title: title, url: url };

            // 读取已存储的地址列表
            chrome.storage.local.get({ urls: [] }, function (result) {
                var urls = result.urls;

                // 检查是否已存在
                var exists = urls.some(function (existingInfo) {
                    // 判断标题和 URL 组合是否已存在
                    return existingInfo.url === combinedInfo.url;
                });

                if (!exists) {
                    // 将新的标题和 URL 组合添加到地址列表中
                    urls.push(combinedInfo);

                    // 最多保留 50 条记录
                    if (urls.length > 50) {
                        urls.shift(); // 删除最早的记录
                    }

                    // 更新本地存储中的地址列表
                    chrome.storage.local.set({ urls: urls }, function () {
                        console.log("Combined info stored:", urls);
                    });
                }
            });
        });
;
;
;
    }
});


