# site-analyzer-chrome-extension

A lightweight Chrome extension that analyzes the webpage you're currently viewing and displays basic information about it.

## Current Features

- Detects the current website
- Displays the current page URL
- Displays the page title
- Counts links on the page
- Counts images
- Counts headings
- Counts forms
- Automatically loads the information when the extension is opened

## Tech Stack

- HTML
- CSS
- JavaScript
- Chrome Extension Manifest V3

## Project Structure

```text
SiteLens/
├── manifest.json
├── index.html
├── index.css
├── index.js
└── content.js
```

## How It Works

```text
User opens a webpage
        ↓
Clicks SiteLens
        ↓
index.js requests information
        ↓
content.js reads the webpage
        ↓
Data is sent back to index.js
        ↓
SiteLens displays the information
```

## Installation

1. Clone or download this repository.
2. Open Chrome and go to:

```text
chrome://extensions
```

3. Enable Developer mode.
4. Click Load unpacked.
5. Select the SiteLens project folder.
6. Open a webpage and click the SiteLens extension icon.

Chrome internal pages such as `chrome://extensions` cannot be analyzed by normal content scripts.

## Status

MVP complete.
This project is currently a basic webpage information analyzer built with vanilla JavaScript and Chrome Extension Manifest V3.

## License

This project is for learning and personal development.

