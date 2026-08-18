# SiteAnalyzer

SiteAnalyzer is a lightweight Chrome extension that analyzes the webpage you're currently viewing and gives you a quick, structured overview of its content — headings, images, links, and forms — plus optional AI-powered insights.

## Features

### Page Overview
- Website name
- Page URL
- Page title
- Total number of links, images, headings, and forms

### Heading Explorer
- Lists all headings from H1–H6 with level and text
- Click to copy heading text
- Double-click to scroll to the heading on the page
- Empty state when no headings are found

### Image Explorer
- Displays images found on the page along with alt text
- Click to copy the image URL
- Double-click to scroll to the image
- Shows "No alt text" when an image is missing alt text
- Empty state when no images are found

### Link Explorer
- Lists links with their text and URL
- Click to copy the link URL
- Double-click to scroll to the link
- Empty state when no links are found

### Form Explorer
- Lists forms with request method and action
- Click to copy the form action
- Double-click to scroll to the form
- Empty state when no forms are found

### AI Analysis
SiteAnalyzer can send the collected page data to a backend server for AI-powered analysis, returning:

- **Overview** — a brief summary of the page
- **Page Structure** — analysis of heading hierarchy and layout
- **Accessibility** — accessibility observations based on the collected data
- **Potential Issues** — problems detected on the page
- **Suggestions** — recommendations for improvement

A loading state is shown while the analysis is being generated.

## How It Works

```
Webpage
   │
   ▼
content.js  ───►  collects page information
   │
   ▼
index.js  ───►  sends page data
   │
   ▼
Node.js / Express server
   │
   ▼
Gemini API  ───►  returns analysis
   │
   ▼
SiteAnalyzer
```

## Project Structure

```
site-analyzer/
├── content.js
├── index.html
├── index.css
├── index.js
├── manifest.json
├── README.md
├── .gitignore
│
└── server/
    ├── server.js
    ├── package.json
    └── package-lock.json
```

## Technologies Used

- HTML, CSS, JavaScript
- Chrome Extension APIs
- Node.js / Express.js
- Google Gemini API

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd site-analyzer
```

### 2. Load the Chrome extension

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `site-analyzer` folder (it must contain `manifest.json`)

## Setting Up AI Analysis

The AI feature requires the backend server to be running locally.

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```
GEMINI_API_KEY=your_api_key_here
```

> **Note:** Never commit your `.env` file to GitHub.

Start the server:

```bash
node server.js
```

The server runs at `http://localhost:3000`.

After starting the server, reload the extension from `chrome://extensions`, and the **Analyze with AI** button will be ready to use.

## Important Notes

- The explorer features (headings, images, links, forms) work entirely within the Chrome extension and **do not** require the backend server.
- The AI feature currently requires the local server:

  ```
  Chrome Extension → localhost:3000 → Gemini API
  ```

- This setup is intended for local development. A future release may use a hosted backend so users don't need to run their own server.

## Security

- Never place the Gemini API key inside the Chrome extension itself.
- Keep it only in `server/.env`.
- Make sure `.env` is listed in `.gitignore`.
- Do not commit the `node_modules` directory.

## Current Version — v2

- Page overview
- Heading, Image, Link, and Form explorers
- Click-to-copy and double-click-to-scroll interactions
- Empty states for all explorers
- Image alt-text display
- AI-powered page analysis

## Future Improvements

- Improved AI result formatting
- Accessibility scoring
- SEO analysis
- Severity levels for detected issues
- Better AI loading states
- Improved explorer styling
- Hosted AI backend
- Additional page analysis features

## License

This project is for educational and development purposes.
