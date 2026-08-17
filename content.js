chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "getSiteInfo") {
        sendResponse({
            url: window.location.href,
            siteName: window.location.hostname,
            title:document.title,
            links:document.querySelectorAll('a').length,
            images:document.querySelectorAll('img').length,
            headings: document.querySelectorAll("h1, h2, h3, h4, h5, h6").length,
            forms: document.querySelectorAll("form").length
        });
    }
});