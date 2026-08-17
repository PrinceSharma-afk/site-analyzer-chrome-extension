chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.type === "analyzePage") {

        // Headings

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


        // Images

        const imgEle = document.querySelectorAll("img");

        const imgList = Array.from(imgEle).map((img, index) => {
            return {
                id: index,
                src: img.src,
                alt: img.alt
            };
        });


        // Links

        const links = document.querySelectorAll("a");

        const linkList = Array.from(links).map((link, index) => {
            return {
                id: index,
                text: link.innerText,
                url: link.href
            };
        });


        // Forms

        const forms = document.querySelectorAll("form");

        const formList = Array.from(forms).map((form, index) => {
            return {
                id: index,
                action: form.action,
                method: form.method.toUpperCase()
            };
        });


        // Page data

        const data = {
            siteName: window.location.hostname,
            url: window.location.href,
            title: document.title,

            links: links.length,
            linkList: linkList,

            images: imgEle.length,
            imageList: imgList,

            headings: headings.length,
            headingList: headings,

            forms: forms.length,
            formList: formList
        };


        sendResponse(data);
    }

});
