# Suraj Vishwakarma — Interactive Java Portfolio

A responsive, gamified developer portfolio powered by **Java 17 + Spring Boot 3**. The frontend is HTML/CSS/vanilla JavaScript with a Three.js holographic 3D layer.

## Features
- Responsive dark interface with smooth section navigation and scroll progress
- Your supplied portrait with an interactive Three.js orbit / particle scene
- Project cards linking to ErgoGuard AI, EVShare, Staywise, and Course Management System
- Clickable skill inventory, career timeline, achievement cards, and terminal mini-quest
- Java REST endpoints: `/api/health`, `/api/profile`, `/api/contact`
- Résumé served at `/Suraj_Vishwakarma_Resume.pdf`

## Run locally
Requirements: Java 17+ and Maven 3.8+.

```bash
mvn spring-boot:run
```

Open http://localhost:8080

Build:
```bash
mvn clean package
java -jar target/suraj-portfolio-1.0.0.jar
```

## Deploy on Render
1. Push this folder to a GitHub repository.
2. Create a **Web Service** on Render and connect the repository.
3. Runtime: Java / Maven (or use the Docker option if preferred).
4. Build command: `mvn clean package`
5. Start command: `java -jar target/suraj-portfolio-1.0.0.jar`
6. Render provides `PORT`; Spring Boot reads it through `${PORT:8080}`.

## Important notes
- Three.js is loaded from jsDelivr at runtime. If WebGL or the CDN is unavailable, the portrait remains visible.
- The contact endpoint validates and acknowledges submissions but intentionally does **not** send email or store personal data. Connect an email provider before relying on it for real enquiries.
- Project descriptions are based on the live pages and résumé details available during creation. Staywise's page did not expose readable page text to the inspection tool, so its description is intentionally high-level.
- Update contact details, résumé, project copy, and links in `src/main/resources/static/index.html` and `PortfolioController.java` if anything changes.

## Render Blueprint deployment

This repository now includes `render.yaml`, `Dockerfile`, and `.dockerignore`.

1. Push the project root (including these three files) to GitHub.
2. In Render, choose **New → Blueprint** and select the repository.
3. Render reads `render.yaml`, builds the Java 17 Spring Boot app using the multi-stage Dockerfile, and deploys it.
4. Health checks use `/api/health`.

The service listens on Render's injected `PORT` environment variable. The free instance may spin down after inactivity.

## Technical Writing section

The homepage includes a featured `#30DaysOfJava` section immediately after Projects, with the 30-post / 4-week / 29-consecutive-weekday summary, topic groups, featured themes, and a LinkedIn profile link. No unverified LinkedIn analytics or individual post URLs are fabricated.

## Expanded technology inventory

The interactive skills inventory is organised into five groups: Java & Spring, Angular & Frontend, Data & Quality, AWS & DevOps, and AI & Claude. It includes the requested ecosystem technologies and concepts (including Spring AI, Amazon Bedrock, RAG, vector search, Docker/Kubernetes, and testing tools). The section presents these as a technology toolkit / learning landscape, not as a claim of expert-level proficiency in every listed item.


## Progressive Web App (PWA)

This project can be installed from supported browsers as **Suraj Portfolio**.

PWA files are served from the Spring Boot static root:
- `src/main/resources/static/manifest.json` — app identity, display mode, colors, and icons.
- `src/main/resources/static/service-worker.js` — app-shell precaching and offline fallback.
- `src/main/resources/static/offline.html` — fallback page when a navigation cannot be reached.
- `src/main/resources/static/images/app-icon-192.png` and `app-icon-512.png` — install icons.

The service worker caches the portfolio shell, stylesheet, JavaScript, portrait, app icons, and résumé. It uses network-first navigation and cache-first static assets. Third-party Google Analytics and Google Fonts requests are not intercepted. Analytics remains configured in `index.html` with Measurement ID `G-Z3CFLXS6WL`; page-view reporting requires a network connection.

After deploying over HTTPS, open the site in a supported browser and choose **Install app** or **Add to Home Screen**. On iOS, use Safari's Share menu and choose **Add to Home Screen**. Offline use is limited to resources previously cached; live contact/API submissions and external links require connectivity.


## Casual copy-protection deterrents

The frontend discourages ordinary text selection, right-click context menus, copy/cut,
image dragging, and common DevTools/source-view keyboard shortcuts. Form controls and
elements marked with `data-allow-copy` or `.selectable` remain selectable/editable.

These measures are deterrents, not security controls. Browser developer tools, network
requests, screenshots, OCR, and other methods can still retrieve or reproduce content
delivered to a visitor's device. Do not store secrets in static frontend files.


## Contact form email delivery

The contact form uses FormSubmit's free AJAX endpoint and sends submissions to
`sharmasurajvishwakarma@gmail.com`. On the first submission, FormSubmit may send
an activation/confirmation email to that inbox. Open it and confirm the activation
before expecting subsequent visitor messages to be delivered. No SMTP password or
API secret is stored in the frontend. The form uses a honeypot field and FormSubmit's
CAPTCHA option; delivery depends on the third-party provider and an internet connection.

## Course Management System source

The Course Management System project card links to:
https://github.com/surajwakka/JFS-Project-CG

The hero portrait's “TO INTERACT” link now scrolls to the “LET'S CONNECT” contact section.
