# Todo Tracker

A full-stack Todo application with a REST API backend and Next.js frontend.

## 🚀 Features

- ✅ Create, read, update, and delete todos
- ✅ Mark todos as completed
- ✅ Clean and responsive UI
- ✅ RESTful API with proper validation
- ✅ SQLite database with Sequelize ORM
- ✅ Error handling and validation

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- Sequelize ORM
- SQLite database
- CORS enabled

**Frontend:**
- Next.js 14 (App Router)
- React
- Tailwind CSS
- Fetch API for data fetching

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Run database migrations:
```bash
npx sequelize-cli db:migrate
```

5. Start the server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/:id` | Update a todo |
| DELETE | `/todos/:id` | Delete a todo |

### Request/Response Examples

**GET /todos**
```json
[
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "createdAt": "2024-01-20T10:00:00.000Z",
    "updatedAt": "2024-01-20T10:00:00.000Z"
  }
]
```

**POST /todos**
```json
// Request
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}

// Response (201 Created)
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "createdAt": "2024-01-20T10:00:00.000Z",
  "updatedAt": "2024-01-20T10:00:00.000Z"
}
```

## 🎨 Design Decisions

1. **Database**: SQLite for simplicity and portability - no external database server required
2. **ORM**: Sequelize for type-safe database operations and easy migrations
3. **API Structure**: RESTful design following best practices
4. **Validation**: Both backend (Sequelize) and frontend validation for data integrity
5. **Error Handling**: Comprehensive error handling with meaningful error messages
6. **UI/UX**: Clean, simple design with Tailwind CSS for rapid development
7. **State Management**: React hooks (useState, useEffect) for simple state management

## 🔄 Project Structure
```
todo-tracker-v2/
├── backend/
│   ├── config/
│   │   └── config.json
│   ├── migrations/
│   │   └── [timestamp]-create-todo.js
│   ├── models/
│   │   ├── index.js
│   │   └── todo.js
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── public/
│   ├── .gitignore
│   ├── next.config.js
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🚧 Possible Improvements

1. **Authentication & Authorization**: Add user authentication with JWT tokens
2. **Due Dates**: Add due date field and sorting by priority
3. **Categories/Tags**: Organize todos with categories or tags
4. **Search & Filter**: Add search functionality and filters (completed/pending)
5. **Drag & Drop**: Reorder todos with drag and drop
6. **Dark Mode**: Toggle between light and dark themes
7. **PostgreSQL**: Migration to PostgreSQL for production
8. **Docker**: Containerize the application
9. **API Documentation**: Swagger/OpenAPI documentation
10. **Pagination**: Add pagination for large todo lists
11. **Real-time Updates**: WebSocket support for real-time synchronization
12. **Mobile App**: React Native version

## 📝 Notes

- The backend uses ES modules (`"type": "module"` in package.json)
- CORS is enabled for frontend communication
- Database file (`database.sqlite`) is gitignored
- Environment variables are used for configuration

## 👨‍💻 Development

To run both backend and frontend simultaneously:

1. Open two terminal windows
2. Terminal 1: `cd backend && npm run dev`
3. Terminal 2: `cd frontend && npm run dev`
