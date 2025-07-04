# Dina Dehbi Portfolio

A modern, responsive portfolio website built with Angular 16+ and Sass, featuring a dark theme with neon teal accents and starfield background.

## Features

- **Modern Design**: Dark theme with neon teal (#00FFC2) accents and starfield background
- **Responsive**: Mobile-first design that works on all devices
- **Angular 16+**: Built with the latest Angular features
- **Lazy Loading**: Optimized performance with lazy-loaded modules
- **Sass Styling**: Organized SCSS with variables, mixins, and BEM methodology
- **Interactive Elements**: Smooth animations and hover effects
- **Contact Form**: Functional contact form with validation

## Pages

- **Home**: Hero section with introduction and about preview
- **About**: Tabbed interface showing education, skills, and experience
- **Projects**: Showcase of web development projects
- **Contact**: Contact form and information

## Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd portfolio
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
ng serve
\`\`\`

4. Open your browser and navigate to `http://localhost:4200`

## Build

To build the project for production:

\`\`\`bash
ng build --prod
\`\`\`

The build artifacts will be stored in the `dist/` directory.

## Project Structure

\`\`\`
src/
├── app/
│   ├── modules/
│   │   ├── home/
│   │   ├── about/
│   │   ├── projects/
│   │   └── contact/
│   ├── shared/
│   │   ├── header/
│   │   └── footer/
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   └── app.module.ts
├── assets/
│   └── images/
├── styles.scss
└── index.html
\`\`\`

## Technologies Used

- Angular 16+
- TypeScript
- Sass/SCSS
- RxJS
- Angular Router
- Reactive Forms

## Color Scheme

- Primary Background: #0B0F1A
- Text Color: #FFFFFF
- Accent Color: #00FFC2 (Neon Teal)
- Card Background: rgba(255, 255, 255, 0.05)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.
