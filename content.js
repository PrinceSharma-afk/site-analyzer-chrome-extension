// Content script

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  // Analyze page
  if (message.type === "analyzePage") {

    // Headings
    const headingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
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

  // Scroll to element
  if (message.type === "scrollToElement") {

    // Scroll to heading
    if (message.elementType === "heading") {
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      const heading = headings[message.id];

      if (heading) {
        heading.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    // Scroll to image
    if (message.elementType === "image") {
      const images = document.querySelectorAll("img");
      const image = images[message.id];

      if (image) {
        image.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    // Scroll to link
    if (message.elementType === "link") {
      const links = document.querySelectorAll("a");
      const link = links[message.id];

      if (link) {
        link.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    // Scroll to form
    if (message.elementType === "form") {
      const forms = document.querySelectorAll("form");
      const form = forms[message.id];

      if (form) {
        form.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }
});
