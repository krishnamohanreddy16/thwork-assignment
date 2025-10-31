# Notes and Key Implementation Decisions

## 1️ Database Choice

I selected **SQLite** because:
- It is lightweight and easy to integrate.
- No server setup is needed.
- Perfect for a local or educational environment.
- Supports SQL syntax similar to MySQL/PostgreSQL for future scalability.

In a production version, this could be replaced with **Supabase** or **PostgreSQL**.

---

## 2️ Schema Design

**Table: tasks**

| Field | Type | Description |
|--------|------|-------------|
| id | INTEGER PRIMARY KEY | Unique ID for each task |
| title | TEXT | Title of the task |
| description | TEXT | Task details |
| priority | TEXT | Low / Medium / High |
| due_date | DATE | Deadline |
| status | TEXT | Open / In Progress / Completed |

---

## 3️ API Design

- **POST /tasks** → Adds new task  
- **GET /tasks** → Returns task list (supports query filtering by `status`)  
- **GET /insights** → Computes and returns a readable summary

The frontend uses the **Fetch API** to connect with these endpoints.

---

## 4️ Smart Insights Logic

Instead of using AI/LLMs, I implemented a **rule-based system** that analyzes the tasks:
- Counts total open tasks.
- Checks the most frequent priority (Low/Medium/High).
- Finds the nearest due date to highlight urgency.

Then constructs a summary like:
> “You have 8 open tasks, mostly High priority, and 3 due soon.”

---

## 5️ Frontend Development Notes

- Built with **React (Create React App)**.
- Components:  
  - `TaskForm` → Adds tasks  
  - `TaskList` → Displays and filters tasks  
  - `InsightsPanel` → Displays summary from backend  
- Used CSS for clean and readable UI (no Tailwind for simplicity).

---

## 6️ Why This Architecture

| Layer | Responsibility |
|-------|----------------|
| Backend | Data logic, CRUD APIs, insight computation |
| Frontend | User interface, fetch integration |
| Database | Persistent task storage |

This separation ensures scalability, maintainability, and testability.

---

## 7️ Future Enhancements

- Add **task editing and deletion**.
- Add **authentication** (JWT-based).
- Deploy backend (Render) and frontend (Vercel).
- Use **Supabase storage** for persistent cloud database.

---

**Prepared by:**  
**Krishna Mohan Reddy**  
**B.Tech – Computer Science & Engineering (2025)**
