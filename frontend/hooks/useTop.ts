import {useQuery} from "react-query";
import topService from "@/services/top.service";

function useTop() {
  return useQuery(['top'], () => topService.getTop(), {
    select: ({ data }) => data,
  })
}

export default useTop;
