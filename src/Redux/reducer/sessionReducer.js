import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {db} from "../../Config/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { doc, updateDoc,getDoc } from "firebase/firestore";


const initialState  = {
    currentSessionUserId : undefined,
}

export const handleSignUpAsync = createAsyncThunk(
    'session/signUp',async (payload)=>{
        const querySnapshot = await getDocs(collection(db, "Users"));
        let userExists = false;
        querySnapshot.forEach((doc) => {
            if (doc.data().userEmailId === payload.userEmailId) {
                window.alert('User already exists');
                userExists = true;
                return;
            }
        });
        if (userExists)  return;
        const docRef = await addDoc(collection(db, "Users"), {
            userName : payload.userName,
            userPassword: payload.userPassword,
            userEmailId: payload.userEmailId,
            userCartArray: [],
            orderDetailsArray: []
        });
        window.alert('User created succesfully');
        return;
    }
)

export const handleSignInAsync = createAsyncThunk(
    'session/signIn',async (payload) =>{
        const querySnapshot = await getDocs(collection(db, "Users"));
        // querySnapshot.forEach((doc) => {
        for (const doc1 of querySnapshot.docs) {
            if(doc1.data().userEmailId === payload.userEmailId){
                if(doc1.data().userPassword === payload.userPassword){
                    return doc1.id;
                }
            }
        }
    }
)
//  todo: can't use await with forEach

export const handleSignOutAsync = createAsyncThunk(
    'session/signOut', async(payload) => {
        return undefined;
    }
)

export const sessionSlice = createSlice({
    name: 'session',
    initialState : initialState,
    reducers: {

    },
    extraReducers:(builder) => {
        builder.addCase(handleSignInAsync.fulfilled, (state,action) => {
            state.currentSessionUserId = action.payload;
        })
        .addCase(handleSignOutAsync.fulfilled, (state,action) => {
            state.currentSessionUserId = action.payload;
        })
    },

})

export const sessionReducer = sessionSlice.reducer;