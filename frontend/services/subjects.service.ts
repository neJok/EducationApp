import axios from "axios";
import type {ISubject, ISubjectClassesResponse} from "@/interfaces/subject.interface";
import {ILesson, ILessonsResponse} from "@/interfaces/lesson.interface";

class SubjectsService {
  private URL = process.env.NEXT_PUBLIC_API_URL + '/subjects'

  async getSubjects() {
    return await axios.post<ISubject[]>(`${this.URL}/`);
  }

  async getSubjectClasses(subjectID: string) {
    return await axios.post<ISubjectClassesResponse>(`${this.URL}/classes/${subjectID}`)
  }

  async getSubjectLessons(subjectID: string, subjectClass: string) {
    return await axios.post<ILessonsResponse>(`${this.URL}/lessons/${subjectID}/${subjectClass}`)
  }

  async getSubjectLesson(lessonID: string) {
    return await axios.post<ILesson>(`${this.URL}/lesson/${lessonID}`)
  }
}

export default new SubjectsService()