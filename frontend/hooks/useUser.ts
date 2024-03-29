import {useInitDataRaw} from "@tma.js/sdk-react";
import {useQuery} from "react-query";
import userService from "@/services/user.service";

export const useUser = () => {
  const initDataRaw = useInitDataRaw()

  return useQuery(['user'], () => userService.getMe(initDataRaw), {
    select: ({ data }) => data,
    enabled: !!initDataRaw
  })
}