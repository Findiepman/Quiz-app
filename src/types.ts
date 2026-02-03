export type QuizID = string
export type QuestionID = string

export interface Question {
  id: QuestionID
  question: string
  options: string[]
  correctAnswer: string
  index: number
}

export interface Quiz {
  id: QuizID
  title: string
  desc: string
  createdAt: number
  category: string
  questions: Question[]
}

export interface QuizSession {
  quizId: QuizID
  currentQuestionIndex: number
  score: number
  startedAt: number
}