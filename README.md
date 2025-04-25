# 🎬 MK Movie Site

A sleek and dynamic React-based movie discovery platform that allows users to explore, search, review, like, and favorite movies. Built with a focus on functionality and modern web design principles.

## 🚀 Features

- 🔍 **Search Movies** – Instantly filter movies by title.
- 💬 **Add Reviews** – Users can add reviews to each movie.
- ❤️ **Like / Dislike Movies** – Show your opinion with like/dislike buttons.
- 🌟 **Favorite Movies** – Save movies to your favorites for quick access.
- ➕ **Add New Movies** – Easily add new movies using a dynamic form.
- 🧭 **Routing** – Seamless navigation using React Router.

## 🛠️ Tech Stack

- **Frontend:** React, JSX, CSS
- **Routing:** React Router DOM
- **State Management:** React `useState`, `useEffect`
- **Backend (Mock):** JSON Server (simulates API)
- **HTTP Requests:** Fetch API

## 📂 Project Structure

```
MK-movie-site/
│
├── components/           # Reusable UI Components
│   ├── AddMovie.js
│   ├── Favorites.js
│   ├── MovieList.js
│   ├── Navbar.js
│   └── SearchBar.js
│
├── App.js                # Main app logic with routing and state
├── App.css               # Custom styles
├── db.json               # JSON Server data
├── index.js              # ReactDOM entry
└── README.md             # Project documentation
```

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/nakutakaa/MK-movie-site.git
cd MK-movie-site
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run JSON Server (for mock backend)

Ensure `json-server` is installed globally or locally:

```bash
npm install -g json-server
```

Then run:

```bash
json-server --watch db.json --port 3000
```

### 4. Start the React App

In a separate terminal:

```bash
npm run dev
```

App will be available at `http://localhost:5173` (or your Vite default port).

## 📸 Screenshots

*Coming soon...*

## 🧠 Future Enhancements

- 🎥 Movie trailer support
- 🎨 Dark/light mode toggle
- 👤 User authentication & login
- 📱 Responsive design improvements




