import { saveQuizzes, state } from "./state.js";
const createQuizBtn = document.getElementById("create-quiz-btn");
const quizName = document.getElementById("quiz-name");
const quizDesc = document.getElementById("quiz-description");
const createQuizModal = document.getElementById("create-quiz-modal");
const modalOverlay = createQuizModal.querySelector(".modal-overlay");
const openCreateModalBtn = document.getElementById("Quiz-create-btn");
const closeCreateModal = document.getElementById("close-create-modal");
const cancelCreateModal = document.getElementById("cancel-create-modal");
const createQuizBtn2 = document.getElementById("create-quiz2");
const quizCategory = document.getElementById("quiz-category");
const deleteModal = document.getElementById("delete-modal");
const cancelDeleteBtn = document.getElementById("delete-modal-cancel");
const confirmDeleteBtn = document.getElementById("delete-modal-confirm");
const closeDeleteBtn = document.getElementById("close-delete-modal");
const editQuizTitle = document.getElementById("quiz-title");
const answerAInput = document.getElementById("answer-a");
const answerBInput = document.getElementById("answer-b");
const answerCInput = document.getElementById("answer-c");
const answerDInput = document.getElementById("answer-d");
const questionInput = document.getElementById("question");
const createQuestionFinal = document.getElementById("create-question-final");
const correctAnswer = document.getElementById("correct-answer");
const closeQuestionModal = document.getElementById("close-question-modal");
const cancelQuestionModal = document.getElementById("cancel-question-modal");
const deleteModalOverlay = document.getElementById("delete-modal-overlay");
const deleteQuestionOverlay = document.getElementById("delete-modal-overlay-question");
const deleteQuestionModal = document.getElementById("delete-modal-question");
const closeDeleteModal = document.getElementById("close-delete-modal-question");
closeDeleteModal.style.border = "none";
const cancelDeleteModal = document.getElementById("delete-modal-cancel-question");
const confirmDeleteQuestion = document.getElementById("delete-modal-confirm-question");
const questionsModal = document.getElementById("questions-modal");
const questionOverlay = document.getElementById("question-overlay-modal");
// Edit Question Modal Elements
const editQuestionModal = document.getElementById("edit-question-modal");
const editQuestionOverlay = document.getElementById("edit-question-overlay");
const closeEditQuestionBtn = document.getElementById("close-edit-question-modal");
const cancelEditQuestionBtn = document.getElementById("cancel-edit-question-modal");
const saveEditQuestionBtn = document.getElementById("save-edit-question-btn");
const editQuestionInput = document.getElementById("edit-question-input");
const editAnswerAInput = document.getElementById("edit-answer-a");
const editAnswerBInput = document.getElementById("edit-answer-b");
const editAnswerCInput = document.getElementById("edit-answer-c");
const editAnswerDInput = document.getElementById("edit-answer-d");
const editCorrectAnswerInput = document.getElementById("edit-correct-answer");
let currentQuizId = null;
let currentQuestionIdForEdit = null;
function createQuiz(name, desc, category) {
    const existingQuiz = state.quizzes.find(quizzes => quizzes.title === name.toLowerCase());
    if (!existingQuiz && name && desc && category) {
        const newQuiz = {
            title: name,
            desc: desc,
            category: category,
            id: Date.now().toString(),
            createdAt: Date.now(),
            questions: []
        };
        state.quizzes.push(newQuiz);
        saveQuizzes();
        renderQuizzes();
    }
}
function renderQuizzes() {
    const grid = document.querySelector(".quizzes-grid");
    grid.innerHTML = "";
    if (state.quizzes.length === 0) {
        grid.appendChild(createQuizBtn2);
        return;
    }
    state.quizzes.forEach(quiz => {
        const card = document.createElement("div");
        card.className = "quiz-card";
        const header = document.createElement("div");
        header.className = "quiz-card-header";
        const category = document.createElement("div");
        category.className = "quiz-category cat-purple";
        category.textContent = quiz.category;
        const quizActions = document.createElement("div");
        quizActions.className = "quiz-actions";
        const deleteBtn = document.createElement("button");
        deleteBtn.addEventListener("click", () => openDeleteModal(quiz));
        deleteBtn.className = "action-btn";
        deleteBtn.textContent = "🗑️";
        quizActions.appendChild(deleteBtn);
        const editBtn = document.createElement("button");
        editBtn.className = "action-btn";
        editBtn.textContent = "✏️";
        editBtn.addEventListener("click", () => openEditModal(quiz.id));
        quizActions.appendChild(editBtn);
        const quizMeta = document.createElement("div");
        quizMeta.className = "quiz-meta";
        const span = document.createElement("span");
        span.className = "meta-item";
        const metaIcon1 = document.createElement("span");
        metaIcon1.className = "meta-item";
        const metaItem2 = document.createElement("span");
        metaItem2.className = "meta-icon";
        metaItem2.textContent = "❓";
        const span2 = document.createElement("span");
        span2.textContent = `${quiz.questions.length} Questions`;
        const metaIcon2 = document.createElement("span");
        metaIcon2.className = "meta-item";
        span.appendChild(metaIcon2);
        metaItem2.appendChild(span2);
        metaIcon1.appendChild(metaItem2);
        span.appendChild(metaIcon1);
        quizMeta.appendChild(span);
        const quizFooter = document.createElement("div");
        quizFooter.className = "quiz-footer";
        const playQuiz = document.createElement("a");
        playQuiz.className = "btn-play";
        playQuiz.textContent = "Play Quiz";
        playQuiz.addEventListener("click", () => openQuiz(quiz.id));
        quizFooter.appendChild(playQuiz);
        const editQuestion = document.createElement("button");
        editQuestion.className = "btn-questions";
        editQuestion.textContent = "Edit Questions";
        editQuestion.style.border = "none";
        editQuestion.addEventListener("click", () => {
            openEditModal(quiz.id);
        });
        quizFooter.appendChild(editQuestion);
        header.appendChild(category);
        header.appendChild(quizActions);
        card.appendChild(header);
        const quizTitle = document.createElement("h3");
        quizTitle.className = "quiz-title";
        quizTitle.textContent = quiz.title;
        card.appendChild(quizTitle);
        const quizDesc = document.createElement("p");
        quizDesc.className = "quiz-description";
        quizDesc.textContent = quiz.desc;
        card.appendChild(quizDesc);
        card.appendChild(quizMeta);
        card.appendChild(quizFooter);
        grid.appendChild(card);
        card.addEventListener("click", (e) => {
            if (e.ctrlKey) {
                openDeleteModal(quiz);
                console.log("wefwehk");
                return;
            }
        });
    });
}
function createQuestion(question, Aa, Ab, Ac, Ad, correct) {
    if (!currentQuizId) {
        return console.error("No quiz selected!");
    }
    const quiz = state.quizzes.find(q => q.id === currentQuizId);
    if (question && Aa && Ab && Ac && Ad && correct) {
        const newQuestion = {
            id: Date.now().toString(),
            question: question,
            options: [Aa, Ab, Ac, Ad],
            correctAnswer: correct
        };
        quiz.questions.push(newQuestion);
        saveQuizzes();
        renderQuestions();
        renderQuizzes();
    }
}
function openQuiz(id) {
    window.location.href = `quiz.html?id=${id}`;
}
function renderQuestions() {
    const grid = document.getElementById("question-grid");
    grid.innerHTML = "";
    // Haal de huidige quiz op
    const quiz = state.quizzes.find(q => q.id === currentQuizId);
    const quizTitle = document.getElementById("quiz-title");
    quizTitle.textContent = quiz.title;
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
        const actions = document.createElement("div");
        actions.className = "question-actions";
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "action-btn-sm danger";
        deleteBtn.textContent = "🗑️";
        deleteBtn.addEventListener("click", () => {
            openDeleteQuestion(question);
            console.log("ewfuiwef");
        });
        actions.appendChild(deleteBtn);
        const editBtn = document.createElement("button");
        editBtn.className = "action-btn-sm";
        editBtn.textContent = "✏️";
        editBtn.addEventListener("click", () => openEditQuestion(question));
        actions.appendChild(editBtn);
        // Antwoorden
        const answerList = document.createElement("div");
        answerList.className = "question-answers-preview";
        question.options.forEach((opt, i) => {
            const answerTag = document.createElement("span");
            answerTag.className = "answer-tag";
            // Markeer correct antwoord
            if (question.correctAnswer === ["A", "B", "C", "D"][i]) {
                answerTag.classList.add("correct");
            }
            answerTag.textContent = opt;
            answerList.appendChild(answerTag);
        });
        content.appendChild(textPreview);
        content.appendChild(answerList);
        card.appendChild(content);
        card.appendChild(actions);
        grid.appendChild(card);
    });
}
function deleteQuiz(id) {
    state.quizzes = state.quizzes.filter(h => h.id !== id);
    saveQuizzes();
    renderQuizzes();
}
function deleteQuestion(id) {
    const quiz = state.quizzes.find(q => q.id === currentQuizId);
    quiz.questions = quiz.questions.filter(h => h.id !== id);
    saveQuizzes();
    renderQuizzes();
    renderQuestions();
}
function openDeleteQuestion(question) {
    deleteQuestionModal.style.display = "flex";
    confirmDeleteQuestion.addEventListener("click", () => {
        deleteQuestion(question.id);
        deleteQuestionModal.style.display = "none";
    });
    deleteQuestionModal.addEventListener("click", (e) => {
        if (e.target === deleteQuestionModal)
            deleteQuestionModal.style.display = "none";
    });
    cancelDeleteModal.addEventListener("click", () => deleteQuestionModal.style.display = "none");
    closeDeleteModal.addEventListener("click", () => deleteQuestionModal.style.display = "none");
}
function openEditModal(quizID) {
    questionsModal.style.display = "flex";
    currentQuizId = quizID;
    renderQuestions();
}
function openDeleteModal(quiz) {
    function closeModal() {
        deleteModal.style.display = "none";
    }
    deleteModal.style.display = "flex";
    cancelDeleteBtn.addEventListener("click", () => closeModal());
    closeDeleteBtn.addEventListener("click", () => closeModal());
    deleteModal.addEventListener("click", (e) => {
        if (e.target === deleteModal)
            closeModal();
    });
    confirmDeleteBtn.addEventListener("click", () => {
        deleteQuiz(quiz.id);
        closeModal();
    });
}
function openEditQuestion(question) {
    currentQuestionIdForEdit = question.id;
    editQuestionInput.value = question.question;
    editAnswerAInput.value = question.options[0];
    editAnswerBInput.value = question.options[1];
    editAnswerCInput.value = question.options[2];
    editAnswerDInput.value = question.options[3];
    editCorrectAnswerInput.value = question.correctAnswer;
    editQuestionModal.style.display = "flex";
}
document.addEventListener("DOMContentLoaded", () => {
    renderQuizzes();
    console.log("ewfewf");
    createQuizBtn.addEventListener("click", () => {
        if (quizName.value !== "" && quizDesc.value !== "") {
            createQuiz(quizName.value, quizDesc.value, quizCategory.value);
            createQuizModal.style.display = "none";
            quizName.value = "";
            quizDesc.value = "";
        }
        if (quizName.value == "") {
            quizName.placeholder = "You have to input a name";
            setTimeout(() => {
                quizName.placeholder = "Bijvoorbeeld: Wereldgeschiedenis";
            }, 2000);
        }
        if (quizDesc.value == "") {
            quizDesc.placeholder = "You have to input a description!";
            setTimeout(function () {
                quizDesc.placeholder = "Korte beschrijving van de quiz...";
            }, 2000);
        }
    });
    openCreateModalBtn.addEventListener("click", () => {
        createQuizModal.style.display = "flex";
    });
    createQuizBtn2.addEventListener("click", () => {
        createQuizModal.style.display = "flex";
    });
    closeCreateModal.addEventListener("click", () => {
        createQuizModal.style.display = "none";
    });
    cancelCreateModal.addEventListener("click", () => {
        createQuizModal.style.display = "none";
    });
    modalOverlay.addEventListener("click", () => {
        createQuizModal.style.display = "none";
    });
    questionOverlay.addEventListener("click", (e) => {
        if (e.target === e.currentTarget)
            questionsModal.style.display = "none";
    });
    createQuestionFinal.addEventListener("click", () => {
        createQuestion(questionInput.value, answerAInput.value, answerBInput.value, answerCInput.value, answerDInput.value, correctAnswer.value);
        questionsModal.style.display = "none";
        questionInput.value = "";
        answerAInput.value = "";
        answerBInput.value = "";
        answerCInput.value = "";
        answerDInput.value = "";
        correctAnswer.value = "A";
    });
    closeQuestionModal.addEventListener("click", () => questionsModal.style.display = "none");
    cancelQuestionModal.addEventListener("click", () => questionsModal.style.display = "none");
    // Edit Question Modal Listeners
    saveEditQuestionBtn.addEventListener("click", () => {
        if (currentQuizId && currentQuestionIdForEdit) {
            const quiz = state.quizzes.find(q => q.id === currentQuizId);
            if (quiz) {
                const question = quiz.questions.find(q => q.id === currentQuestionIdForEdit);
                if (question) {
                    question.question = editQuestionInput.value;
                    question.options = [
                        editAnswerAInput.value,
                        editAnswerBInput.value,
                        editAnswerCInput.value,
                        editAnswerDInput.value
                    ];
                    question.correctAnswer = editCorrectAnswerInput.value;
                    saveQuizzes();
                    renderQuestions();
                    editQuestionModal.style.display = "none";
                }
            }
        }
    });
    closeEditQuestionBtn.addEventListener("click", () => editQuestionModal.style.display = "none");
    cancelEditQuestionBtn.addEventListener("click", () => editQuestionModal.style.display = "none");
    editQuestionOverlay.addEventListener("click", () => editQuestionModal.style.display = "none");
});
console.log(questionOverlay);
renderQuizzes();
//# sourceMappingURL=app.js.map