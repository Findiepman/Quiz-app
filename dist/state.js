// src/quiz/state.ts
var _a;
import { saveToStorage, loadFromStorage } from "./storage.js";
export const state = {
    quizzes: (_a = loadFromStorage("quizzes")) !== null && _a !== void 0 ? _a : [],
    activeSession: loadFromStorage("quizSession")
};
// helpers
export function saveQuizzes() {
    saveToStorage("quizzes", state.quizzes);
}
export function saveSession() {
    saveToStorage("quizSession", state.activeSession);
}
export function clearSession() {
    state.activeSession = null;
    localStorage.removeItem("quizSession");
}
//# sourceMappingURL=state.js.map