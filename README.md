# Suraj Vishwakarma - Portfolio

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
