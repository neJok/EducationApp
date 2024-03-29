import {useQuery} from "react-query";
import subjectsService from "@/services/subjects.service";

function useSubjectClasses(subjectID: string) {
  return useQuery([`subject classes ${subjectID}`], () => subjectsService.getSubjectClasses(subjectID), {
    select: ({ data }) => data,
  })
}

export default useSubjectClasses;
