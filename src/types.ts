export type QuizID = string
export type QuestionID = string

export interface Question {
  id: QuestionID
  text: string
  options: string[]
  correctAnswerIndex: number
}

export interface Quiz {
  id: QuizID
  title: string
  desc: string
  createdAt: number
  questions: Question[]
}

export interface QuizSession {
  quizId: QuizID
  currentQuestionIndex: number
  score: number
  startedAt: number
}