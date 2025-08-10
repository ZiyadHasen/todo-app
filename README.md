
```markdown
# Todo App

A full-stack todo app with user auth, CRUD, and a clean modern UI built using React, TypeScript, Node.js, and MongoDB.

---

## 🚀 Live Demo

- Frontend: [https://todo-app-v2-gray.vercel.app](https://todo-app-v2-gray.vercel.app)  
- Backend: Hosted on Render

---

## ✨ Features

- User registration & login with JWT  
- Create, update, delete todos  
- Mark todos as complete/incomplete  
- Edit user profile  
- Dark/light mode toggle  
- Responsive design with Tailwind CSS & Radix UI  
- Role-based access control (user/admin)  
- Real-time feedback with toast notifications  

---

## 🛠 Tech Stack

| Layer     | Tech                    |
| --------- | ----------------------- |
| Frontend  | React 19, TypeScript, Vite, Tailwind CSS, Radix UI |
| Backend   | Node.js, Express, TypeScript, MongoDB, Mongoose    |
| Auth      | JWT, bcrypt             |
| API Client| Axios                   |

---

## 📁 Repo Structure

```

todo-app/
├── frontend/      # React + Vite app
└── backend/       # Express API server

````

---

## ⚙️ Setup & Run

### Prerequisites

- Node.js v18+  
- MongoDB (local or Atlas)  
- Git

### Clone

```bash
git clone https://github.com/ZiyadHasen/todo-app.git
cd todo-app
````

### Backend

```bash
cd backend
npm install
```

Create `.env` in `backend/`:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
```

Run backend dev server:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create `.env` in `frontend/`:

```
VITE_API_URL=http://localhost:5000
```

Run frontend dev server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📚 API Documentation

For full API specs, see [docs/API.md](./docs/API.JSON).


Sample endpoints:

* `POST /api/v1/auth/register` — Register user
* `POST /api/v1/auth/login` — Login user
* `POST /api/v1/todos/create-todo` — Create todo
* `GET /api/v1/todos/all-todos` — Get all todos

---

## 🖼 Screenshots

*(Add screenshots in `/screenshots` and reference here)*

---

## 🛠 Troubleshooting

* MongoDB connection errors? Check your `MONGO_URI` and ensure MongoDB is running.
* JWT issues? Verify `JWT_SECRET` matches in `.env`.
* CORS errors? Confirm frontend URL is allowed in backend CORS config.

---

## 🤝 Contributing

Feel free to fork and send PRs. Follow code style and commit conventions.

---

## 📄 License

ISC License — see [LICENSE](LICENSE).

---

## 👨‍💻 Author

Ziyad Hasen
[GitHub @ZiyadHasen](https://github.com/ZiyadHasen)

```


```
