import { saveQuizzes, saveSession, clearSession, state } from "./state.js";

const createQuizBtn = document.getElementById("create-quiz-btn")! as HTMLButtonElement
const quizName = document.getElementById("quiz-name")! as HTMLInputElement
const quizDesc = document.getElementById("quiz-description")! as HTMLInputElement
const createQuizModal = document.getElementById("create-quiz-modal")! as HTMLDivElement
const modalOverlay = createQuizModal.querySelector(".modal-overlay")! as HTMLDivElement
const openCreateModalBtn = document.getElementById("Quiz-create-btn")! as HTMLButtonElement
const closeCreateModal = document.getElementById("close-create-modal")! as HTMLButtonElement
const cancelCreateModal = document.getElementById("cancel-create-modal")! as HTMLButtonElement



function createQuiz(name: string, desc: string) {
    const existingQuiz = state.quizzes.find(quizzes => quizzes.title === name.toLowerCase())
    if (!existingQuiz && name && desc) {
        const newQuiz = {
            title: name,
            desc: desc,
            id: Date.now().toString(),
            createdAt: Date.now(),
            questions: []
        }
        state.quizzes.push(newQuiz)
        saveQuizzes()
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("ewfewf")
    createQuizBtn.addEventListener("click", () => {
        if (quizName.value !== "" && quizDesc.value !== "") {
            createQuiz(quizName.value, quizDesc.value)
            createQuizModal.style.display = "none"
        }
        if (quizName.value == "") {
            quizName.placeholder = "You have to input a name"
            setTimeout(() => {
                quizName.placeholder = "Bijvoorbeeld: Wereldgeschiedenis"
            }, 2000);
        }

        if (quizDesc.value == "") {
            quizDesc.placeholder = "You have to input a description!"
            setTimeout(function () {
                quizDesc.placeholder = "Korte beschrijving van de quiz..."
            }, 2000)
        }

    })

    openCreateModalBtn.addEventListener("click", () => {
        createQuizModal.style.display = "flex"
    })

    closeCreateModal.addEventListener("click", () => {
        createQuizModal.style.display = "none"
    })

    cancelCreateModal.addEventListener("click", () => {
        createQuizModal.style.display = "none"
    })

    modalOverlay.addEventListener("click", () => {
        createQuizModal.style.display = "none"
    })
})