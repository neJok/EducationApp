import { useEffect } from 'react';
import {fetchUser} from "@/lib/Features/User/userSlice";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {useInitDataRaw} from "@tma.js/sdk-react";

function useUser() {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state.user);
  const initDataRaw = useInitDataRaw()

  useEffect(() => {
    if (!state.user && initDataRaw) {
      dispatch(fetchUser(initDataRaw));
    }
  }, [dispatch, state]);

  return state;
}

export default useUser;
