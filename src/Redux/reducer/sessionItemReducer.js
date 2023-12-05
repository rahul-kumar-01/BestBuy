import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {db} from "../../Config/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { doc, updateDoc,getDoc,setDoc } from "firebase/firestore";


const initialState = {
    cartArray : [],
    orderArray: [],
}

export const setInitialStateAsync = createAsyncThunk(
    'sessionItem/setState', async (payload) => {
        const userRef = doc(db, "Users", payload.userId);
        const tokenSnap = await getDoc(userRef);
        const userCartArray = tokenSnap.data().userCartArray;
        const userOrderArray = tokenSnap.data().orderDetailsArray;
        return {userCartArray,userOrderArray};
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

export const handlePlaceOrderAsync = createAsyncThunk(
    'sessionItem/placeOrder',async(payload)=>{
        const userRef = doc(db, "Users", payload.userId);
        const tokenSnap = await getDoc(userRef);
        const temp = tokenSnap.data().orderDetailsArray;
        temp.push({...payload.cartArray});
        // const flattenedData = temp.map((innerArray, index) => ({ index, values: innerArray }));
        try {
            await updateDoc(userRef, {
                orderDetailsArray: [...temp],
                userCartArray: []
            })
            console.log("Order Placed successfully!");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
        window.alert('Order placed');
        return;
    }
)

const sessionItemSlice = createSlice({
    name: 'sessionItem',
    initialState: initialState,
    reducers:{

    },
    extraReducers:(builder) => {
        builder.addCase(setInitialStateAsync.fulfilled,(state,action)=>{
            state.cartArray = action.payload.userCartArray;
            state.orderArray = action.payload.userOrderArray;
        })
        .addCase(handleAddToCartAsync.fulfilled,(state,action)=>{
            state.cartArray = [...state.cartArray,action.payload];
        })
        .addCase(handleRemoveFromCartAsync.fulfilled,(state,action)=>{
            state.cartArray = action.payload;
        })
        .addCase(handlePlaceOrderAsync.fulfilled,(state,actino)=>{
            state.cartArray = [];
        })
    }
})

export const sessionItemReducer = sessionItemSlice.reducer;
export const sessionItemAction = sessionItemSlice.actions;