# Himanshu Raj - AI & Product Portfolio

This repository contains the complete source code for my personal portfolio, built to showcase my skills and projects in Product Management and Applied AI. The site is live at **[hraimind.in](https://hraimind.in)**.

This project is a fully custom, single-page application (SPA) built from scratch with a focus on modern design, advanced animations, and a responsive user experience.

---

## 🚀 Features

* **Modern "Glassmorphism" UI:** A custom-styled "glass effect" (`glass-effect`) is used throughout the site for a clean, premium aesthetic.
* **Dynamic Typing Effect:** The hero section features a custom React Hook (`useTypingEffect`) to dynamically type out my role and specialization.
* **Advanced GSAP Animations:**
    * **Scroll-Triggered Sections:** All content sections fade in and slide up gracefully as the user scrolls, powered by GSAP and `ScrollTrigger`.
    * **Elastic "Overscroll" Bounce:** The entire page features a premium, iOS-style elastic bounce effect when scrolling past the top or bottom, built with GSAP.
* **Live Contact Form:** The contact form is fully functional, clearing its state on submit and sending messages directly to my email using **Formspree**.
* **Light/Dark Mode:** Includes a sleek, persistent light/dark mode toggle that dynamically updates CSS variables for all components.
* **Animated Background:** A subtle, multi-layered animated background composed of CSS gradients, floating particles, and fading grid cells.
* **Responsive Navigation:** A sticky header that transitions to a blurred glass effect on scroll, and collapses into a mobile-friendly menu.
* **SEO & Verification:**
    * Configured with Google Search Console and a dynamically generated `sitemap.xml` via `vite-plugin-sitemap`.
    * Includes `TXT` record verification for external services like OpenAI.

---

## 🛠️ Tech Stack

This project was built using a modern, high-performance tech stack:

* **Framework:** React 18
* **Language:** TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **UI Library:** Shadcn UI (built on Radix UI & Tailwind)
* **Animation:** GSAP (GreenSock Animation Platform)
* **Routing:** React Router DOM
* **Form Handling:** Formspree
* **Deployment:** Vercel

---

## 🚀 Getting Started Locally

To run this project on your local machine:

### 1. Clone the Repository
```sh
git clone [https://github.com/HR-894/Portfolio.git](https://github.com/HR-894/Portfolio.git)
cd Portfolio
2. Install Dependencies
This project uses npm.

Bash

npm install
3. Run the Development Server
This will start the project on http://localhost:8080 (or the next available port).

Bash

npm run dev
4. Build for Production
This will create a dist folder with the optimized, static production build, just as Vercel does.

Bash

npm run build
📁 Project Structure
The core logic of the application is contained within the /src directory.

/src
├── /components
│   ├── /ui           # Re-usable Shadcn UI components (Button, Card, etc.)
│   ├── About.tsx     # "About Me" section
│   ├── AnimatedBackground.tsx
│   ├── Contact.tsx   # Contact form with Formspree logic
│   ├── Hero.tsx      # Hero section with typing effect
│   ├── Navigation.tsx
│   ├── Portfolio.tsx # Project gallery
│   ├── ThemeToggle.tsx
│   ├── Timeline.tsx  # Education & experience timeline
│   └── Types.tsx     # "What I Do" section
│
├── /hooks
│   ├── useIsMobile.tsx
│   ├── use-toast.ts
│   └── useTypingEffect.ts # Custom hook for the typing animation
│
├── /lib
│   └── utils.ts      # (cn) utility from Shadcn
│
├── /pages
│   ├── Index.tsx     # The main homepage that assembles all components
│   └── NotFound.tsx
│
├── App.tsx           # Main app component, handles routing
├── index.css         # Global styles & Tailwind layers
└── main.tsx          # React's entry point