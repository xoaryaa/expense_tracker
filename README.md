# 💸 Expense Tracker

Welcome to **Expense Tracker**, your ultimate tool for managing personal finances with ease and style! Whether you're tracking daily expenses, visualizing spending habits, or planning your budget, this app has got you covered. Built with ❤️ using **Node.js**, **SQLite**, and **Chart.js**.

---

## 🚀 Features

### 📊 **Track Expenses**
- Add expenses with **amount**, **category**, and **notes**.
- Automatically saves the **date** of each expense.

### 📅 **History**
- View all past expenses in a clean, organized table.
- Easily delete unwanted entries.

### 📈 **Interactive Graphs**
- Visualize your spending with **bar charts**, **pie charts**, and **line charts**.
- Filter data by **category** and **date range**.
- Real-time updates as you add or delete expenses.

### 🎨 **Customizable Categories**
- Add, edit, or remove categories to suit your needs.
- Default categories include **Food**, **Clothes**, **Entertainment**, and more.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, SQLite
- **Frontend**: HTML, CSS, JavaScript, Chart.js
- **Tools**: Postman (for API testing)

---


## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- SQLite (for database management)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/xoaryaa/expense_tracker.git
   cd expense_tracker

2. Install dependencies:
   ```bash
   npm install
3. Repeat for Frontend & Backend as well

4. Start the server(using Concurrently):
   ```bash
   npm start

## Folder Structure
```bash
expense-tracker/
├── backend/
│   ├── db.js
│   ├── server.js
│   ├── routes/
│   │   └── expenses.js
│   ├── models/
│   │   └── Expense.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   └── package.json
└── package.json
└── README.md

