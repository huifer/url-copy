document.addEventListener('DOMContentLoaded', function () {
    // 获取已存储的 URL
    chrome.storage.local.get({urls: []}, function (result) {
        var urls = result.urls;
        var urlList = document.getElementById('urlList');

        // 清空列表以确保每次都是最新的数据
        urlList.innerHTML = '';

        // 循环显示每个 URL
        urls.forEach(function (url) {
            var listItem = document.createElement('li');

            var listItem = document.createElement('li');

            var titleElement = document.createElement('div');
            titleElement.textContent = url.title;

            var urlElement = document.createElement('div');
            urlElement.textContent = url.url;

            listItem.appendChild(titleElement);
            listItem.appendChild(urlElement);


            // 添加点击事件
            listItem.addEventListener('click', function () {
                // 获取URL元素的文本内容
                var urlText = this.querySelector('div:last-child').textContent;

                // 创建一个范围，将URL文本节点添加到范围中
                var range = document.createRange();
                range.selectNodeContents(this);

                // 获取当前选择
                var selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);

                // 将内容复制到剪贴板
                document.execCommand('copy');

                // 清除选择
                selection.removeAllRanges();

                // 提示用户已成功复制
                console.log('URL内容已复制到剪切板：' + urlText);
            });
            urlList.appendChild(listItem);


        });
    });
});