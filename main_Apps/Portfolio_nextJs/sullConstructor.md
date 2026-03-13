# 🏗️ Portfolio Project Constructor

This document provides a comprehensive technical overview of the Portfolio project. It is designed to help AI models understand the structure, logic, and visual elements of the application.

---

## 🏠 Home Page Sections (`/`)

The home page is a single-page application (SPA) layout with the following main sections:

1.  **✨ Intro**: The hero section featuring a professional introduction, dynamic profile image, and primary calls to action.
2.  **📌 About**: A narrative section describing the developer's background, location (Tangier, Morocco), and professional aspirations.
3.  **🛠️ Technical Skills**: A categorized grid of technologies used in the project (Frontend, Backend, Tools).
4.  **🚀 Recent Projects**: A showcase of featured work with dynamic links to detailed project pages.
5.  **📧 Contact**: A dedicated area for direct email inquiries and a custom contact form.

---

## 🎨 Interactive Elements & Animations

The project uses **Framer Motion** for premium, high-quality animations:

*   **🖱️ Custom Cursor**: A custom dot cursor that follows the mouse movement, with a trailing particle effect (`particle` class) for a fluid feel.
*   **🔄 Tech Icon Cycle**: In the Intro section, a small floating badge cycles through different technology icons (`BsCodeSlash`, `RiRocketLine`, `LuBrainCircuit`, etc.) every 3 seconds.
*   **🌀 Text Circle Animation**: A spinning text circle around the profile image displaying "fullstack developer frontEnd backEnd" using CSS transforms and a rotation script.
*   **⌨️ Typing Animation**: Custom Typing SVG badges from `readme-typing-svg` are used for dynamic name and status display.
*   **🎭 Entrance Animations**:
    *   Sections slide up with `initial={{ opacity: 0, y: 100 }}` and `animate={{ opacity: 1, y: 0 }}`.
    *   Profile image pops in with a spring transition (`stiffness: 125`).
    *   Skill categories have staggered delays for a smooth grid entrance.

---

## 📄 Application Pages

*   **`/`**: Main landing page (Home).
*   **`/projects`**: Full list of all projects available in the database.
*   **`/projects/[slug]`**: Dynamic route for individual project case studies.
*   **`/admin`**: Protected dashboard for managing content (Projects, Social Posts, Analytics).

---

## 📊 Data Implementation (`lib/data.json`)

The application is data-driven, using JSON as a local "database".

### 🔗 `links` Keys
- `name`: Display text for the navigation link.
- `hash`: ID target for scroll-to-section (e.g., `#home`, `#about`).

### 📁 `projectsData` Keys
- `title`: Name of the project.
- `slug`: URL-friendly identifier.
- `description`: Detailed technical narrative.
- `tags`: Array of technologies used.
- `dynamicImages`: Array of URLs for project screenshots/GIFs.
- `pageUrl` / `githubUrl`: External destination links.

### ⚡ `skillsData` Keys
- An array of strings representing technology names (e.g., "React.js", "Laravel") used for dynamic icon generation via `skillicons.dev`.

---

## 🧠 Core Application Logic

### 🔭 Section Interaction (`useSectionInView`)
A custom hook that uses `react-intersection-observer` to:
1. Detect which section is currently centered in the viewport.
2. Update the `ActiveSectionContext` to highlight the correct header link.

### 🤖 Chat AI Logic (`lib/chat-logic.ts`)
A keyword-based AI assistant built into the site:
*   **Normalization**: Sanitizes user input (lowercase, removes special characters).
*   **Keyword Matching**: Scouts for specific terms like "skills", "projects", or "about".
*   **Scoring Engine**: Assigns points based on "Title Exact Match" (+50), "Description Match" (+2), or "Tag Match" (+5).
*   **Dynamic Response**: Returns the best-matching `KnowledgeItem` from the `KNOWLEDGE_BASE`.

### 📧 Mail System
The contact form uses a custom API route (`/api/send`) often integrated with services like Resend or a direct SMTP handler to deliver messages.

---

## 🎭 UI/UX Design Philosophy

The project follows a **"Premium Dark"** aesthetic, emphasizing depth, clarity, and modern interaction patterns:

*   **🪟 Glassmorphism & Depth**:
    *   Extensive use of `backdrop-blur` and low-opacity backgrounds (`bg-white/5`, `bg-gray-950/40`) to create a layered, modern feel.
    *   Subtle "ghost" borders (`border-white/10`) define elements without visual clutter.
    *   Ambient background glows (pink and blue blurred circles) provide a soft, high-end lighting effect.
*   **🎨 Color Palette**:
    *   **Primary Accent**: Vibrant Purple (`#A855F7`) used for highlights, icons, and CTA buttons.
    *   **Backgrounds**: Deep charcoal and black (`bg-gray-900`, `bg-gray-950`) for a professional dark mode experience.
    *   **Text**: High-contrast white and light gray for readability, with purple used sparingly for emphasis.
*   **🔡 Typography**:
    *   The project uses the **Inter** font (Google Fonts), optimized for screen readability and a clean, technical appearance.
*   **✨ Micro-Interactions & Feedback**:
    *   **Hover States**: Navigation links and project cards feature subtle scale-up or color-shifting transitions.
    *   **Active Section Indicator**: In the Header, a pill-shaped "spring" animation tracks the user's progress through the page.
    *   **Particle Cursor**: Moving the mouse generates temporary light particles, adding a "living" quality to the interface.
*   **📱 Responsiveness & Adaptability**:
    *   **Mobile-First**: Layouts transition from single-column (mobile) to multi-column (desktop) seamlessly.
    *   **Smart Transitions**: The navigation header transforms from a full-width bar on mobile to a centered pill on larger screens.
    *   **Touch Optimization**: Interactive "floating" badges and custom cursor effects are disabled on touch devices to ensure a clean, tap-friendly experience.
*   **♿ Accessibility & Performance**:
    *   Supports `prefers-reduced-motion` to disable complex animations for users who prefer static interfaces.
    *   Uses semantic HTML (`<main>`, `<section>`, `<nav>`) to ensure screen reader compatibility.

---
*Created by Antigravity for Samir Aoulad Amar*
