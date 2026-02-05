import { state } from "./state.js";
import { Question } from "./types.js";

const params = new URLSearchParams(window.location.search);
const quizId = params.get("id");

if (!quizId) {
    window.location.href = "dashboard.html";
}

// DOM Elements
const questionText = document.getElementById("question-text")!;
const questionNumber = document.getElementById("question-number")!;
const questionCategory = document.getElementById("question-category")!;
const answerLabels = Array.from(document.querySelectorAll(".answer-option")) as HTMLLabelElement[];
const answerSpans = Array.from(document.querySelectorAll(".answer-text")) as HTMLSpanElement[];
const nextBtn = document.getElementById("next-btn") as HTMLButtonElement;
const prevBtn = document.getElementById("prev-btn") as HTMLButtonElement;
const scoreValue = document.getElementById("score-value")!;
const scorePercent = document.getElementById("score-percentage")!;
const resultsCard = document.getElementById("results-card")!;
const questionCard = document.getElementById("question-card")!;
const sidebarTitle = document.getElementById("sidebar-quiz-title")!;
const sidebarCategory = document.getElementById("sidebar-category")!;
const sidebarTotal = document.getElementById("sidebar-total")!;
const progressFill = document.getElementById("progress-fill")!;
const progressText = document.getElementById("progress-text")!;

// Quiz State
let quizQuestions: Question[] = [];
let currentQuestionIndex = 0;
let correctlyAnsweredIds = new Set<string>();
let isCurrentQuestionAnswered = false;
let userAnswers = new Map<string, number>();
let shuffledOptionsMap = new Map<string, { text: string, originalIndex: number }[]>();

// Helper to shuffle array
function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.addEventListener("DOMContentLoaded", () => {
    const quiz = state.quizzes.find(q => q.id === quizId);

    if (!quiz) {
        window.location.href = "dashboard.html";
        return;
    }

    // Initialize Sidebar Info
    sidebarTitle.textContent = quiz.title;
    sidebarCategory.textContent = quiz.category;
    sidebarTotal.textContent = quiz.questions.length.toString();
    questionCategory.textContent = quiz.category;

    // Prepare Questions (Shuffle)
    quizQuestions = shuffleArray([...quiz.questions]);

    // Initial Render
    renderQuestion();

    // Navigation Listeners
    nextBtn.addEventListener("click", () => {
        if (!isCurrentQuestionAnswered) return;

        if (currentQuestionIndex < quizQuestions.length - 1) {
            currentQuestionIndex++;
            renderQuestion();
        } else {
            finishQuiz();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderQuestion();
        }
    });

    const retryBtn = document.getElementById("retry-btn");
    if (retryBtn) {
        retryBtn.addEventListener("click", () => window.location.reload());
    }
});

function renderQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    isCurrentQuestionAnswered = userAnswers.has(question.id);

    // Update UI
    questionText.textContent = question.question;
    questionNumber.textContent = `${currentQuestionIndex + 1}`;
    questionNumber.style.color = "white"

    // Update Progress
    const total = quizQuestions.length;
    const progress = ((currentQuestionIndex + 1) / total) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${total}`;

    // Reset Buttons
    nextBtn.disabled = !isCurrentQuestionAnswered;
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.innerHTML = currentQuestionIndex === total - 1
        ? `Finish Quiz <span class="btn-arrow">→</span>`
        : `Next Question <span class="btn-arrow">→</span>`;

    // Prepare Options (Shuffle or Retrieve)
    let options = shuffledOptionsMap.get(question.id);
    if (!options) {
        const optionsWithIndex = question.options.map((opt, index) => ({
            text: opt,
            originalIndex: index
        }));
        options = shuffleArray(optionsWithIndex);
        shuffledOptionsMap.set(question.id, options);
    }

    const letterMap: { [key: string]: number } = { "A": 0, "B": 1, "C": 2, "D": 3 };
    const correctIndex = letterMap[question.correctAnswer];
    const userAnswerIndex = userAnswers.get(question.id);

    // Render Options
    answerLabels.forEach((label, i) => {
        const span = answerSpans[i];
        const option = options![i];

        span.textContent = option.text;

        // Reset Styles & State
        const card = label.querySelector(".answer-card") as HTMLElement;
        const input = label.querySelector("input") as HTMLInputElement;

        card.style.backgroundColor = "";
        card.style.borderColor = "";
        input.checked = false;
        label.style.pointerEvents = "auto";
        label.style.width = "100%"; // Ensure full size

        if (isCurrentQuestionAnswered) {
            label.style.pointerEvents = "none";

            // Highlight Correct Answer
            if (option.originalIndex === correctIndex) {
                card.style.backgroundColor = "rgba(76, 175, 80, 0.2)";
                card.style.borderColor = "#4caf50";
            }

            // Highlight User Selection
            if (userAnswerIndex === option.originalIndex) {
                input.checked = true;
                if (userAnswerIndex !== correctIndex) {
                    card.style.backgroundColor = "rgba(244, 67, 54, 0.2)";
                    card.style.borderColor = "#f44336";
                }
            }
        }

        label.onclick = (e) => {
            e.preventDefault();
            if (!isCurrentQuestionAnswered) {
                handleAnswerClick(option.originalIndex, question.id);
            }
        };
    });
}

function handleAnswerClick(selectedIndex: number, questionId: string) {
    userAnswers.set(questionId, selectedIndex);

    const question = quizQuestions[currentQuestionIndex];
    const letterMap: { [key: string]: number } = { "A": 0, "B": 1, "C": 2, "D": 3 };
    const correctIndex = letterMap[question.correctAnswer];

    if (selectedIndex === correctIndex) {
        correctlyAnsweredIds.add(questionId);
        updateScoreDisplay();
    }
    renderQuestion();
}

function updateScoreDisplay() {
    const score = correctlyAnsweredIds.size;
    const total = quizQuestions.length;
    scoreValue.textContent = `${score} / ${total}`;
    scorePercent.textContent = `${Math.round((score / total) * 100)}%`;
}

function finishQuiz() {
    questionCard.style.display = "none";
    resultsCard.style.display = "flex";

    const finalScore = document.getElementById("final-score")!;
    const finalTotal = document.getElementById("final-total")!;
    const finalPercent = document.getElementById("final-percent")!;

    const score = correctlyAnsweredIds.size;
    const total = quizQuestions.length;

    finalScore.textContent = score.toString();
    finalTotal.textContent = total.toString();
    finalPercent.textContent = `${Math.round((score / total) * 100)}%`;
}
