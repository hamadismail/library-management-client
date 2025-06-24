# Readora - Client Side

📚 **Live Site:** [https://readora1.web.app/](https://readora1.web.app/)

## 📌 Project Purpose

**Readora** is a full-stack library management system that allows users to browse, borrow, and manage books online. The client side is built using React and provides a responsive, user-friendly interface for exploring books, managing borrow history, and accessing book details.

## 🚀 Key Features

- 📚 Browse books by category or full list
- 📖 View book details and availability
- 🛒 Borrow books with return date selection
- 🗂️ Manage user’s borrowed books
- 🌐 Protected routes and role-based access
- 📱 Responsive design using Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React.js, TailwindCSS, DaisyUI
- **Routing**: React Router DOM
- **Authentication**: Firebase
- **State Management**: React Context API
- **Form Handling**: React Hook Forms
- **Animation**: Swiper.js Slider, Framer Motion

## 📦 NPM Packages Used

- `react-hot-toast`
- `sweetalert2`
- `react-tooltip`
- `@headlessui/react`
- `react-simple-star-rating`
- `react-icons`
- `react-spinners`
- `date-fns`

## 📂 Folder Structure Highlights

- `/pages`: Main page components (Home, Book Details, Borrowed Books)
- `/components`: Reusable UI components (Spinner, StarRating, etc.)
- `/api`: Custom React hooks for fetching backend data
- `/hooks`: Custom utility and authentication hooks

## 📦 Installation Guide

### ✅ Prerequisites

- Node.js and npm installed
- Firebase project (for authentication)

---

### Clone the repository:

```bash
git clone https://github.com/hamadismail/library-management-client.git
cd library-management-client
```

### Install dependencies:

```bash
npm install
```

### Create a .env.local file in the root and add:

```bash
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_project.firebaseapp.com
VITE_projectId=your_project_id
VITE_storageBucket=your_bucket
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id
```

### Start the development server:

```bash
npm run dev
```

## 📫 Contact

Feel free to reach out with any questions or feedback!

- 💻 GitHub: hamadismail

- 📧 Email: hamad.ismail.gub@gmail.com
