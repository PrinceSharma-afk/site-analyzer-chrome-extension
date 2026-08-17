chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.type === "getSiteInfo") {

        const headingElements = document.querySelectorAll(
            "h1, h2, h3, h4, h5, h6"
        );

        const headings = Array.from(headingElements).map((heading, index) => {
            return {
                id: index,
                text: heading.innerText,
                level: heading.tagName
            };
        });

        const data = {
            siteName: window.location.hostname,
            url: window.location.href,
            title: document.title,
            links: document.querySelectorAll("a").length,
            images: document.querySelectorAll("img").length,
            headings: headings.length,
            headingList:headings,
            forms: document.querySelectorAll("form").length
        };

        sendResponse(data);
    }

});
