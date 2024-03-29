import {useQuery} from "react-query";
import subjectsService from "@/services/subjects.service";

function useSubjectLesson(lessonID: string) {
  return useQuery([`subject lesson ${lessonID}`], () => subjectsService.getSubjectLesson(lessonID), {
    select: ({ data }) => data,
  })
}

export default useSubjectLesson;
