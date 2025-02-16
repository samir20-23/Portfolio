### **Cheat Sheet for Creating Your Portfolio**  

#### **1. Setup Project**  
```sh
mkdir portfolio && cd portfolio
git init
npm init -y
```

#### **2. Install Dependencies**  
```sh
npm install react react-dom vite
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### **3. Configure Tailwind** (`tailwind.config.js`)  
```js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

#### **4. Setup Project Structure**  
```sh
mkdir src components assets
touch src/main.jsx src/App.jsx index.html
```

#### **5. Create `index.html`**  
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Samir Aoulad Amar - Portfolio</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

#### **6. Create `src/main.jsx`**  
```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

#### **7. Create `src/App.jsx`**  
```jsx
import React from "react";

const App = () => {
  return (
    <div className="text-center text-4xl font-bold text-blue-600">
      Samir Aoulad Amar Portfolio
    </div>
  );
};

export default App;
```

#### **8. Start Development Server**  
```sh
npm run dev
```

#### **9. Deploy to GitHub Pages**  
```sh
npm install -D gh-pages
```
Modify `package.json`:  
```json
"scripts": {
  "build": "vite build",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
Deploy:  
```sh
npm run deploy
```

##### **Your portfolio is now live! 🎉**