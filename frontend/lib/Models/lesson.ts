export interface Question {
  subject: string
  variants: string[]
  type: 'multiply' | 'single'
}

export default interface Lesson {
  lesson_id: string
  test: Question[]
  video: string
  title: string
}