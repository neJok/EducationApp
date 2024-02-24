import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/lib/Features/User/userSlice'
import subjectsReducer from '@/lib/Features/Subjects/subjectsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      subjects: subjectsReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']