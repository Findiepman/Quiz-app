# 🧠 Quiz Application (TypeScript)

A fully client-side **Quiz Application** built with **TypeScript, HTML, and CSS**.  
Users can create quizzes, add questions, and play quizzes with real-time scoring — all without a backend.

This project focuses on **state management, DOM manipulation, and TypeScript structure**.

---

## ✨ Features

### 📝 Quiz Management
- Create quizzes with:
  - Title
  - Description
  - Category
- Edit and delete quizzes
- View quizzes in a dashboard

### ❓ Question Management
- Add questions to a quiz
- Each question has:
  - 4 answer options (A–D)
  - One correct answer
- Edit and delete questions
- Visual preview of answers

### ▶️ Play Quiz
- Randomized questions
- Each question is shown only once
- Clickable answer buttons
- Progress tracking
- Next / Previous navigation

### 📊 Results
- Score calculation
- Percentage score
- Results screen after finishing
- Quiz cannot continue after all questions are answered

---

## 🛠️ Tech Stack

- **TypeScript**
- **HTML5**
- **CSS3**
- **localStorage** (no backend)

---

## 📁 Project Structure

```
.
├── dashboard.html
├── quiz.html
├── styles.css
├── package.json
├── tsconfig.json
└── src/
    ├── state.ts        # Global app state
    ├── types.ts        # TypeScript interfaces
    ├── storage.ts     # localStorage helpers
    ├── dashboard.ts   # Quiz & question management
    └── quiz.ts        # Quiz gameplay logic
```

---

## 🧠 State Management

The application uses a central state object stored in `state.ts`.

```ts
export interface AppState {
  quizzes: Quiz[];
}
```

All changes are persisted using `localStorage`, allowing the app to survive page refreshes.

---

## 🎮 Quiz Flow

1. User selects a quiz from the dashboard
2. Questions are shuffled
3. Each question:
   - Displays 4 answer options
   - Can only be answered once
4. Score updates after each question
5. Results screen is shown when finished

---

## 🚀 Running the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/Findiepman/Auth-System-Frontend-only-.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile TypeScript:
   ```bash
   npx tsc
   ```

4. Open `dashboard.html` in the browser  
   (or use Live Server)

---

## 📌 Notes

- This project is **frontend-only**
- No authentication or backend
- Data can be reset by clearing `localStorage`
- Built to practice real-world TypeScript patterns

---

## 🧩 Possible Improvements

- Authentication system
- Backend API
- Question timers
- Multiplayer quizzes
- Export / import quizzes

---

## 📜 License

This project is open-source and free to use for learning purposes.
