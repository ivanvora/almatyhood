/* eslint-disable no-param-reassign */
import { TBuilding } from '@/modules/models/common';
import { createSlice } from '@reduxjs/toolkit';

type TInitialState = {
    isLoading: boolean;
    error: string;
    likes: TBuilding[] | undefined;
};

export const initialState: TInitialState = {
    isLoading: false,
    error: '',
    likes: undefined,
};

export type TAction<T> = {
    type: string;
    payload: T;
};

const likesSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        Fetching: (state) => {
            state.isLoading = true;
        },
        FetchingError: (state, { payload }: TAction<string>) => {
            state.isLoading = false;
            state.error = payload;
        },
        FetchingSuccess: (state, { payload }: TAction<TBuilding[]>) => {
            state.isLoading = false;
            state.likes = payload;
        },
    },
});

export const { Fetching, FetchingError, FetchingSuccess } = likesSlice.actions;
export const likesReducer = likesSlice.reducer;
