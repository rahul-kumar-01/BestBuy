import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    allItemArray: [],
    itemArray : [],
    checkBoxCategoryArray: [],
    selectedItemArray : [],
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

export const setUpdatedItemArrayAsync = createAsyncThunk(
    '/items/setUpdatedItemArrayDueToCheckBox',()=>{
        return;
    }
)

export const itemsSlice = createSlice({
    name: 'items',
    initialState: initialState,
    reducers: {
        setCheckBoxArray:(state,action)=>{
            const { itemCategory, checked } = action.payload;
            if (checked) {
                state.checkBoxCategoryArray.push(itemCategory);
            }else{
                const newCheckBoxArray = state.checkBoxCategoryArray.filter((data)=>data !== itemCategory);
                state.checkBoxCategoryArray = newCheckBoxArray;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setInitialStateAsync.fulfilled,(state,action)=>{
            state.allItemArray = action.payload;
            state.itemArray = action.payload;
        })
        .addCase(setUpdatedItemArrayAsync.fulfilled,(state,action)=>{
            if(state.checkBoxCategoryArray.length === 0){
                state.itemArray = state.allItemArray;
                return;
            }
            const filteredObjects = state.allItemArray.filter(obj => state.checkBoxCategoryArray.includes(obj.category));
            state.itemArray = filteredObjects;
        })
    }
})
export const itemsReducer = itemsSlice.reducer;
export const itemsActions = itemsSlice.actions; 
