'use client';

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type User from "@/lib/Models/user";
import {RootState} from "@/lib/store";


export interface userState {
    user: User
    loading: boolean
}

const initialState: userState = {
    user: {
        user_id: "",
        username: "",
        first_name: "",
        points: 0,
    },
    loading: true
}

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        set: (state, user: PayloadAction<User>) => {
            return {
                user: user.payload,
                loading: false
            } as userState
        }
    }
})

export const { set } = userSlice.actions;
export const selectUserState = (state: RootState) => state.user

export default userSlice.reducer