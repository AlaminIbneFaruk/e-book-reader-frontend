# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# E-Book Reader Client

## 🚀 Live Demo
[https://e-book-reader.netlify.app/](https://e-book-reader.netlify.app/)

A React-based e-book reader frontend.

## Getting Started on a New PC

To set up and run this project on a new computer, follow these steps:

### Prerequisites
- **Node.js** (v16 or later recommended): [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- (Optional) **Git** if you want to clone the repository

### Installation Steps

1. **Clone or Download the Project**
   - If using Git:
     ```sh
     git clone <your-repo-url>
     cd e-book-reader-client
     ```
   - Or download and extract the ZIP, then open the folder in your terminal.

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Start the Development Server**
   ```sh
   npm run dev
   ```
   - This will start the Vite development server. The terminal will show a local URL (e.g., http://localhost:5173) where you can view the app in your browser.

### Additional Notes
- If you see errors about missing packages, make sure you are in the correct project directory and that `node_modules` exists after running `npm install`.
- If you want to build for production, use:
  ```sh
  npm run build
  ```
- If you want to preview the production build locally:
  ```sh
  npm run preview
  ```

---

For any issues, check your Node.js and npm versions, and ensure your internet connection is working for package downloads.

# Deployment Guide

## Deploying to Production (English)

You can deploy this Vite React app to any static hosting provider. Here are some common options:

### 1. Vercel (Recommended)
1. Go to [https://vercel.com/](https://vercel.com/) and sign up/log in.
2. Click "New Project" and import your GitHub repository.
3. Set the build command to `npm run build` and the output directory to `dist` (default for Vite).
4. Click "Deploy". Your site will be live in a few moments.

### 2. Netlify
1. Go to [https://netlify.com/](https://netlify.com/) and sign up/log in.
2. Click "Add new site" > "Import an existing project".
3. Connect your GitHub repo.
4. Set the build command to `npm run build` and the publish directory to `dist`.
5. Click "Deploy site".

### 3. Static Hosting (e.g., GitHub Pages, Your Own Server)
1. Build the project:
   ```sh
   npm run build
   ```
2. The production-ready files will be in the `dist` folder.
3. Upload the contents of `dist` to your static server or hosting provider.

---

## প্রোডাকশনে ডিপ্লয় করার নিয়ম (Bangla)

আপনি চাইলে এই Vite React অ্যাপটি যেকোনো স্ট্যাটিক হোস্টিং-এ ডিপ্লয় করতে পারেন। নিচে কিছু জনপ্রিয় পদ্ধতি দেয়া হলো:

### ১. Vercel (সুপারিশকৃত)
১. [https://vercel.com/](https://vercel.com/) এ যান এবং সাইন আপ/লগইন করুন।
২. "New Project" এ ক্লিক করুন এবং আপনার GitHub রিপোজিটরি ইম্পোর্ট করুন।
৩. Build command দিন `npm run build` এবং output directory দিন `dist` (Vite-এর ডিফল্ট)।
৪. "Deploy" ক্লিক করুন। কিছুক্ষণের মধ্যে আপনার সাইট লাইভ হবে।

### ২. Netlify
১. [https://netlify.com/](https://netlify.com/) এ যান এবং সাইন আপ/লগইন করুন।
২. "Add new site" > "Import an existing project" এ ক্লিক করুন।
৩. আপনার GitHub repo কানেক্ট করুন।
৪. Build command দিন `npm run build` এবং publish directory দিন `dist`।
৫. "Deploy site" ক্লিক করুন।

### ৩. স্ট্যাটিক হোস্টিং (যেমন: GitHub Pages, নিজের সার্ভার)
১. প্রজেক্ট বিল্ড করুন:
   ```sh
   npm run build
   ```
২. `dist` ফোল্ডারে প্রোডাকশন ফাইলগুলো পাবেন।
৩. `dist`-এর সব ফাইল আপনার সার্ভার বা হোস্টিং-এ আপলোড করুন।

---

For any deployment issues, check the documentation of your chosen hosting provider or ask for help!
