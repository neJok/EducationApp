import Lesson from "@/lib/Models/lesson";

export default interface Subject {
  key: string
  lessons: {
      [grade: string]: Lesson[];
  };
  background: string
  label: string
}