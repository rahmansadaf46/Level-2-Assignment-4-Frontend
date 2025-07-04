# 📚 Minimal Library Management System - Frontend

A clean, minimal, and fully responsive **Library Management System** built with **React**, **Redux Toolkit Query**, and **TypeScript**. This client-side application allows users to perform essential book and borrowing operations like viewing, creating, editing, deleting, and borrowing books.

> 🔗 [Live Demo](https://library-client-nu.vercel.app/)

---

## 🌟 Features

### 🔓 Public Access
- All pages are publicly accessible without login or authentication.

### 📘 Book Management
- **Books List Table**
  - Columns: Title, Author, Genre, ISBN, Copies, Availability, Actions
  - Supports: View Details, Edit Book, Delete Book, Borrow Book
- **Create Book**
  - Fields: Title, Author, Genre, ISBN, Description, Copies
  - Auto-sets availability based on copies
- **Edit Book**
  - Auto-filled form with existing data
- **Delete Book**
  - Confirmation dialog before removal
- Real-time UI updates after any CRUD operation

### 📖 Borrow Management
- **Borrow a Book**
  - Fields: Quantity (≤ available copies), Due Date
  - Automatic copy adjustment and availability status update
  - On success: redirect to borrow summary
- **Borrow Summary**
  - Aggregated data for borrowed books
  - Columns: Book Title, ISBN, Total Quantity Borrowed

### 💻 UI/UX
- **Responsive Layout** – Adapts across devices
- **Minimalist Design** – Tailwind CSS + Radix UI + lucide-react icons
- **Toast Notifications** – Success and error feedback using `sonner`
- **Type-Safe Forms** – React Hook Form + Zod
- **Reusable Components** – Modular file structure and UI components

---

## 🚀 Tech Stack

| Layer         | Technology                            |
|--------------|----------------------------------------|
| Frontend     | React + TypeScript                     |
| State Mgmt   | Redux Toolkit + RTK Query              |
| Styling      | Tailwind CSS + clsx + cva              |
| Forms        | React Hook Form + Zod                  |
| UI Components| Radix UI + lucide-react + sonner       |
| Routing      | React Router v7                        |
| Utilities    | date-fns, uuid                         |

---

## 📂 Folder Structure (Simplified)

```
src/
├── assets/               # Images and static files
├── components/           # Reusable components
│   ├── layout/           # Navbar, Footer
│   ├── module/           # Feature modules (Books, Borrow)
│   ├── ui/               # Generic UI components
├── pages/                # Route-based pages
├── redux/                # RTK Query + Store setup
├── providers/            # Theme and global providers
├── routes/               # Route definitions
├── lib/                  # Utility functions
└── types.ts              # Type definitions
```

---

## 📡 Backend API

This frontend interacts with a RESTful backend built with:
- **Node.js**, **Express.js**, **MongoDB**, **Mongoose**

> 🌐 Backend Live: [https://library-server-one.vercel.app/](https://library-server-one.vercel.app/)

---

## 📦 Installation & Setup

1. **Clone the repo**
```bash
git clone https://github.com/rahmansadaf46/Level-2-Assignment-4-Frontend.git
cd Level-2-Assignment-4-Frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

> ⚠️ Make sure the backend is running and accessible

---

## ✅ Bonus Implementations

| Feature                  | Status  |
|--------------------------|---------|
| Responsive Design        | ✅       |
| Optimistic UI Updates    | ✅       |
| Toast Notifications      | ✅       |
| Type-Safe Forms (Zod)    | ✅       |

---

## 📌 Routes Overview

| Route                  | Description                          |
|------------------------|--------------------------------------|
| `/books`               | Book list with actions               |
| `/create-book`         | Add new book                         |
| `/books/:id`           | View book details                    |
| `/edit-book/:id`       | Edit existing book                   |
| `/borrow/:bookId`      | Borrow a book                        |
| `/borrow-summary`      | View borrow summary report           |

---

## 👨‍💻 Author

**Md. Sadaf Rahman**  
Full Stack Developer | [GitHub](https://github.com/rahmansadaf46)

---

## 📜 License

This project is part of a submission for a structured learning assignment. All code is original and plagiarism-free.

---

## 🌐 Useful Links

- 🔗 [Live Client](https://library-client-nu.vercel.app/)
- 🔗 [Live Server](https://library-server-one.vercel.app/)
- 💻 [Frontend GitHub Repo](https://github.com/rahmansadaf46/Level-2-Assignment-4-Frontend)
- 💻 [Backend GitHub Repo](https://github.com/rahmansadaf46/Level-2-Assignment-4-Backend)

---