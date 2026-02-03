// src/quiz/state.ts

import { Quiz, QuizSession } from "./types.js"
import { saveToStorage, loadFromStorage } from "./storage.js"

export interface QuizState {
    quizzes: Quiz[]
    activeSession: QuizSession | null
}

export const state: QuizState = {
    quizzes: loadFromStorage<Quiz[]>("quizzes") ?? [],
    activeSession: loadFromStorage<QuizSession>("quizSession")
}

// helpers
export function saveQuizzes() {
    saveToStorage("quizzes", state.quizzes)
}

export function saveSession() {
    saveToStorage("quizSession", state.activeSession)
}

export function clearSession() {
    state.activeSession = null
    localStorage.removeItem("quizSession")
}
