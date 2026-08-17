chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

    chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "getSiteInfo" },
        (response) => {

            document.getElementById("site-name").innerText = response.siteName;
            document.getElementById("site-url").innerText = response.url;

            document.getElementById("page-title").innerText = response.title;

            document.getElementById("link-count").innerText = response.links;
            document.getElementById("image-count").innerText = response.images;
            document.getElementById("heading-count").innerText = response.headings;
            document.getElementById("form-count").innerText = response.forms;
        }
    );

});