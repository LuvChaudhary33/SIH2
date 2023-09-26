import {createSlice} from "@reduxjs/toolkit"
export const userSlice = createSlice({
    name: "user",
    initialState:{
        user: null,
    },
    reducers:{
        setUser:(state, action) =>{
            state.loading = action.payload;
        },
    }
})

export const {setUser} = userSlice.actions;