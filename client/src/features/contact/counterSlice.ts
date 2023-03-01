import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
    data:number;
    title: string;
}

const initialState : CounterState = {
    data: 42,
    title:'redux counter with redux tool'
}

export const counterSlice = createSlice({       //action creator and actions
    name:'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.data += action.payload
        },
        decrement: (state, action) => {
            state.data -= action.payload
        }
    }
})

export const {increment,decrement} = counterSlice.actions;