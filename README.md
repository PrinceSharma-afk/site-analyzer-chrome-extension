# SiteAnalyzer

A lightweight Chrome extension that analyzes the webpage you're currently viewing and provides a quick overview of its structure.

## Overview

SiteAnalyzer collects basic information from the active webpage and displays it in a simple browser extension interface.

It currently provides information about:

* Website name and URL
* Page title
* Number of links
* Number of images
* Number of headings
* Number of forms
* Individual headings
* Individual images
* Individual links
* Individual forms

## Features

### Page Information

Displays the current website, URL, and page title.

### Headings

Shows the headings found on the page, including their heading level and text.

### Images

Displays the images found on the page along with their source and alternative text data.

### Links

Lists the links found on the page with their visible text and URL.

### Forms

Lists forms found on the page along with their method and action.

## Tech Stack

* HTML
* CSS
* JavaScript
* Chrome Extension Manifest V3

## Project Structure

```text
SiteAnalyzer/
├── manifest.json
├── index.html
├── index.css
├── index.js
└── content.js
```

## How It Works

SiteAnalyzer uses a content script to inspect the current webpage.

The content script collects information such as headings, images, links, and forms using the DOM. The popup communicates with the content script using Chrome's runtime messaging system and displays the returned information.

## Installation

1. Clone the repository.

```bash
git clone https://github.com/PrinceSharma-afk/site-analyzer-chrome-extension.git
```

2. Open Chrome and go to:

```text
chrome://extensions
```

3. Enable Developer Mode.

4. Select `Load unpacked`.

5. Select the SiteAnalyzer project folder.

6. Open a webpage and click the SiteAnalyzer extension.

## Status

SiteAnalyzer is currently under development. The current version focuses on collecting and displaying basic webpage structure information.
