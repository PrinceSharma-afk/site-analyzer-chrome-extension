// Get page information

let headingData = [];

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

    chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "getSiteInfo" },
        (response) => {

            headingData = response.headingList;

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


// Get elements

const headingsCard = document.getElementById("headings-card");
const overview = document.getElementById("overview");
const headingsView = document.getElementById("headings-view");
const headingList = document.getElementById("heading-list");
const backButton = document.getElementById("back-button");


// Open headings view

headingsCard.addEventListener("click", () => {

    overview.style.display = "none";
    headingsView.style.display = "block";

    headingList.innerHTML = "";

    headingData.forEach((heading) => {

        const headingItem = document.createElement("div");

        headingItem.innerText = `${heading.level}  ${heading.text}`;

        headingList.appendChild(headingItem);

    });

});


// Go back to overview

backButton.addEventListener("click", () => {

    headingsView.style.display = "none";
    overview.style.display = "block";

});
