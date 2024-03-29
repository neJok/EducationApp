import {useQuery} from "react-query";
import subjectsService from "@/services/subjects.service";

function useSubjects() {
  return useQuery(['subjects'], () => subjectsService.getSubjects(), {
    select: ({ data }) => data,
  })
}

export default useSubjects;
