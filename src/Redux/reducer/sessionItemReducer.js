import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {db} from "../../Config/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { doc, updateDoc,getDoc } from "firebase/firestore";

const initialState = {
    cartArray : [],
    orderArray: [],
}

export const setInitialStateAsync = createAsyncThunk(
    'sessionItem/setState', async (payload) => {
        const userRef = doc(db, "Users", payload.userId);
        const tokenSnap = await getDoc(userRef);
        const userCartArray = tokenSnap.data().userCartArray;
        return tokenSnap.data().userCartArray;
    }   
)

export const handleAddToCartAsync = createAsyncThunk(
    'sessionItem/addToCart', async (payload)=> {
        const userRef = doc(db, "Users", payload.userId);
        const tokenSnap = await getDoc(userRef);
        const userCartArray = tokenSnap.data().userCartArray;
        await updateDoc(userRef, {
            userCartArray : [...userCartArray,payload.itemDetails]
        });
        return payload.itemDetails;
    }
)

export const handleRemoveFromCartAsync = createAsyncThunk(
    'sessionItem/removeFromCart', async (payload)=>{
        const userRef = doc(db, "Users", payload.userId);
        const tokenSnap = await getDoc(userRef);
        const userCartArray = tokenSnap.data().userCartArray;
        const index = userCartArray.findIndex((obj) =>  obj.id.toString() === payload.itemDetails.id.toString());
        const newUserCartArray = userCartArray.filter((data,i) => i !== index);
        await updateDoc(userRef, {
            userCartArray : newUserCartArray
        })
        return newUserCartArray;
    }
)

const sessionItemSlice = createSlice({
    name: 'sessionItem',
    initialState: initialState,
    reducers:{

    },
    extraReducers:(builder) => {
        builder.addCase(setInitialStateAsync.fulfilled,(state,action)=>{
            state.cartArray = action.payload;
        })
        .addCase(handleAddToCartAsync.fulfilled,(state,action)=>{
            state.cartArray = [...state.cartArray,action.payload];
        })
        .addCase(handleRemoveFromCartAsync.fulfilled,(state,action)=>{
            state.cartArray = action.payload;
        })
    }
})

export const sessionItemReducer = sessionItemSlice.reducer;