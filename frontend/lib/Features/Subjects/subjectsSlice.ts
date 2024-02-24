'use client';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import type Subject from "@/lib/Models/subject";
import axios from 'axios';

export interface subjectsState {
    loading: boolean
    subjects: Subject[]
    error: string
}

const initialState: subjectsState = {
    loading: false,
    subjects: [],
    error: ''
}

export const fetchSubjects = createAsyncThunk('subject/fetchSubjects', async () => {
    const response = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/subjects/`);
    return response.data;
})

export const subjectsSlice = createSlice({
    name: 'Subjects',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchSubjects.pending, state => {
          state.loading = true
        })
        builder.addCase(
          fetchSubjects.fulfilled,
          (state, action: PayloadAction<Subject[]>) => {
            state.loading = false
            state.subjects = action.payload
            state.error = ''
          }
        )
        builder.addCase(fetchSubjects.rejected, (state, action) => {
          state.loading = false
          state.subjects = []
          state.error = action.error.message || 'Something went wrong'
        })
    }
})

export default subjectsSlice.reducer