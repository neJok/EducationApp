export interface IQuestion {
  subject: string
  variants: string[]
  type: 'multiply' | 'single'
}

export interface ILesson {
  lesson_id: string
  video: string
  test?: IQuestion[]
  title: string
}

export interface ILessonsResponse {
  label: string
  lessons: ILesson[]
}