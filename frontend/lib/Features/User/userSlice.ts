'use client';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import type User from "@/lib/Models/user";
import axios from "axios";


export interface userState {
    user: User | undefined
    loading: boolean
    error: string
}

export const fetchUser = createAsyncThunk<User, string>('user/fetchUser', async (initData) => {
    const response = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, null, {
          headers: {
              "X-Telegram-Init-Data": initData
          }
      });
    return response.data;
})

const initialState: userState = {
    user: undefined,
    loading: true,
    error: ""
}

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, state => {
          state.loading = true
        })
        builder.addCase(
          fetchUser.fulfilled,
          (state, action: PayloadAction<User>) => {
            state.loading = false
            state.user = action.payload
            state.error = ''
          }
        )
        builder.addCase(fetchUser.rejected, (state, action) => {
          state.loading = false
          state.user = undefined
          state.error = action.error.message || 'Something went wrong'
        })
    }
})

export default userSlice.reducer