import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    itemArray : [],
}

export const setInitialStateAsync = createAsyncThunk(
    '/items/getState',async ()=>{
        let arr = [];
        await fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=> {
                arr = [...json];
        })
        return arr;
    }
)


const itemsSlice = createSlice({
    name: 'items',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(setInitialStateAsync.fulfilled,(state,action)=>{
            state.itemArray = action.payload;
            console.log("State",state.itemArray);
        })
    }
})
export const itemsReducer = itemsSlice.reducer;
