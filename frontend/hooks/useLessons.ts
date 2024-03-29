import {useQuery} from "react-query";
import subjectsService from "@/services/subjects.service";

function useSubjectLessons(subjectID: string, subjectClass: string) {
  return useQuery([`subject lessons ${subjectID} ${subjectClass}`], () => subjectsService.getSubjectLessons(subjectID, subjectClass), {
    select: ({ data }) => data,
  })
}

export default useSubjectLessons;
