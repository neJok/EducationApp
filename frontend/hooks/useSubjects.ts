import { useEffect } from 'react';
import {fetchSubjects} from "@/lib/Features/Subjects/subjectsSlice";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";

function useSubjects() {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state.subjects);

  useEffect(() => {
    if (state.subjects.length === 0 && !state.error) {
      dispatch(fetchSubjects());
    }
  }, [dispatch]);

  return state;
}

export default useSubjects;
