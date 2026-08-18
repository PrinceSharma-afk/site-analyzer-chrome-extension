// Helper

function get(id) {
  return document.getElementById(id);
}


// Page data

let headingData = [];
let imgData = [];
let linkData = [];
let formData = [];


// Main elements

const overview = get("overview");

const siteName = get("site-name");
const siteUrl = get("site-url");
const pageTitle = get("page-title");

const aiButton = get("ai");
const interactionHint = get("interaction-hint");


// Explorer elements

const headingsCard = get("headings-card");
const headingsView = get("headings-view");
const headingList = get("heading-list");

const imgCard = get("images-card");
const imageView = get("images-view");
const imageList = get("images-list");

const linkCard = get("links-card");
const linkView = get("links-view");
const linkList = get("link-list");

const formCard = get("forms-card");
const formView = get("forms-view");
const formList = get("form-list");


// AI elements

const aiView = get("ai-view");
const aiLoading = get("ai-loading");
const aiResult = get("ai-result");
const aiError = get("ai-error");

const aiOverview = get("ai-overview");
const aiStructure = get("ai-structure");
const aiAccessibility = get("ai-accessibility");
const aiIssues = get("ai-issues");
const aiSuggestions = get("ai-suggestions");


// All explorer views

const explorerViews = [
  headingsView,
  imageView,
  linkView,
  formView,
  aiView
];


// Get page information

chrome.tabs.query(
  {
    active: true,
    currentWindow: true
  },
  (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        type: "analyzePage"
      },
      (response) => {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError.message);
          return;
        }

        if (!response) {
          return;
        }

        headingData = response.headingList || [];
        imgData = response.imageList || [];
        linkData = response.linkList || [];
        formData = response.formList || [];

        siteName.innerText = response.siteName;
        siteUrl.innerText = response.url;
        pageTitle.innerText = response.title;

        get("link-count").innerText = response.links;
        get("image-count").innerText = response.images;
        get("heading-count").innerText = response.headings;
        get("form-count").innerText = response.forms;
      }
    );
  }
);


// Copy helper

function copyText(text, element) {
  navigator.clipboard.writeText(text);

  const originalText = element.innerText;

  element.innerText = "Copied";

  setTimeout(() => {
    element.innerText = originalText;
  }, 800);
}


// Site information copy

siteName.addEventListener("click", () => {
  copyText(siteName.innerText, siteName);
});

siteUrl.addEventListener("click", () => {
  copyText(siteUrl.innerText, siteUrl);
});

pageTitle.addEventListener("click", () => {
  copyText(pageTitle.innerText, pageTitle);
});


// Scroll helper

function scrollToElement(type, id) {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          type: "scrollToElement",
          elementType: type,
          id: id
        }
      );
    }
  );
}


// Click interaction
// Single click = copy
// Double click = scroll

function addInteraction(element, copyValue, elementType, id) {
  let clickTimer = null;

  element.addEventListener("click", () => {
    if (clickTimer) {
      clearTimeout(clickTimer);
      clickTimer = null;

      // Double click
      scrollToElement(elementType, id);
    } else {
      clickTimer = setTimeout(() => {
        // Single click
        copyText(copyValue, element);
        clickTimer = null;
      }, 250);
    }
  });
}




// Show explorer

function showExplorer(view) {
  overview.style.display = "none";

  explorerViews.forEach((item) => {
    item.style.display = "none";
  });

  view.style.display = "block";

  aiButton.style.display = "none";

  if (view === aiView) {
    interactionHint.innerText =
      "Please wait a few seconds while AI analyzes the page...";

    interactionHint.style.display = "block";
  } else {
    interactionHint.innerText =
      "Click to copy • Double-click to scroll";

    interactionHint.style.display = "block";
  }
}


// Show overview

function showOverview() {
  explorerViews.forEach((item) => {
    item.style.display = "none";
  });

  overview.style.display = "block";

  aiButton.style.display = "block";
  interactionHint.style.display = "none";
}


// Empty state

function showEmpty(list, name) {
  const empty = document.createElement("div");

  empty.className = "empty-message";
  empty.innerText = `No ${name} found`;

  list.appendChild(empty);
}


// Back buttons

document.querySelectorAll(".back-button").forEach((button) => {
  button.addEventListener("click", showOverview);
});


// Headings explorer

headingsCard.addEventListener("click", () => {
  showExplorer(headingsView);

  headingList.innerHTML = "";

  if (headingData.length === 0) {
    showEmpty(headingList, "headings");
    return;
  }

  headingData.forEach((heading) => {
    const headingItem = document.createElement("div");

    headingItem.className = `heading-item ${heading.level.toLowerCase()}`;
    headingItem.innerText = `${heading.level}  ${heading.text}`;

    addInteraction(headingItem, heading.text, "heading", heading.id);

    headingList.appendChild(headingItem);
  });
});


// Images explorer

imgCard.addEventListener("click", () => {
  showExplorer(imageView);

  imageList.innerHTML = "";

  if (imgData.length === 0) {
    showEmpty(imageList, "images");
    return;
  }

  imgData.forEach((img) => {
    const imgItem = document.createElement("div");
    const image = document.createElement("img");

    image.src = img.src;
    image.alt = img.alt;

    const altText = document.createElement("span");

    altText.className = "image-alt";
    altText.innerText = img.alt || "No alt text";

    imgItem.append(image, altText);

    addInteraction(imgItem, img.src, "image", img.id);

    imageList.appendChild(imgItem);
  });
});


// Links explorer

linkCard.addEventListener("click", () => {
  showExplorer(linkView);

  linkList.innerHTML = "";

  if (linkData.length === 0) {
    showEmpty(linkList, "links");
    return;
  }

  linkData.forEach((link) => {
    const linkItem = document.createElement("div");

    const linkText = document.createElement("span");
    linkText.className = "link-text";
    linkText.innerText = link.text || "No text";

    const linkUrl = document.createElement("span");
    linkUrl.className = "link-url";
    linkUrl.innerText = link.url;

    linkItem.append(linkText, linkUrl);

    addInteraction(linkItem, link.url, "link", link.id);

    linkList.appendChild(linkItem);
  });
});


// Forms explorer

formCard.addEventListener("click", () => {
  showExplorer(formView);

  formList.innerHTML = "";

  if (formData.length === 0) {
    showEmpty(formList, "forms");
    return;
  }

  formData.forEach((form) => {
    const formItem = document.createElement("div");

    const method = document.createElement("span");
    method.className = "form-method";
    method.innerText = form.method;

    const action = document.createElement("span");
    action.className = "form-action";
    action.innerText = form.action || "No action";

    formItem.append(method, action);

    addInteraction(formItem, form.action, "form", form.id);

    formList.appendChild(formItem);
  });
});


// AI Analysis

async function analyzeWithAI() {
  showExplorer(aiView);

  aiLoading.style.display = "block";
  aiResult.style.display = "none";
  aiError.style.display = "none";


  const pageData = {
    title: pageTitle.innerText,
    url: siteUrl.innerText,
    headings: headingData,
    images: imgData,
    links: linkData,
    forms: formData
  };


  try {
    const response = await fetch(
      "http://localhost:3000/analyze",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(pageData)
      }
    );


    const data = await response.json();


    if (!response.ok) {
      throw new Error(
        data.error || "AI analysis failed"
      );
    }


    aiOverview.innerText =
      data.overview || "No overview available.";

    aiStructure.innerText =
      data.structure || "No structure analysis available.";

    aiAccessibility.innerText =
      data.accessibility || "No accessibility analysis available.";

    aiIssues.innerText =
      data.issues || "No potential issues found.";

    aiSuggestions.innerText =
      data.suggestions || "No suggestions available.";


    aiLoading.style.display = "none";
    aiResult.style.display = "block";
  }


  catch (error) {
    console.log("AI ERROR:", error);

    aiLoading.style.display = "none";

    aiError.innerText =
      "Unable to analyze this page.";

    aiError.style.display = "block";
  }
}


// Analyze with AI button

aiButton.addEventListener("click", () => {
  analyzeWithAI();
});
