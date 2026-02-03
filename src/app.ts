import { saveQuizzes, saveSession, clearSession, state } from "./state.js";

const createQuizBtn = document.getElementById("create-quiz-btn")! as HTMLButtonElement
const quizName = document.getElementById("quiz-name")! as HTMLInputElement
const quizDesc = document.getElementById("quiz-description")! as HTMLInputElement
const createQuizModal = document.getElementById("create-quiz-modal")! as HTMLDivElement
const modalOverlay = createQuizModal.querySelector(".modal-overlay")! as HTMLDivElement
const openCreateModalBtn = document.getElementById("Quiz-create-btn")! as HTMLButtonElement
const closeCreateModal = document.getElementById("close-create-modal")! as HTMLButtonElement
const cancelCreateModal = document.getElementById("cancel-create-modal")! as HTMLButtonElement
const createQuizBtn2 = document.getElementById("create-quiz2")! as HTMLButtonElement
const quizCategory = document.getElementById("quiz-category")! as HTMLInputElement



function createQuiz(name: string, desc: string, category: string) {
    const existingQuiz = state.quizzes.find(quizzes => quizzes.title === name.toLowerCase())
    if (!existingQuiz && name && desc && category) {
        const newQuiz = {
            title: name,
            desc: desc,
            category: category,
            id: Date.now().toString(),
            createdAt: Date.now(),
            questions: []
        }
        state.quizzes.push(newQuiz)
        saveQuizzes()
        renderQuizzes()
    }
}

function renderQuizzes() {
    const grid = document.querySelector(".quizzes-grid")! as HTMLDivElement
    grid.innerHTML = ""

    if (state.quizzes.length === 0) {
        grid.appendChild(createQuizBtn2)
        return
    }

    state.quizzes.forEach(quiz => {
        const card = document.createElement("div")
        card.className = "quiz-card"

        const header = document.createElement("div")
        header.className = "quiz-card-header"


        const category = document.createElement("div")
        category.className = "quiz-category cat-purple"
        category.textContent = quiz.category

        const quizActions = document.createElement("div")
        quizActions.className = "quiz-actions"

        const deleteBtn = document.createElement("button")
        deleteBtn.addEventListener("click", () => deleteQuiz(quiz.id))
        deleteBtn.className = "action-btn"
        deleteBtn.textContent = "🗑️"
        quizActions.appendChild(deleteBtn)
        

        const editBtn = document.createElement("button")
        editBtn.className = "action-btn"
        editBtn.textContent = "✏️"
        quizActions.appendChild(editBtn)

        const quizMeta = document.createElement("div")
        quizMeta.className = "quiz-meta"

        const span = document.createElement("span")
        span.className = "meta-item"

        const metaIcon1 = document.createElement("span")
        metaIcon1.className = "meta-item"
        

        const metaItem2 = document.createElement("span")
        metaItem2.className = "meta-icon"
        metaItem2.textContent = "❓"
        const span2 = document.createElement("span")
        span2.textContent = "15 vragen"

        const metaIcon2 = document.createElement("span")
        metaIcon2.className = "meta-item"

        const metaItem1 = document.createElement("span")
        metaItem1.className = "meta-icon"
        metaItem1.textContent = "👁️"
        const span1 = document.createElement("span")
        span1.textContent = "45 views"

        metaItem1.appendChild(span1)
        metaIcon2.appendChild(metaItem1)
        span.appendChild(metaIcon2)
        metaItem2.appendChild(span2)
        metaIcon1.appendChild(metaItem2)
        span.appendChild(metaIcon1)
        quizMeta.appendChild(span)

        const quizFooter = document.createElement("div")
        quizFooter.className = "quiz-footer"
        const playQuiz = document.createElement("a")
        playQuiz.className = "btn-play"
        playQuiz.textContent = "Play Quiz →"
        quizFooter.appendChild(playQuiz)

        const editQuestion = document.createElement("a")
        editQuestion.className = "btn-questions"
        editQuestion.textContent = "Edit Questions"
        quizFooter.appendChild(editQuestion)



        
        header.appendChild(category)
        header.appendChild(quizActions)
        card.appendChild(header)
        



        const quizTitle = document.createElement("h3")
        quizTitle.className = "quiz-title"
        quizTitle.textContent = quiz.title
        card.appendChild(quizTitle)

        const quizDesc = document.createElement("p")
        quizDesc.className = "quiz-description"
        quizDesc.textContent = quiz.desc
        card.appendChild(quizDesc)
        card.appendChild(quizMeta)
        card.appendChild(quizFooter)
        grid.appendChild(card)

        card.addEventListener("click", (e) => {
            if (e.ctrlKey) {
                deleteQuiz(quiz.id)
                console.log("wefwehk")
                return
            }
        })

    }

    )
}
function deleteQuiz(id: string) {
    state.quizzes = state.quizzes.filter(h => h.id !== id)
    saveQuizzes()
    renderQuizzes()
}

document.addEventListener("DOMContentLoaded", () => {
    renderQuizzes()
    console.log("ewfewf")
    createQuizBtn.addEventListener("click", () => {
        if (quizName.value !== "" && quizDesc.value !== "") {
            createQuiz(quizName.value, quizDesc.value, quizCategory.value)
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
    createQuizBtn2.addEventListener("click", () => {
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

renderQuizzes()