export default interface Subject {
  key: string
  lessons: {
      [grade: string]: string[];
  };
  background: string
  label: string
}