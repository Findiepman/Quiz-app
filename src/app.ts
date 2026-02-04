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
const deleteModal = document.getElementById("delete-modal")! as HTMLDivElement
const cancelDeleteBtn = document.getElementById("delete-modal-cancel")! as HTMLButtonElement
const confirmDeleteBtn = document.getElementById("delete-modal-confirm")! as HTMLButtonElement
const closeDeleteBtn = document.getElementById("close-delete-modal")! as HTMLButtonElement
const questionsModal = document.getElementById("questions-modal")! as HTMLDivElement
const editQuizTitle = document.getElementById("quiz-title")! as HTMLParagraphElement
const answerAInput = document.getElementById("answer-a")! as HTMLInputElement
const answerBInput = document.getElementById("answer-b")! as HTMLInputElement
const answerCInput = document.getElementById("answer-c")! as HTMLInputElement
const answerDInput = document.getElementById("answer-d")! as HTMLInputElement
const questionInput = document.getElementById("question")! as HTMLInputElement
const createQuestionFinal = document.getElementById("create-question-final")! as HTMLButtonElement
const correctAnswer = document.getElementById("correct-answer")! as HTMLSelectElement
const closeQuestionModal = document.getElementById("close-question-modal")! as HTMLButtonElement
const cancelQuestionModal = document.getElementById("cancel-question-modal")! as HTMLButtonElement


let currentQuizId: string | null = null




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
        deleteBtn.addEventListener("click", () => openDeleteModal(quiz))
        deleteBtn.className = "action-btn"
        deleteBtn.textContent = "🗑️"
        quizActions.appendChild(deleteBtn)


        const editBtn = document.createElement("button")
        editBtn.className = "action-btn"
        editBtn.textContent = "✏️"
        editBtn.addEventListener("click", () => openEditModal(quiz.id))
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
        span2.textContent = `${quiz.questions.length} Questions`

        const metaIcon2 = document.createElement("span")
        metaIcon2.className = "meta-item"


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

        const editQuestion = document.createElement("button")
        editQuestion.className = "btn-questions"
        editQuestion.textContent = "Edit Questions"
        editQuestion.style.border = "none"
        editQuestion.addEventListener("click", () => {
            openEditModal(quiz.id)

        })
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
                openDeleteModal(quiz)
                console.log("wefwehk")
                return
            }
        })

    }

    )
}


function createQuestion(question: string, Aa: string, Ab: string, Ac: string, Ad: string, correct: string) {
    if (!currentQuizId) { return console.error("No quiz selected!") }

    const quiz: any = state.quizzes.find(q => q.id === currentQuizId)
    if (question && Aa && Ab && Ac && Ad && correct) {
        const newQuestion = {
            id: Date.now().toString(),
            question: question,
            options: [Aa, Ab, Ac, Ad],
            correctAnswer: correct
        }
        quiz.questions.push(newQuestion)
        saveQuizzes()
        renderQuestions()
        renderQuizzes();
    }


}
function renderQuestions() {
    const grid = document.getElementById("question-grid")!;
    grid.innerHTML = "";

    // Haal de huidige quiz op
    const quiz = state.quizzes.find(q => q.id === currentQuizId)!;

    // Loop door alle vragen
    quiz.questions.forEach((question, index) => {
        const card = document.createElement("div");
        card.className = "question-item";

        // Vraagnummer
        const questionNumber = document.createElement("div");
        questionNumber.className = "question-number";
        questionNumber.textContent = `${index + 1}`;
        card.appendChild(questionNumber);

        const content = document.createElement("div");
        content.className = "question-content";

        // Vraagtekst
        const textPreview = document.createElement("div");
        textPreview.className = "question-text-preview";
        textPreview.textContent = question.question;

        // buttons
        const actions = document.createElement("div")
        actions.className = "question-actions"

        const deleteBtn = document.createElement("button")
        deleteBtn.className = "action-btn-sm danger"
        deleteBtn.textContent = "🗑️"
        deleteBtn.addEventListener("click", () => {
            deleteQuestion(question.id)
            console.log("ewfuiwef")
        })
        actions.appendChild(deleteBtn)
        const editBtn = document.createElement("button")
        editBtn.className = "action-btn-sm"
        editBtn.textContent = "✏️"
        actions.appendChild(editBtn)


        // Antwoorden
        const answerList = document.createElement("div");
        answerList.className = "question-answers-preview";

        question.options.forEach((opt, i) => {
            const answerTag = document.createElement("span");
            answerTag.className = "answer-tag";

            // Markeer correct antwoord
            if (question.correctAnswer === ["A", "B", "C", "D"][i]) {
                answerTag.classList.add("answer-tag-correct");
            }

            answerTag.textContent = opt;
            answerList.appendChild(answerTag);
        });

        content.appendChild(actions)
        content.appendChild(textPreview);
        content.appendChild(answerList);

        card.appendChild(content);
        grid.appendChild(card);
    });
}

function deleteQuiz(id: string) {
    state.quizzes = state.quizzes.filter(h => h.id !== id)
    saveQuizzes()
    renderQuizzes()
}
function deleteQuestion(id: string) {
    const quiz = state.quizzes.find(q => q.id === currentQuizId)!;

    quiz.questions = quiz.questions.filter(h => h.id !== id)
    saveQuizzes()
    renderQuizzes()
    renderQuestions()
}
function openEditModal(quizID: string) {
    questionsModal.style.display = "flex"
    currentQuizId = quizID
    renderQuestions()
}
function openDeleteModal(quiz: any) {
    function closeModal() {
        deleteModal.style.display = "none"
    }
    deleteModal.style.display = "flex"

    cancelDeleteBtn.addEventListener("click", () => closeModal())
    closeDeleteBtn.addEventListener("click", () => closeModal())
    deleteModal.addEventListener("click", (e) => {
        if (e.target === deleteModal) closeModal()
    })



    confirmDeleteBtn.addEventListener("click", () => {
        deleteQuiz(quiz.id)
        closeModal()
    })

}




document.addEventListener("DOMContentLoaded", () => {
    renderQuizzes()
    console.log("ewfewf")
    createQuizBtn.addEventListener("click", () => {
        if (quizName.value !== "" && quizDesc.value !== "") {
            createQuiz(quizName.value, quizDesc.value, quizCategory.value)
            createQuizModal.style.display = "none"
            quizName.value = ""
            quizDesc.value = ""
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
    createQuestionFinal.addEventListener("click", () => {
        createQuestion(questionInput.value, answerAInput.value, answerBInput.value, answerCInput.value, answerDInput.value, correctAnswer.value)
        questionsModal.style.display = "none"
        questionInput.value = ""
        answerAInput.value = ""
        answerBInput.value = ""
        answerCInput.value = ""
        answerDInput.value = ""
        correctAnswer.value = "A"
    }

    )
    closeQuestionModal.addEventListener("click", () => questionsModal.style.display = "none")
    cancelQuestionModal.addEventListener("click", () => questionsModal.style.display = "none")
})

renderQuizzes()