# MariaAIPro — AI Internship Assistant

A professional FAQ chatbot built as a portfolio showcase project. It answers questions about AI internships, machine learning fundamentals, and tech career development using a **custom NLP pipeline** — no ML libraries, no backend, no API calls.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![NLP](https://img.shields.io/badge/NLP-TF--IDF%20%2B%20Cosine-6C3CE1)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## Live Demo

Open [`index.html`](index.html) in any modern browser — no install or build step required.

> **Tip:** Deploy to [GitHub Pages](https://pages.github.com/) for a shareable portfolio link.

---

## Overview

**MariaAIPro** (AI Internship Assistant) is a single-page application designed for recruiters, hiring managers, and fellow AI enthusiasts. It demonstrates:

- Understanding of **NLP fundamentals** (TF-IDF, cosine similarity, Porter stemming)
- **Full-stack JavaScript** skills (UI, state, localStorage, analytics)
- **Production-minded UX** (dark mode, accessibility, responsive design)

The entire app lives in one file: `index.html` (~1,600 lines of HTML, CSS, and vanilla JavaScript).

---

## Features

| Feature | Description |
|---------|-------------|
| **Custom NLP Engine** | TF-IDF vectorization and cosine similarity implemented from scratch |
| **40+ Curated FAQs** | AI/ML, tools, internships, career advice, and practical skills |
| **Smart Matching** | Direct answers, "Did you mean…?" suggestions, and keyword fallbacks |
| **Typing Indicator** | Natural bot response delay with animated dots |
| **Quick Suggestions** | Dynamic question chips for one-click queries |
| **Dark Mode** | Theme toggle with persisted preference |
| **Feedback System** | Thumbs up/down stored in `localStorage` |
| **Analytics Dashboard** | Hidden admin panel (`Ctrl+Shift+A`) with usage stats |
| **Export & Share** | Download chat history as JSON; share links with `?q=` context |
| **Context Memory** | Last 5 exchanges improve follow-up question matching |
| **Accessible** | ARIA labels, keyboard shortcuts, semantic HTML |

---

## NLP Pipeline

```
User Query
    │
    ▼
┌─────────────────────────────────────┐
│  1. Preprocessing                   │
│     lowercase → remove punctuation  │
│     tokenize → remove stopwords     │
│     Porter stemmer                  │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  2. TF-IDF Vectorization            │
│     TF  = term count / doc length   │
│     IDF = log(N / df) + smoothing   │
│     Cached vectors for all FAQs     │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  3. Cosine Similarity               │
│     sim = (A · B) / (‖A‖ × ‖B‖)    │
│     Top 3 matches ranked            │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  4. Response Strategy               │
│     ≥ 0.75  → Direct answer         │
│     0.50–0.75 → "Did you mean…?"    │
│     < 0.50  → Fallback + suggestions│
└─────────────────────────────────────┘
```

All algorithms are implemented manually — no `scikit-learn`, no `natural`, no external NLP libraries.

---

## Knowledge Base

| Category | Topics | Count |
|----------|--------|-------|
| AI/ML Fundamentals | Neural networks, gradient descent, overfitting, bias-variance | 10 |
| Tools & Technologies | Python, PyTorch, Docker, Git, MLOps, cloud | 8 |
| Internship Application | CV, interviews, portfolio, networking | 10 |
| Career Development | Career paths, salary, ethics, open source | 7 |
| Practical Skills | Feature engineering, cross-validation, deployment | 5 |

---

## Quick Start

### Option 1 — Open locally

```bash
git clone https://github.com/YOUR_USERNAME/MariaAIPro.git
cd MariaAIPro
# Open index.html in your browser
```

### Option 2 — GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)`
4. Your site will be live at `https://YOUR_USERNAME.github.io/MariaAIPro/`

No build tools, Node.js, or server required.

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Send message |
| `Ctrl + /` | Focus input field |
| `Esc` | Clear input |
| `Ctrl + Shift + A` | Open analytics dashboard |

---

## Developer Tools

Open the browser DevTools console:

```javascript
// Run NLP unit tests
MariaAIPro.runUnitTests()

// Inspect a match manually
MariaAIPro.findMatches("What is machine learning?")

// Access the knowledge base
MariaAIPro.FAQ_DATA

// Debug preprocessing
MariaAIPro.preprocess("How do neural networks work?")
```

---

## Customization

### Add or edit FAQs

Find the `FAQ_DATA` array in `index.html` and add objects with `category`, `question`, and `answer` fields. Rebuild happens automatically on page load.

### Tune matching thresholds

```javascript
const CONFIG = {
  MATCH_DIRECT: 0.75,   // Direct answer threshold
  MATCH_RELATED: 0.50,  // "Did you mean?" threshold
  TOP_K: 3,             // Number of matches to return
  // ...
};
```

### Rebrand colors

Edit CSS variables in the `:root` block:

```css
:root {
  --primary: #6C3CE1;
  --secondary: #8B5CF6;
  --accent: #EC4899;
  /* ... */
}
```

### Quick suggestion chips

Update `QUICK_SUGGESTIONS_POOL` in the JavaScript section.

---

## Project Structure

```
MariaAIPro/
├── index.html    # Complete SPA (HTML + CSS + JavaScript)
└── README.md     # This file
```

Code is organized into logical sections inside `index.html`:

1. Configuration & constants
2. Knowledge base (FAQs)
3. NLP engine (preprocessing, TF-IDF, cosine similarity)
4. Chat UI controller
5. Event handlers
6. Utility functions (localStorage, export, analytics)
7. Initialization & unit tests

---

## Tech Stack

- **HTML5** — Semantic structure, ARIA accessibility
- **CSS3** — Custom properties, flexbox, animations, dark mode
- **Vanilla JavaScript** — ES6+, no frameworks or bundlers
- **Google Fonts** — Inter, JetBrains Mono
- **Font Awesome 6** — Icons (CDN)

---

## Performance

- TF-IDF vectors cached after first build
- Debounced input handling
- Target response time: **< 100ms** (NLP matching)
- Single-file load: **< 2 seconds** on average connections
- Works **offline** after initial load (except CDN fonts/icons)

---

## Browser Support

| Browser | Supported |
|---------|-----------|
| Chrome / Edge | Yes |
| Firefox | Yes |
| Safari | Yes |
| Mobile browsers | Yes (responsive layout) |

---

## Author

**Maria** — AI Internship Portfolio Project 2026

Built to demonstrate NLP fundamentals, clean UI/UX, and full-stack JavaScript development.

---

## License

MIT License — feel free to use, modify, and showcase. Attribution appreciated.

---

<p align="center">
  <strong>Powered by TF-IDF & Cosine Similarity</strong><br>
  Built with care for the AI internship journey
</p>
