// Page data

let headingData = [];
let imgData = [];
let linkData = [];
let formData = [];


// Get page information

chrome.tabs.query(
    {
        active: true,
        currentWindow: true
    },
    (tabs) => {

        chrome.tabs.sendMessage(
            tabs[0].id,
            { type: "analyzePage" },
            (response) => {

                if (chrome.runtime.lastError) {
                    console.log(chrome.runtime.lastError.message);
                    return;
                }

                headingData = response.headingList;
                imgData = response.imageList;
                linkData = response.linkList;
                formData = response.formList;


                document.getElementById("site-name").innerText =
                    response.siteName;

                document.getElementById("site-url").innerText =
                    response.url;

                document.getElementById("page-title").innerText =
                    response.title;

                document.getElementById("link-count").innerText =
                    response.links;

                document.getElementById("image-count").innerText =
                    response.images;

                document.getElementById("heading-count").innerText =
                    response.headings;

                document.getElementById("form-count").innerText =
                    response.forms;
            }
        );

    }
);


// Get elements

const overview = document.getElementById("overview");


// Headings

const headingsCard = document.getElementById("headings-card");
const headingsView = document.getElementById("headings-view");
const headingList = document.getElementById("heading-list");
const backButton = document.getElementById("back-button");


// Images

const imgCard = document.getElementById("images-card");
const imageView = document.getElementById("images-view");
const imageList = document.getElementById("images-list");
const backButtonImg = document.getElementById("back-button-img");


// Links

const linkCard = document.getElementById("links-card");
const linkView = document.getElementById("links-view");
const linkList = document.getElementById("link-list");
const backButtonLink = document.getElementById("back-button-link");


// Forms

const formCard = document.getElementById("forms-card");
const formView = document.getElementById("forms-view");
const formList = document.getElementById("form-list");
const backButtonForm = document.getElementById("back-button-form");


// Open headings view

headingsCard.addEventListener("click", () => {

    overview.style.display = "none";
    headingsView.style.display = "block";

    headingList.innerHTML = "";

    headingData.forEach((heading) => {

        const headingItem = document.createElement("div");

        headingItem.innerText =
            `${heading.level}  ${heading.text}`;

        headingList.appendChild(headingItem);

    });

});


// Go back from headings

backButton.addEventListener("click", () => {

    headingsView.style.display = "none";
    overview.style.display = "block";

});


// Open images view

imgCard.addEventListener("click", () => {

    overview.style.display = "none";
    imageView.style.display = "block";

    imageList.innerHTML = "";

    imgData.forEach((img) => {

        const imgItem = document.createElement("div");

        const image = document.createElement("img");

        image.src = img.src;
        image.alt = img.alt;

        imgItem.append(image);

        imageList.append(imgItem);

    });

});


// Go back from images

backButtonImg.addEventListener("click", () => {

    imageView.style.display = "none";
    overview.style.display = "block";

});


// Open links view

linkCard.addEventListener("click", () => {

    overview.style.display = "none";
    linkView.style.display = "block";

    linkList.innerHTML = "";

    linkData.forEach((link) => {

        const linkItem = document.createElement("div");

        const linkText = document.createElement("span");
        linkText.className = "link-text";
        linkText.innerText = link.text;

        const linkUrl = document.createElement("span");
        linkUrl.className = "link-url";
        linkUrl.innerText = link.url;

        linkItem.append(linkText, linkUrl);

        linkList.append(linkItem);

    });

});


// Go back from links

backButtonLink.addEventListener("click", () => {

    linkView.style.display = "none";
    overview.style.display = "block";

});


// Open forms view

formCard.addEventListener("click", () => {

    overview.style.display = "none";
    formView.style.display = "block";

    formList.innerHTML = "";

    formData.forEach((form) => {

        const formItem = document.createElement("div");

        const method = document.createElement("span");
        method.className = "form-method";
        method.innerText = form.method;

        const action = document.createElement("span");
        action.className = "form-action";
        action.innerText = form.action;

        formItem.append(method, action);

        formList.append(formItem);

    });

});


// Go back from forms

backButtonForm.addEventListener("click", () => {

    formView.style.display = "none";
    overview.style.display = "block";

});
