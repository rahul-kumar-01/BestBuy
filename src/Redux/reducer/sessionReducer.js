import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {db} from "../../Config/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { doc, updateDoc,getDoc } from "firebase/firestore";


const initialState  = {
    currentSessionUserId : "none"
}

export const setInitalStateAsync = createAsyncThunk(
    'session/setState',async ()=>{
        const tokenRef = doc(db, "SessionToken", "HumtxkUHVSpXZPBqt48l");
        const tokenSnap = await getDoc(tokenRef);
        const temp = tokenSnap.data().userSessionToken;
        return temp;
    }
)


export const handleSignUpAsync = createAsyncThunk(
    'session/signUp',async (payload)=>{
        const querySnapshot = await getDocs(collection(db, "Users"));
        let userExists = false;
        querySnapshot.forEach((doc) => {
            if (doc.data().userEmailId === payload.userEmailId) {
                console.log("User already exists");
                userExists = true;
                return;
            }
        });
        if (userExists)  return;
        const docRef = await addDoc(collection(db, "Users"), {
            userName : payload.userName,
            userPassword: payload.userPassword,
            userEmailId: payload.userEmailId,
          });
        console.log("Document written with ID: ", docRef.id);
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
                    const tokenRef = doc(db, "SessionToken", "HumtxkUHVSpXZPBqt48l");
                    await updateDoc(tokenRef, {
                        userSessionToken: doc1.id
                    });
                    return doc1.id;
                }
            }
        }

        // });
    }
)
//  todo: can't use await with forEach

export const handleSignOutAsync = createAsyncThunk(
    'session/signOut', async(payload) => {
        const tokenRef = doc(db, "SessionToken", "HumtxkUHVSpXZPBqt48l");
        await updateDoc(tokenRef, {
            userSessionToken: "none",
        });
        return "none";
    }
)


export const sessionSlice = createSlice({
    name: 'session',
    initialState : initialState,
    reducers: {
        // signIn: (state,action)
    },
    extraReducers:(builder) => {
        builder.addCase(handleSignInAsync.fulfilled, (state,action) => {
            state.currentSessionUserId = action.payload;
            console.log(state.currentSessionUserId);
        })
        .addCase(handleSignOutAsync.fulfilled, (state,action) => {
            state.currentSessionUserId = action.payload;
            console.log(state.currentSessionUserId);
        })
        .addCase(setInitalStateAsync.fulfilled,(state,action)=> {
            state.currentSessionUserId = action.payload;
            console.log("CurrentState",state.currentSessionUserId);
        })
    },

})

export const sessionReducer = sessionSlice.reducer;